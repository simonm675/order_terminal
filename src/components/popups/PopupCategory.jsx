// Popup.jsx
import React from "react";
import { motion } from "framer-motion"; // Importiere framer-motion
import "./popup.css";
import { div } from "framer-motion/client";

const CategoryPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-2 border-gray-100"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Bestellung abbrechen?
          </h3>
          <p className="text-gray-600">
            Möchtest Du den Bestellvorgang wirklich abbrechen?
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-semibold"
          >
            Weitermachen
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl font-semibold"
          >
            Abbrechen
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryPopup;
