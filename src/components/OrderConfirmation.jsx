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
      className="relative flex flex-col min-h-screen justify-center bg-white shadow-xl rounded-lg max-w-3xl mx-auto p-6 my-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
        Bestellung bestätigt 🎉
      </h2>

      <p className="text-center text-gray-600 text-lg mb-8">
        Vielen Dank für Ihre Bestellung! Wir haben Ihre Bestellung erhalten und arbeiten bereits daran.
      </p>

      <div className="flex justify-center mb-8">
        <img
          className="h-56"
          src="/img/daumen_hoch.gif" 
          alt="Bestellung bestätigt"
        />
      </div>

      <div className="text-center">
        <p className="text-lg text-gray-800 mb-4">
          Ihre Bestellnummer lautet: {orderNumber}
        </p>
        <button
          className="cssbuttons-io-button p-4 rounded-lg font-bold"
          onClick={handleButtonClick}
        >
          Neue Bestellung
        </button>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;