import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Zum Navigieren zur Zahlungsmethoden-Seite
import PageHeader from "./PageHeader";

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
    <div className="min-h-[100dvh] w-full flex flex-col bg-gray-50">
      <PageHeader />
      <motion.div 
        className="relative mx-auto flex max-h-[calc(100dvh-5rem)] w-full max-w-4xl flex-col justify-between overflow-hidden rounded-2xl border-2 border-gray-100 bg-white p-3 shadow-2xl sm:max-h-[calc(100dvh-6rem)] sm:p-4 lg:p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ maxHeight: '95dvh' }}
      >
      <h2 className="mb-3 text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:mb-4 sm:text-3xl lg:mb-6 lg:text-4xl">
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
            style={{ maxHeight: "calc(95dvh - 330px)", overflowY: "auto" }}
          >
            {cart.map((item, index) => (
              <li
                key={index}
                className="mb-2 flex items-center justify-between rounded-xl border-2 border-gray-200 bg-gray-50 p-2 sm:mb-3 sm:p-3"
              >
                <div className="flex items-center">
                  <div className="mr-2 h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border-2 border-gray-200 sm:mr-4 sm:h-20 sm:w-20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="max-w-[10rem] truncate font-semibold text-sm text-gray-900 sm:max-w-none sm:text-lg">
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
                <div className="ml-2 text-sm font-bold text-green-600 sm:mr-4 sm:text-lg">
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
        <div className="flex items-center justify-between text-base font-bold text-gray-800 sm:text-lg lg:text-xl">
          <p>Gesamtsumme:</p>
          <p className="text-xl text-green-600 sm:text-2xl lg:text-3xl">{calculateTotal().toFixed(2)} €</p>
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
