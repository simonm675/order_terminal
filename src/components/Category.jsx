import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryPopup from "./popups/PopupCategory";

const Category = ({ filterProducts }) => {
  const [activeCategory, setActiveCategory] = useState("All"); // Zustand für die aktive Kategorie
  const [showConfirmation, setShowConfirmation] = useState(false); // Zustand für das Bestätigungs-Popup
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
    navigate("/"); // Navigiere zur Landingpage zurück
  };

  const handleCancelAbort = () => {
    setShowConfirmation(false); // Abbrechen, Popup schließen
  };

  return (
    <div className="relative flex flex-col justify-between bg-white shadow-md rounded-lg px-4 py-4 mb-3 mt-3 ml-3 lg:w-1/4 lg:mr-3 overflow-hidden">
      <div>
        <img
          className="mb-3"
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
        className="bottom-btn2 w-full   py-2 px-4 rounded-lg font-semibold "
      >
        Bestellvorgang abbrechen
      </button>

      {/* Bestätigungs-Popup anzeigen, wenn der Zustand `showConfirmation` true ist */}
      {showConfirmation && (
        <CategoryPopup
          onConfirm={handleConfirmCancel} // Bestätigt den Abbruch
          onCancel={handleCancelAbort}   // Bricht den Vorgang ab
        />
      )}
    </div>
  );
};

export default Category;
