import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = ({ filterProducts }) => {
  const [activeCategory, setActiveCategory] = useState("All"); // Zustand für die aktive Kategorie
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setActiveCategory(category); // Setzt die aktive Kategorie
    filterProducts(category); // Filtert die Produkte nach der gewählten Kategorie
  };

  const handleCancel = () => {
    navigate("/"); // Navigiere zur Landingpage zurück
  };

  return (
    <div className="relative h-full flex flex-col justify-between">
      <div>
        <img
          className="h-24 mb-3"
          src="/img/logo-no-background-2.png"
          alt="SM Burger"
        />
        <ul className="space-y-2 text-lg font-semibold">
        <li>
            <button
              className={`${
                activeCategory === "All" ? "btn-kategorien-active" : "btn-kategorien"
              }`}
              onClick={() => handleCategoryClick("All")}
            >
              Alle Produkte
            </button>
          </li>
          <li>
            <button
              className={`${
                activeCategory === "Burger" ? "btn-kategorien-active" : "btn-kategorien"
              }`}
              onClick={() => handleCategoryClick("Burger")}
            >
              Burger
            </button>
          </li>
          <li>
            <button
              className={`${
                activeCategory === "Beilagen" ? "btn-kategorien-active" : "btn-kategorien"
              }`}
              onClick={() => handleCategoryClick("Beilagen")}
            >
              Beilagen
            </button>
          </li>
          <li>
            <button
              className={`${
                activeCategory === "Getränke" ? "btn-kategorien-active" : "btn-kategorien"
              }`}
              onClick={() => handleCategoryClick("Getränke")}
            >
              Getränke
            </button>
          </li>
          
        </ul>
      </div>

      <button
        onClick={handleCancel}
        className="bottom-btn2 w-full bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600"
      >
        Bestellvorgang abbrechen
      </button>
    </div>
  );
};

export default Category;
