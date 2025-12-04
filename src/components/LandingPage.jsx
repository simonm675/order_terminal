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
    <div className="relative h-screen w-screen select-none">
      {/* Hintergrundvideo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/video_landingpage.webm"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-between bg-black bg-opacity-50 text-white">
        {/* Hauptinhalt: Logo, Text, Buttons */}
        <div className="flex flex-col items-center justify-center flex-grow px-4">
          <motion.img
            src="/img/logo/logo_new-min.png"
            alt="Burger&Burger"
            className="w-2/3 sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4 mb-8 drop-shadow-[0_0_40px_rgba(255,255,255,1)]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />

          {/* Button "Jetzt starten" mit pulsierender Animation */}
          {!showOptions ? (
            <motion.button
              onClick={handleStartClick}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold mt-6 py-4 px-12 lg:py-6 lg:px-16 rounded-2xl shadow-2xl text-lg lg:text-2xl"
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
                boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Jetzt Bestellen"
            >
              🍔 Jetzt Bestellen
            </motion.button>
          ) : (
            <motion.div
              className="flex flex-col sm:flex-row gap-4 lg:gap-6 w-full max-w-2xl px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                onClick={() => handleNavigate("/order?type=here")}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 px-6 lg:py-6 lg:px-10 rounded-2xl text-base lg:text-xl font-bold shadow-xl"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 8px 25px rgba(255, 255, 255, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Zum hier essen"
              >
                🍽️ Zum hier essen
              </motion.button>
              <motion.button
                onClick={() => handleNavigate("/order?type=takeaway")}
                className="flex-1 bg-transparent border-4 border-yellow-500 text-yellow-500 py-4 px-6 lg:py-6 lg:px-10 rounded-2xl text-base lg:text-xl font-bold hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-xl"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 8px 25px rgba(255, 255, 255, 0.5)",
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
        <footer className="w-full text-center text-md text-gray-400 py-2">
          &copy; 2024 Burger&Burger GmbH. Alle Rechte vorbehalten.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;