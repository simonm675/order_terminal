import React from "react";
import { useNavigate } from "react-router-dom";

const Category = ({ filterProducts }) => {

  const handleCancel = () => {
    // Hier könnte eine Navigation zur Startseite hinzugefügt werden
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
              className="btn-kategorien-active"
              onClick={() => filterProducts("Burger")}
            >
              Burger
            </button>
          </li>
          <li>
            <button
              className="btn-kategorien"
              onClick={() => filterProducts("Beilagen")}
            >
              Beilagen
            </button>
          </li>
          <li>
            <button
              className="btn-kategorien"
              onClick={() => filterProducts("Getränke")}
            >
              Getränke
            </button>
          </li>
          <li>
            <button className="btn-kategorien" onClick={() => filterProducts("All")}>
              Alle anzeigen
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
