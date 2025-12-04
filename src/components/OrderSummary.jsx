import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Zum Navigieren zur Zahlungsmethoden-Seite

const OrderSummary = ({ cart }) => {
  const navigate = useNavigate();

  // Berechnung der Gesamtsumme der Bestellung
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <motion.div 
      className="relative flex flex-col min-h-screen bg-white justify-between rounded-xl max-w-4xl mx-auto p-4 lg:p-6 shadow-2xl m-2 lg:m-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4 lg:mb-6">
        📋 Bestellübersicht
      </h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-xl">Ihr Warenkorb ist leer.</p>
          <img
            className="w-32 h-32 mx-auto mt-6"
            src="https://via.placeholder.com/150"
            alt="Warenkorb leer"
          />
        </div>
      ) : (
        <div className="flex-grow mb-6">
          <ul
            className="space-y-2 overflow-y-auto scrollbar-thin"
            style={{ maxHeight: "710px" }}
          >
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b pb-4 last:border-b-0"
              >
                <div className="flex items-center">
                  <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="shadow-lg w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-700">
                      {item.name}
                    </p>
                    <p className="text-gray-500">
                      {item.quantity} x {item.price.toFixed(2)} €
                    </p>
                  </div>
                </div>
                <div className="text-lg text-gray-800 font-semibold mr-4">
                  {(item.price * item.quantity).toFixed(2)} €
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gesamtsumme und Buttons */}
      <div className="flex flex-col mt-auto space-y-4 pt-4">
        <hr className="border-gray-300" />
        <div className="flex justify-between items-center text-lg lg:text-xl font-bold text-gray-800">
          <p>Gesamtsumme:</p>
          <p className="text-green-600 text-2xl lg:text-3xl">{calculateTotal().toFixed(2)} €</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pb-4 lg:pb-6">
          {/* Linker Button */}
          <motion.button
            className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 rounded-xl shadow-lg font-bold transition duration-300 py-3 lg:py-4 text-sm lg:text-base"
            onClick={() => navigate("/order")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Warenkorb bearbeiten
          </motion.button>

          {/* Rechter Button */}
          <motion.button
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl shadow-lg font-bold transition duration-300 py-3 lg:py-4 text-sm lg:text-base"
            onClick={() =>
              navigate("/payment-methods", {
                state: { totalAmount: calculateTotal() },
              })
            }
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(22, 163, 74, 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            💳 Jetzt bezahlen
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
