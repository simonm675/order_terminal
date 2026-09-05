import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";

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
      className="relative flex min-h-[100dvh] flex-col bg-gray-50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <PageHeader />
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-4xl flex-col justify-center overflow-hidden border-2 border-gray-100 bg-white p-4 shadow-2xl sm:my-4 sm:rounded-2xl sm:p-6 lg:my-8 lg:p-8">
        <motion.h2 
          className="mb-3 text-2xl font-bold text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent sm:mb-4 sm:text-3xl lg:mb-6 lg:text-5xl"
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🎉 Bestellung bestätigt!
        </motion.h2>

        <motion.p 
          className="mb-5 px-2 text-center text-sm text-gray-700 sm:mb-6 sm:px-4 sm:text-base lg:mb-8 lg:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Vielen Dank für Ihre Bestellung! Wir haben Ihre Bestellung erhalten und arbeiten bereits daran.
        </motion.p>

        <motion.div 
          className="mb-5 flex justify-center sm:mb-6 lg:mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        >
          <img
            className="h-32 rounded-2xl border-4 border-gray-100 shadow-xl sm:h-40 lg:h-56"
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
          <div className="mb-5 rounded-2xl border-2 border-gray-200 bg-gray-50 p-4 sm:mb-6 sm:p-6 lg:p-8">
            <p className="text-gray-600 text-sm lg:text-base mb-2">Ihre Bestellnummer:</p>
            <motion.p 
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:text-4xl lg:text-6xl"
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