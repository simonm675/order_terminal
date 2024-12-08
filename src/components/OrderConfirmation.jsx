import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(null);

  // Generiere eine zufällige Bestellnummer beim Laden der Komponente
  useEffect(() => {
    const generateOrderNumber = () => Math.floor(Math.random() * (600 - 150 + 1)) + 150;
    setOrderNumber(generateOrderNumber());
  }, []);

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
          className="w-48 h-48"
          src="https://via.placeholder.com/300" // Hier könntest du ein passendes Bild verwenden
          alt="Bestellung bestätigt"
        />
      </div>

      <div className="text-center">
        <p className="text-lg text-gray-800 mb-4">
          Ihre Bestellnummer lautet: <span className="font-bold">#{orderNumber}</span>
        </p>
        <p className="text-gray-600">
          Eine Bestätigungs-E-Mail wurde an Ihre angegebene Adresse gesendet.
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <button
          className="btn-popup rounded-lg shadow-md w-1/2 font-semibold transition duration-300 py-4 mr-4"
          onClick={() => navigate("/")}
        >
          Zurück zur Startseite
        </button>
        <button
          className="cssbuttons-io-button rounded-lg shadow-md w-1/2 font-semibold transition duration-300 py-4"
          onClick={() => navigate("/order")}
        >
          Weitere Bestellung
        </button>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;
