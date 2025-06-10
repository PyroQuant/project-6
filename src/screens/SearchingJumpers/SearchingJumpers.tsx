import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useLanguage } from "../../lib/LanguageContext";

const chambeadorIcon = new L.Icon({
  iconUrl: "/ilustracio-n-sin-ti-tulo-1.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: "chambeador-marker"
});

const defaultIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function AnimatedCircle() {
  const map = useMap();
  const center = map.getCenter();

  useEffect(() => {
    map.setView(center, 15);
  }, [map, center]);

  return (
    <>
      <Circle
        center={center}
        pathOptions={{ color: "#3f6cea", fillColor: "#3f6cea", fillOpacity: 0.2 }}
        radius={500}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "#3f6cea",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

const userLocation = [-36.8282, -73.0514];
const chambeadorLocation = [-36.8272, -73.0524];

export const SearchingJumpers = (): JSX.Element => {
  const [showChambeador, setShowChambeador] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'chambeadores' }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChambeador(true);
      setTimeout(() => setShowDetails(true), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage("");
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "I'll be there in a few minutes!", 
          sender: 'chambeadores' 
        }]);
      }, 1000);
    }
  };

  if (showChat) {
    return (
      <main className="bg-gray-50 flex flex-row justify-center w-full">
        <div className="bg-white w-[390px] h-[844px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
            <button 
              onClick={() => setShowChat(false)}
              className="text-blue-600 p-2"
            >
              ←
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
                  alt="Jumper"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold">Carlos Mendoza</h2>
                <p className="text-sm text-green-500">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="border-t p-4 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t('typeMessage')}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center"
              >
                ➤
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  if (isCallActive) {
    return (
      <main className="bg-gradient-to-b from-blue-600 to-blue-800 flex flex-row justify-center w-full">
        <div className="overflow-hidden w-[390px] h-[844px] relative">
          <div className="h-full flex flex-col">
            {/* Call Header */}
            <div className="text-white p-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">Carlos Mendoza</h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-light"
              >
                {formatDuration(callDuration)}
              </motion.p>
            </div>

            {/* Profile Picture */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-white/30 shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
                    alt="Jumper"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-3 rounded-full border-4 border-white/20"
                />
              </motion.div>
            </div>

            {/* Call Actions */}
            <div className="p-12">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCallActive(false)}
                className="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
              >
                <span className="text-2xl rotate-135">📞</span>
              </motion.button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[390px] h-[844px] relative">
        <div className="absolute inset-0 z-10">
          <MapContainer
            center={userLocation}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={userLocation} icon={defaultIcon} />
            {!showChambeador && <AnimatedCircle />}
            {showChambeador && (
              <Marker position={chambeadorLocation} icon={jumpIcon} />
            )}
          </MapContainer>
        </div>

        <AnimatePresence>
          {!showChambeador ? (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-4 right-4 z-20 bg-white rounded-lg shadow-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">{t('searchingJumpers')}</h2>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  🔄
                </motion.div>
              </div>
              <p className="text-sm text-gray-600">
                {t('findingBest')}
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-2xl shadow-lg"
            >
              <div className="p-4">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
                      alt="Jumper profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Carlos Mendoza</h3>
                    <div className="flex items-center gap-1 text-yellow-400 mb-1">
                      {"★".repeat(5)}
                      <span className="text-gray-600 text-sm">(4.98)</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      +500 {t('jobsCompleted')}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="font-medium">{t('distance').replace('{distance}', '0.3')}</p>
                      <p className="text-sm text-gray-500">{t('estimatedArrival').replace('{time}', '5')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-xl">🚶</span>
                    <div>
                      <p className="font-medium">{t('onTheWay')}</p>
                      <p className="text-sm text-gray-500">{t('walking')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-xl">💪</span>
                    <div>
                      <p className="font-medium">{t('specialist')}</p>
                      <p className="text-sm text-gray-500">2 {t('experience')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button 
                    className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium"
                    onClick={() => setIsCallActive(true)}
                  >
                    {t('call')}
                  </button>
                  <button 
                    className="flex-1 py-3 px-4 border-2 border-blue-600 text-blue-600 rounded-lg font-medium"
                    onClick={() => setShowChat(true)}
                  >
                    {t('message')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};