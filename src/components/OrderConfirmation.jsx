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
      className="relative flex flex-col min-h-screen justify-center bg-gradient-to-br from-green-50 to-blue-50 shadow-2xl rounded-2xl max-w-4xl mx-auto p-6 lg:p-8 my-4 lg:my-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2 
        className="text-3xl lg:text-5xl font-bold text-center text-gray-800 mb-4 lg:mb-6"
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
          className="h-40 lg:h-56 rounded-2xl shadow-xl"
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
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl mb-6">
          <p className="text-gray-600 text-sm lg:text-base mb-2">Ihre Bestellnummer:</p>
          <p className="text-4xl lg:text-6xl font-bold text-blue-600">#{orderNumber}</p>
        </div>
        <motion.button
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 lg:px-12 py-3 lg:py-4 rounded-xl shadow-lg font-bold text-base lg:text-lg"
          onClick={handleButtonClick}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(37, 99, 235, 0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          🏠 Neue Bestellung
        </motion.button>
        <p className="text-xs lg:text-sm text-gray-500 mt-4">
          Sie werden in 15 Sekunden automatisch zur Startseite weitergeleitet...
        </p>
      </motion.div>
    </motion.div>
  );
};

export default OrderConfirmation;