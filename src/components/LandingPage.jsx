import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

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
        <div className="flex flex-col items-center justify-center flex-grow">
          <img
            src="/img/logo/logo_new-min.png"
            alt="Burger&Burger"
            className="w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/4 mb-6 drop-shadow-[0_0_40px_rgba(255,255,255,1)] "
          />
          <h1 className="text-5xl font-extrabold text-gray-100 mb-2 text-center">
            Willkommen bei Burger&Burger
          </h1>
          <p className="text-lg text-gray-100 mb-8 text-center">
            Genießen Sie die besten Burger der Stadt, frisch und lecker, genau
            nach Ihrem Geschmack!
          </p>

          {/* Button "Jetzt starten" mit pulsierender Animation */}
          {!showOptions ? (
            <motion.button
              onClick={() => setShowOptions(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-5 px-10 rounded-lg shadow-md"
              initial={{ scale: 1 }}
              animate={{
                scale: [1, 1.1, 1], // Pulsierende Skalierung
              }}
              transition={{
                duration: 1.5, // Dauer der Animation
                repeat: Infinity, // Unendlich wiederholen
                repeatType: "loop", // Loop-Animation
              }}
              whileHover={{
                scale: 1.1, // Vergrößerung beim Hover
              }}
              whileTap={{ scale: 0.95 }}
            >
              Jetzt Bestellen
            </motion.button>
          ) : (
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                onClick={() => navigate("/order?type=here")}
                className="bg-yellow-500 text-white py-5 px-10 rounded-lg text-xl hover:bg-yellow-600 transition-all duration-300 ease-in-out"
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.4)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                Zum hier essen
              </motion.button>
              <motion.button
                onClick={() => navigate("/order?type=takeaway")}
                className="bg-transparent border-2 border-yellow-500 text-yellow-500 py-5 px-10 rounded-lg text-xl hover:bg-yellow-500 hover:text-white transition-all duration-300 ease-in-out"
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.4)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                Zum Mitnehmen
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <footer className="w-full text-center text-md text-gray-400 py-2">
          &copy; 2024 SM Burger. Alle Rechte vorbehalten.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
