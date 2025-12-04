import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Zum Navigieren zur Zahlungsmethoden-Seite

const OrderSummary = ({ cart }) => {
  const navigate = useNavigate();

  // Berechnung der Gesamtsumme der Bestellung
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.finalPrice || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-2 lg:p-4">
      <motion.div 
        className="relative flex flex-col bg-white shadow-2xl rounded-2xl justify-between w-full max-w-4xl p-4 lg:p-6 border-2 border-gray-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ maxHeight: '95vh' }}
      >
      <h2 className="text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 lg:mb-6">
        📋 Bestellübersicht
      </h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 flex-grow flex items-center justify-center">
          <div>
            <p className="text-xl mb-4">Ihr Warenkorb ist leer.</p>
            <img
              className="w-32 h-32 mx-auto mt-6 opacity-50 rounded-xl"
              src="https://via.placeholder.com/150"
              alt="Warenkorb leer"
            />
          </div>
        </div>
      ) : (
        <div className="flex-grow mb-6 overflow-hidden">
          <ul
            className="space-y-2"
            style={{ maxHeight: "calc(95vh - 350px)", overflowY: "auto" }}
          >
            {cart.map((item, index) => (
              <li
                key={index}
                className="bg-gray-50 border-2 border-gray-200 rounded-xl flex items-center justify-between mb-3 p-3"
              >
                <div className="flex items-center">
                  <div className="w-20 h-20 rounded-xl overflow-hidden mr-4 border-2 border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {item.quantity} x {(item.finalPrice || item.price).toFixed(2)} €
                    </p>
                    {item.customization && (
                      <p className="text-xs text-blue-600 mt-1 font-semibold">✨ Angepasst</p>
                    )}
                  </div>
                </div>
                <div className="text-lg text-green-600 font-bold mr-4">
                  {((item.finalPrice || item.price) * item.quantity).toFixed(2)} €
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gesamtsumme und Buttons */}
      <div className="flex flex-col mt-auto space-y-4 pt-4 w-full">
        <hr className="border-gray-300" />
        <div className="flex justify-between items-center text-lg lg:text-xl font-bold text-gray-800">
          <p>Gesamtsumme:</p>
          <p className="text-green-600 text-2xl lg:text-3xl">{calculateTotal().toFixed(2)} €</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pb-4 lg:pb-6">
          {/* Linker Button */}
          <motion.button
            className="flex-1 bg-gray-200 text-gray-800 rounded-xl shadow-lg font-bold py-3 lg:py-4 text-sm lg:text-base"
            onClick={() => navigate("/order")}
            whileTap={{ scale: 0.98 }}
          >
            ← Warenkorb bearbeiten
          </motion.button>

          {/* Rechter Button */}
          <motion.button
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg font-bold py-3 lg:py-4 text-sm lg:text-base"
            onClick={() =>
              navigate("/payment-methods", {
                state: { totalAmount: calculateTotal() },
              })
            }
            whileTap={{ scale: 0.98 }}
          >
            💳 Jetzt bezahlen
          </motion.button>
        </div>
      </div>
      </motion.div>
    </div>
  );
};

export default OrderSummary;
