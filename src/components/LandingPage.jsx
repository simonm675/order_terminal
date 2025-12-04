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
    <div className="relative h-screen w-screen select-none overflow-hidden">
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
            className="w-2/3 sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4 mb-8 drop-shadow-[0_0_60px_rgba(255,255,255,0.9)] liquid-float"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />

          {/* Button "Jetzt starten" mit pulsierender Animation */}
          {!showOptions ? (
            <motion.button
              onClick={handleStartClick}
              className="glass-button-success px-12 py-6 lg:px-16 lg:py-8 text-xl lg:text-3xl font-bold"
              initial={{ scale: 1 }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Jetzt Bestellen"
            >
              🍔 Jetzt Bestellen
            </motion.button>
          ) : (
            <motion.div
              className="flex flex-col sm:flex-row gap-4 lg:gap-6 w-full max-w-3xl px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                onClick={() => handleNavigate("/order?type=here")}
                className="flex-1 glass-button-primary py-5 px-6 lg:py-7 lg:px-10 text-lg lg:text-2xl font-bold"
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Zum hier essen"
              >
                🍽️ Zum hier essen
              </motion.button>
              <motion.button
                onClick={() => handleNavigate("/order?type=takeaway")}
                className="flex-1 glass-button py-5 px-6 lg:py-7 lg:px-10 text-lg lg:text-2xl font-bold border-2 border-white/50"
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Zum Mitnehmen"
              >
                🛍️ Zum Mitnehmen
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <footer className="w-full text-center text-sm lg:text-base text-white/80 py-4 glass-card mx-4 mb-4">
          &copy; 2024 Burger&Burger GmbH. Alle Rechte vorbehalten.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;