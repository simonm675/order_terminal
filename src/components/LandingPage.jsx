import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleStartClick = useCallback(() => {
    setShowOptions(true);
  }, []);

  const handleNavigate = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  return (
    <div className="relative h-[100dvh] w-screen select-none overflow-hidden">
      {/* Hintergrundvideo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/video_landingpage.webm"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Glass Overlay */}
      <div className="absolute inset-0 frosted-overlay"></div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-between text-white">
        {/* Hauptinhalt: Logo, Text, Buttons */}
        <div className="flex flex-col items-center justify-center flex-grow px-4 z-10">
          <motion.img
            src="/img/logo/logo_new-min.png"
            alt="Burger&Burger"
            className="mb-6 w-3/4 max-w-xs drop-shadow-[0_0_60px_rgba(255,255,255,0.9)] liquid-float sm:mb-8 sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />

          {/* Button "Jetzt starten" */}
          {!showOptions ? (
            <motion.button
              onClick={handleStartClick}
              className="rounded-2xl border-2 border-white/30 bg-gradient-to-r from-green-500 to-green-600 px-8 py-4 text-lg font-bold text-white shadow-2xl sm:px-12 sm:py-6 sm:text-xl lg:px-16 lg:py-8 lg:text-3xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Jetzt Bestellen"
            >
              🍔 Jetzt Bestellen
            </motion.button>
          ) : (
            <motion.div
              className="flex w-full max-w-3xl flex-col gap-3 px-4 sm:flex-row sm:gap-4 lg:gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.button
                onClick={() => handleNavigate("/order?type=here")}
                className="flex-1 rounded-2xl border-2 border-white/30 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-base font-bold text-white shadow-2xl sm:py-5 sm:text-lg lg:px-10 lg:py-7 lg:text-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Zum hier essen"
              >
                🍽️ Zum hier essen
              </motion.button>
              <motion.button
                onClick={() => handleNavigate("/order?type=takeaway")}
                className="flex-1 rounded-2xl border-2 border-white/50 bg-white/10 px-6 py-4 text-base font-bold text-white shadow-2xl backdrop-blur-md sm:py-5 sm:text-lg lg:px-10 lg:py-7 lg:text-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Zum Mitnehmen"
              >
                🛍️ Zum Mitnehmen
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <footer className="glass-card mb-3 w-full px-4 py-3 text-center text-xs text-white/80 sm:mb-4 sm:py-4 sm:text-sm lg:text-base">
          &copy; 2024 Burger&Burger GmbH. Alle Rechte vorbehalten.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;