import React from "react";
import { motion } from "framer-motion";
import "./popup.css";

function Popup({ trigger, setTrigger, children }) {
  return trigger ? (
    <div
      className="popup"
      onClick={(e) => {
        if (e.target.className === "popup") setTrigger(false);
      }}
    >
      <motion.div
        className="popup-inner"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl  my-4">
          Produkt wirklich entfernen?
        </h3>
        {children}
      </motion.div>
    </div>
  ) : null;
}

export default Popup;
