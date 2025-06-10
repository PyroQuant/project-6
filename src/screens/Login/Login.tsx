import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../lib/LanguageContext";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const handleLogin = () => {
    navigate("/request");
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <main className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[390px] h-[844px] relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-full px-8"
        >
          <img
            className="w-[150px] h-[150px] mb-8"
            alt="Jump Logo"
            src="/ilustracio-n-sin-ti-tulo-1.png"
          />
          <h1 className="text-[#3f6cea] text-3xl font-bold mb-8">{t('welcome')}</h1>
          
          <div className="w-full space-y-4">
            <input
              type="email"
              placeholder={t('email')}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="password"
              placeholder={t('password')}
              className="w-full p-3 border rounded-lg"
            />
            <button 
              className="w-full bg-[#3f6cea] text-white p-3 rounded-lg font-semibold"
              onClick={handleLogin}
            >
              {t('login')}
            </button>
            
            <div className="flex items-center my-4">
              <div className="flex-1 border-t"></div>
              <span className="px-4 text-gray-500">{t('or')}</span>
              <div className="flex-1 border-t"></div>
            </div>
            
            <button className="w-full border border-gray-300 p-3 rounded-lg flex items-center justify-center gap-2">
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
              {t('loginWithGoogle')}
            </button>
            
            <p className="text-center text-gray-600 mt-4">
              {t('noAccount')}{" "}
              <a href="/register" className="text-[#3f6cea] font-semibold">
                {t('register')}
              </a>
            </p>
          </div>

          <button
            onClick={toggleLanguage}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 hover:text-[#3f6cea] transition-colors"
          >
            {t('language')}
          </button>
        </motion.div>
      </div>
    </main>
  );
};