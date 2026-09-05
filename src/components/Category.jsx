import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CategoryPopup from "./popups/PopupCategory";
import { motion } from "framer-motion";

const Category = ({ filterProducts, setCart }) => {
  const [activeCategory, setActiveCategory] = useState("Menüs");
  const [showConfirmation, setShowConfirmation] = useState(false);
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
    <div className="relative z-20 flex w-full flex-col justify-between border-b border-gray-200 bg-white px-3 py-3 shadow-sm lg:my-3 lg:ml-3 lg:mr-3 lg:w-auto lg:min-w-[280px] lg:max-w-[300px] lg:overflow-hidden lg:rounded-2xl lg:border-2 lg:border-gray-100 lg:shadow-xl">
      {/* Oberer Bereich mit Bild und Button nebeneinander */}
      <div className="flex items-center justify-between mb-3">
        {/* Logo */}
        <motion.img
          className="w-24 h-auto lg:w-28 drop-shadow-lg"
          src="/img/logo/logo_new-min.png"
          alt="Burger&Burger"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />

      </div>

      {/* Kategorienliste */}
      <motion.ul
        className="flex max-w-full gap-2 overflow-x-auto pb-1 scrollbar-thin text-base font-semibold lg:block lg:space-y-3 lg:overflow-y-auto lg:overflow-x-hidden lg:text-lg"
        style={{ maxHeight: "calc(100vh - 300px)" }}
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[
          { name: "Menüs", icon: "/img/product_img/burger_menu.jpeg", emoji: "🍔" },
          { name: "Burger", icon: "/img/product_img/cheeseburger.jpeg", emoji: "🍔" },
          { name: "Beilagen", icon: "/img/product_img/pommes.jpeg", emoji: "🍟" },
          { name: "Subs", icon: "/img/product_img/salami_sub.jpeg", emoji: "🥖" },
          { name: "Bowls", icon: "/img/product_img/chickenbowl.jpeg", emoji: "🥗" },
          { name: "Dips", icon: "/img/product_img/garlic-dip.jpeg", emoji: "🥫" },
          { name: "Getränke", icon: "/img/product_img/cola.jpeg", emoji: "🥤" },
        ].map(({ name, icon, emoji }) => (
          <li key={name} className="min-w-[116px] shrink-0 lg:min-w-0">
            <motion.button
              initial={{ scale: 1 }}
              animate={{
                scale: clickedCategory === name ? 0.94 : 1,
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={`relative w-full py-3 px-3 lg:py-3 lg:px-3 font-bold rounded-xl border-2 text-sm lg:text-base flex items-center gap-2 ${
                activeCategory === name
                  ? "bg-blue-500 text-white shadow-lg border-blue-600"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
              onClick={() => handleCategoryClick(name)}
              style={{
                backgroundImage: activeCategory === name ? 'none' : 'none',
                paddingLeft: "12px",
              }}
            >
              <span className="text-xl">{emoji}</span>
              <span className={`text-sm lg:text-base font-bold ${activeCategory === name ? "text-white" : "text-gray-800"}`}>{name}</span>
            </motion.button>
          </li>
        ))}
      </motion.ul>


      {/* Bestellvorgang abbrechen */}
      <motion.button
        onClick={handleCancel}
        className="mt-2 min-h-[36px] w-auto self-end rounded-lg border border-gray-200 bg-transparent px-3 py-1.5 text-xs font-medium text-gray-400 shadow-none transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 lg:mt-4 lg:w-full lg:text-sm"
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Abbrechen
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
