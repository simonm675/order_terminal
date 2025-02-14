// Popup.jsx
import React from "react";
import { motion } from "framer-motion"; // Importiere framer-motion
import "./popup.css";
import { div } from "framer-motion/client";

const CategoryPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="popup">
      <motion.div
        className="popup-inner"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xl  my-4">
          Möchtest Du den Bestellvorgang wirklich abbrechen?
        </p>
        <div className="p-4">
          <button
            onClick={onConfirm}
            className="bottom-btn2 py-4 px-4 mr-6 rounded-lg font-semibold "
          >
            Bestellung abbrechen
          </button>
          <button
            onClick={onCancel}
            className="btn-popup py-4 px-4 rounded-lg font-semibold "
          >
            weitermachen
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryPopup;
