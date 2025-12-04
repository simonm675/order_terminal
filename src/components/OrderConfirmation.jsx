import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = ({ setCart }) => {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(null);

  // Generate a random order number when the component loads
  useEffect(() => {
    const generateOrderNumber = () => Math.floor(Math.random() * (600 - 150 + 1)) + 150;
    setOrderNumber(generateOrderNumber());
  }, []);

  // Automatically navigate to the LandingPage after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCart([]); // Clear the cart
      navigate("/"); // Navigate to the LandingPage
    }, 15000); // 15 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate, setCart]);

  const handleButtonClick = () => {
    setCart([]); // Clear the cart
    navigate("/"); // Navigate to the LandingPage
  };
  
  return (
    <motion.div
      className="relative flex flex-col min-h-screen justify-center bg-white shadow-2xl rounded-2xl max-w-4xl mx-auto p-6 lg:p-8 my-4 lg:my-8 overflow-hidden border-2 border-gray-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 -z-10"></div>
      
      <div className="relative z-10">
        <motion.h2 
          className="text-3xl lg:text-5xl font-bold text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4 lg:mb-6"
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🎉 Bestellung bestätigt!
        </motion.h2>

        <motion.p 
          className="text-center text-gray-700 text-base lg:text-lg mb-6 lg:mb-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Vielen Dank für Ihre Bestellung! Wir haben Ihre Bestellung erhalten und arbeiten bereits daran.
        </motion.p>

        <motion.div 
          className="flex justify-center mb-6 lg:mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        >
          <img
            className="h-40 lg:h-56 rounded-2xl shadow-xl border-4 border-gray-100"
            src="/img/daumen_hoch.gif" 
            alt="Bestellung bestätigt"
          />
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 lg:p-8 mb-6">
            <p className="text-gray-600 text-sm lg:text-base mb-2">Ihre Bestellnummer:</p>
            <motion.p 
              className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 150 }}
            >
              #{orderNumber}
            </motion.p>
          </div>
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg rounded-xl shadow-lg font-bold"
            onClick={handleButtonClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏠 Neue Bestellung
          </motion.button>
          <p className="text-xs lg:text-sm text-gray-500 mt-4">
            Sie werden in 15 Sekunden automatisch zur Startseite weitergeleitet...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;