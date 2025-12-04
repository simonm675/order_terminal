import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CategoryPopup from "./popups/PopupCategory";
import { motion } from "framer-motion";

const Category = ({ filterProducts, setCart }) => {
  const [activeCategory, setActiveCategory] = useState("Menüs");
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
    if (category !== activeCategory) {
      // Verhindert endlose State-Updates
      setClickedCategory(category); // Startet die Animation
      setActiveCategory(category);
    }
  };

  // Handling der Bestellabbruch-Bestätigung
  const handleCancel = () => {
    setShowConfirmation(true);
  };

  const handleConfirmCancel = useCallback(() => {
    try {
      setShowConfirmation(false);
      setCart([]); // Clear the cart
      navigate("/"); // Navigate back to the homepage
    } catch (error) {
      console.error("Error during cancel confirmation:", error);
    }
  }, [setShowConfirmation, setCart, navigate]);

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
    <div className="relative flex flex-col justify-between bg-white shadow-lg rounded-xl px-3 py-3 mb-3 mt-3 ml-0 lg:ml-3 mr-0 lg:mr-3 w-full lg:w-auto lg:min-w-[280px] lg:max-w-[320px] overflow-hidden">
      {/* Oberer Bereich mit Bild und Button nebeneinander */}
      <div className="flex items-center justify-between mb-2">
        {/* Logo */}
        <motion.img
          className="w-full max-w-[200px] lg:max-w-xs mx-auto h-auto drop-shadow-2xl"
          src="/img/logo/logo_new-min.png"
          alt="Burger&Burger"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Button für Kategorien (nur auf mobilen Geräten) */}
        <motion.button
          onClick={() => setIsMenuVisible(!isMenuVisible)}
          className="lg:hidden block bg-gradient-to-r from-gray-200 to-gray-100 text-gray-800 py-2 px-3 rounded-lg font-semibold shadow-md text-sm"
          whileTap={{ scale: 0.95 }}
        >
          {isMenuVisible ? "✕" : "☰"}
        </motion.button>
      </div>

      {/* Kategorienliste */}
      <motion.ul
        className={`space-y-2 text-base lg:text-lg font-semibold overflow-y-auto scrollbar-thin ${
          isMenuVisible ? "block" : "hidden"
        } lg:block`}
        style={{ maxHeight: "calc(100vh - 300px)" }}
        initial={false}
        animate={{ opacity: isMenuVisible || window.innerWidth >= 1024 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {[
          { name: "Menüs", icon: "/img/product_img/burger_menu.jpeg" },
          { name: "Burger", icon: "/img/product_img/cheeseburger.jpeg" },
          { name: "Beilagen", icon: "/img/product_img/pommes.jpeg" },
          { name: "Subs", icon: "/img/product_img/salami_sub.jpeg" },
          { name: "Bowls", icon: "/img/product_img/chickenbowl.jpeg" },
          { name: "Dips", icon: "/img/product_img/garlic-dip.jpeg" },
          { name: "Getränke", icon: "/img/product_img/cola.jpeg" },
        ].map(({ name, icon }) => (
          <li key={name}>
            <motion.button
              initial={{ scale: 1 }}
              animate={{
                scale: clickedCategory === name ? 0.92 : 1,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={`relative flex items-center justify-center w-full py-3 px-3 lg:py-4 lg:px-4 rounded-xl shadow-md font-semibold transition-all duration-300 ${
                activeCategory === name
                  ? "text-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 shadow-xl shadow-yellow-500/30"
                  : "bg-gradient-to-br from-white to-gray-50 text-gray-800 hover:shadow-lg"
              }`}
              onClick={() => handleCategoryClick(name)}
              style={{
                backgroundImage: `url(${icon})`,
                backgroundSize: "60px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "10px center",
                paddingLeft: "80px",
                opacity: activeCategory === name ? 1 : 0.7,
                filter: activeCategory === name ? "none" : "grayscale(30%)",
              }}
            >
              <span className="text-sm lg:text-base">{name}</span>
            </motion.button>
          </li>
        ))}
      </motion.ul>


      {/* Bestellvorgang abbrechen */}
      <motion.button
        onClick={handleCancel}
        className="w-full py-3 lg:py-4 mt-3 rounded-xl font-semibold bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base"
        whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)" }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        🚫 Bestellvorgang abbrechen
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
