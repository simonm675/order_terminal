import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryPopup from "./popups/PopupCategory";
import { motion } from "framer-motion";

const Category = ({ filterProducts, setCart }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setActiveCategory(category); // Setzt die aktive Kategorie
    filterProducts(category); // Filtert die Produkte nach der gewählten Kategorie
  };

  const handleCancel = () => {
    setShowConfirmation(true); // Zeigt das Bestätigungs-Popup an
  };

  const handleConfirmCancel = () => {
    setShowConfirmation(false); // Bestätigung abgeschlossen, Popup schließen
    setCart([]); // Leert den Warenkorb
    navigate("/"); // Navigiere zur Landingpage zurück
  };

  const handleCancelAbort = () => {
    setShowConfirmation(false); // Abbrechen, Popup schließen
  };

  return (
    <div className="relative flex flex-col justify-between bg-white shadow-md rounded-lg px-4 py-4 mb-3 mt-3 ml-3 lg:w-1/4 lg:mr-3 overflow-hidden">
      <div>
        <img
          className="mb-10"
          src="/img/logo-no-background-2.png"
          alt="SM Burger"
        />
        <ul className="space-y-3 text-lg font-semibold">
          <li>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
              className={`${
                activeCategory === "All"
                  ? "btn-kategorien-active"
                  : "btn-kategorien"
              }`}
              onClick={() => handleCategoryClick("All")}
            >
              Alle Gerichte
            </motion.button>
          </li>
          <li>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
              className={`${
                activeCategory === "Burger"
                  ? "btn-kategorien-active"
                  : "btn-kategorien"
              }`}
              onClick={() => handleCategoryClick("Burger")}
            >
              Burger
            </motion.button>
          </li>
          <li>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
              className={`${
                activeCategory === "Beilagen"
                  ? "btn-kategorien-active"
                  : "btn-kategorien"
              }`}
              onClick={() => handleCategoryClick("Beilagen")}
            >
              Sides
            </motion.button>
          </li>
          <li>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
              className={`${
                activeCategory === "Subs"
                  ? "btn-kategorien-active"
                  : "btn-kategorien"
              }`}
              onClick={() => handleCategoryClick("Subs")}
            >
              Subs
            </motion.button>
          </li>
          <li>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
              className={`${
                activeCategory === "Bowls"
                  ? "btn-kategorien-active"
                  : "btn-kategorien"
              }`}
              onClick={() => handleCategoryClick("Bowls")}
            >
              Bowls
            </motion.button>
          </li>
          <li>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
              className={`${
                activeCategory === "Dips"
                  ? "btn-kategorien-active"
                  : "btn-kategorien"
              }`}
              onClick={() => handleCategoryClick("Dips")}
            >
              Dips
            </motion.button>
          </li>
          <li>
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
              className={`${
                activeCategory === "Getränke"
                  ? "btn-kategorien-active"
                  : "btn-kategorien"
                  
              }`}
              onClick={() => handleCategoryClick("Getränke")}
            >
              Getränke
            </motion.button>
          </li>
        </ul>
      </div>

      <motion.button
        onClick={handleCancel}
        className="bottom-btn2 w-full py-2 rounded-lg font-semibold active:bg-transparent"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        Bestellvorgang abbrechen
      </motion.button>

      {/* Bestätigungs-Popup anzeigen, wenn der Zustand `showConfirmation` true ist */}
      {showConfirmation && (
        <CategoryPopup
          onConfirm={handleConfirmCancel} // Bestätigt den Abbruch
          onCancel={handleCancelAbort} // Bricht den Vorgang ab
        />
      )}
    </div>
  );
};

export default Category;
