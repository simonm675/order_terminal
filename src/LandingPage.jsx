import React from "react";
import { useNavigate } from "react-router-dom";
import App from "./App";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    // Navigiere zur Bestellseite mit weitergegebenen Optionen (falls nötig)
    navigate("/order", { state: { option } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      {/* Header Section */}
      <header className="flex flex-col items-center text-center p-6">
        <img 
          src="img\logo\logo-no-background.png" 
          alt="SM Burger Logo" 
          className="w-80 mb-4" 
        />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
          Willkommen bei SM Burger
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Genießen Sie die besten Burger der Stadt, frisch und lecker, genau nach Ihrem Geschmack!
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={() => handleOptionClick("Zum Mitnehmen")}
            className="bg-yellow-500 text-white py-3 px-8 rounded-lg text-xl hover:bg-yellow-600 transition-all"
          >
            Zum Mitnehmen Bestellen
          </button>
          <a 
            onClick={() => handleOptionClick("Zum Mitnehmen")}
            className="bg-transparent border-2 border-yellow-500 text-yellow-500 py-3 px-8 rounded-lg text-xl hover:bg-yellow-500 hover:text-white transition-all"
          >
            Zum hier essen
          </a>
        </div>
      </header>

      {/* Footer Section */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>&copy; 2024 SM Burger. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}

export default LandingPage;