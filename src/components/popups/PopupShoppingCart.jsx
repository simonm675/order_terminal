import React from "react";
import { motion } from "framer-motion";
import "./popup.css";

function Popup({ trigger, setTrigger, children }) {
  return trigger ? (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setTrigger(false);
      }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-2 border-gray-100"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🗑️</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Produkt entfernen?
          </h3>
        </div>
        <div className="flex gap-3">
          {children}
        </div>
      </motion.div>
    </div>
  ) : null;
}

export default Popup;
