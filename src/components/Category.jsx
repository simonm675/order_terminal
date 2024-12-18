import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CategoryPopup from "./popups/PopupCategory";
import { motion } from "framer-motion";

const Category = ({ filterProducts, setCart }) => {
  const [activeCategory, setActiveCategory] = useState("Menu");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [clickedCategory, setClickedCategory] = useState(null); // Zustand für Animation
  const navigate = useNavigate();

  // Verwende useCallback für filterProducts, um unnötige Renderzyklen zu vermeiden
  const memoizedFilterProducts = useCallback(
    (category) => {
      filterProducts(category);
    },
    [filterProducts]
  );

  // useEffect für das Handling der Category-Änderung
  useEffect(() => {
    memoizedFilterProducts(activeCategory);
  }, [activeCategory, memoizedFilterProducts]);

  // Handling der Kategorie-Klicks mit Animation
  const handleCategoryClick = (category) => {
    if (category !== activeCategory) { // Verhindert endlose State-Updates
      setClickedCategory(category); // Startet die Animation
      setActiveCategory(category);
    }
  };

  // Handling der Bestellabbruch-Bestätigung
  const handleCancel = () => {
    setShowConfirmation(true);
  };

  const handleConfirmCancel = () => {
    setShowConfirmation(false);
    setCart([]); // Warenkorb leeren
    navigate("/"); // Zurück zur Startseite
  };

  const handleCancelAbort = () => {
    setShowConfirmation(false); // Bestätigung abbrechen
  };

  // useEffect für das Zurücksetzen des 'clickedCategory' nach der Animation
  useEffect(() => {
    if (clickedCategory) {
      const timer = setTimeout(() => setClickedCategory(null), 100);
      return () => clearTimeout(timer); // Aufräumen des Timers bei Komponentendestruktion
    }
  }, [clickedCategory]);

  return (
    <div className="relative flex flex-col justify-between bg-white shadow-md rounded-lg px-4 py-4 mb-3 mt-3 ml-3 lg:w-1/4 lg:mr-3 overflow-hidden w-full max-w-md mx-auto">
      {/* Oberer Bereich mit Bild und Button nebeneinander */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <img
          className="w-full max-w-xs mx-auto h-auto drop-shadow-2xl"
          src="/img/logo/logo_new-min.png"
          alt="Burger&Burger"
        />

        {/* Button für Kategorien */}
        <button
          onClick={() => setIsMenuVisible(!isMenuVisible)}
          className="lg:hidden block bg-gray-100 text-gray-800 py-2 px-4 rounded-md font-semibold"
        >
          {isMenuVisible ? "Kategorien ausblenden" : "Kategorien anzeigen"}
        </button>
      </div>

      {/* Kategorienliste */}
      <ul
        className={`space-y-3 text-lg font-semibold ${
          isMenuVisible ? "block" : "hidden"
        } lg:block`}
      >
        {[
          "Menu",
          "Burger",
          "Beilagen",
          "Subs",
          "Bowls",
          "Dips",
          "Getränke",
        ].map((category) => (
          <li key={category}>
            <motion.button
              initial={{ scale: 1 }}
              animate={{
                scale: clickedCategory === category ? 0.85 : 1, // Animation, wenn gedrückt
              }}
              transition={{ duration: 0.2 }}
              className={`${
                activeCategory === category
                  ? "bg-gradient-to-t from-gray-400 to-gray-200 text-black shadow-lg"
                  : "bg-gradient-to-t from-white to-gray-100 text-black"
              } w-full py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-md mb-2 shadow-md font-semibold`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </motion.button>


            
          </li>
        ))}
      </ul>

      {/* Bestellvorgang abbrechen */}
      <motion.button
        onClick={handleCancel}
        className="w-full py-2 sm:py-3 md:py-4 rounded-lg font-semibold bg-gradient-to-t from-red-500 to-red-300 text-white shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        Bestellvorgang abbrechen
      </motion.button>

      {/* Popup für Bestätigung */}
      {showConfirmation && (
        <CategoryPopup
          onConfirm={handleConfirmCancel}
          onCancel={handleCancelAbort}
        />
      )}
    </div>
  );
};

export default Category;
