import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RequestForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiPrice, setAiPrice] = useState<number | null>(null);
  const [aiJustification, setAiJustification] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Transcripción por voz usando Web Speech API
  let recognition: any = null;
  if (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition) {
    recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;
  }

  const handleMicClick = () => {
    if (!recognition) {
      setError('La transcripción por voz no es compatible con este navegador.');
      return;
    }
    setIsRecording(true);
    recognition.start();
    recognition.onresult = (event: any) => {
      setDescription(prev => prev + (prev ? ' ' : '') + event.results[0][0].transcript);
      setIsRecording(false);
    };
    recognition.onerror = (event: any) => {
      setIsRecording(false);
      setError(`Error al transcribir: ${event.error}. Intenta de nuevo.`);
    };
    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('descripcion', description);
      images.forEach((imageFile) => {
        // Usamos 'imagenes' como clave para cada archivo; n8n puede recibirlos como un array.
        // Alternativamente, podrías usar claves únicas como `imagen_${index}` si el webhook lo espera así.
        formData.append('imagenes', imageFile, imageFile.name);
      });

      const response = await fetch('/api/webhook/d7e40f77-0c13-48a2-8848-8ac38866f17c', {
        method: 'POST',
        // No establecer 'Content-Type' manualmente cuando se usa FormData,
        // el navegador lo configurará automáticamente con el boundary correcto.
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al consultar el precio (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      // Acceder a las propiedades anidadas en 'output'
      if (data.output) {
        setAiPrice(Number(data.output.precio)); // Esto será NaN si precio no es un número
        setAiJustification(data.output.justificacion);
      } else {
        // Manejar el caso donde 'output' no existe, por si acaso
        console.error('La respuesta del webhook no tiene la estructura esperada:', data);
        setError('Respuesta inesperada del servidor.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al procesar la solicitud');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptPrice = () => {
    navigate('/searching'); 
  };

  return (
    <main className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[390px] h-[844px] relative flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <span className="text-lg font-bold text-[#1e39b4]">Chambify</span>
          <span className="text-2xl">🔔</span>
        </div>
        <div className="px-4 flex-1 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-center mb-6">Describe tu trabajo</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Descripción detallada</label>
              <textarea
                className="w-full p-3 border rounded-lg bg-gray-50 min-h-[100px]"
                placeholder="Ejemplo: Necesito trasladar un sofá grande desde el 3er piso, no hay ascensor."
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={handleMicClick}
                className={`mt-2 flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  isRecording ? 'bg-red-100 border-red-400' : 'bg-[#e6eaf7] border-[#1e39b4]'
                }`}
                disabled={isRecording || !recognition}
              >
                <span role="img" aria-label="mic">🎤</span>
                {isRecording ? 'Escuchando...' : (recognition ? 'Transcribir por voz' : 'Voz no disponible')}
              </button>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Imágenes (opcional)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-600"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, idx) => (
                  <span key={idx} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">{img.name}</span>
                ))}
              </div>
            </div>
            {error && <div className="text-red-500 text-sm p-2 bg-red-50 border border-red-300 rounded">{error}</div>}
            <button
              type="submit"
              className="w-full bg-[#1e39b4] text-white py-3 rounded-lg font-semibold text-lg disabled:opacity-60"
              disabled={isLoading || !description.trim()}
            >
              {isLoading ? 'Consultando precio...' : 'Solicitar cotización'}
            </button>
          </form>
          {aiPrice !== null && (
            <div className="mt-8 p-6 bg-green-50 border border-green-400 rounded-lg text-center">
              <h2 className="text-xl font-bold mb-2">Precio sugerido por IA</h2>
              <p className="text-3xl font-semibold text-green-700 mb-4">${aiPrice.toLocaleString()} CLP</p>
              {aiJustification && <p className="text-gray-600 mb-4 break-words max-h-32 overflow-y-auto">{aiJustification}</p>}
              <button
                onClick={handleAcceptPrice}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
              >
                Aceptar y asignar chambeador
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
