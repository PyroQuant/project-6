import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Welcome = (): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="w-full max-w-[390px] h-screen relative flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-[202px] h-[226px] flex flex-col items-center"
        >
          <img
            className="w-full h-full object-contain"
            alt="Chambify Logo"
            src="/logochambifyletrasazules.webp"
          />
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-[139px] font-['Poppins'] font-bold text-[#1e39b4] text-[40px] tracking-[0] leading-[normal]"
          >
            Chambify
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};