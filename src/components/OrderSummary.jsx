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
    <motion.div className="relative flex flex-col min-h-screen bg-white justify-between rounded-lg max-w-3xl mx-auto p-6 shadow-xl m-2">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
        Bestellübersicht
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
      <div className="flex flex-col mt-auto space-y-4">
        <hr />
        <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
          <p>Gesamtsumme:</p>
          <p className="text-green-500">{calculateTotal().toFixed(2)} €</p>
        </div>

        <div className="flex justify-between space-x-4 pb-12">
          {/* Linker Button */}
          <button
            className="btn-popup rounded-lg shadow-md w-1/2 font-semibold transition duration-300 py-4"
            onClick={() => navigate("/order")} // Navigiert zurück zur OrderPage
          >
            Warenkorb bearbeiten
          </button>

          {/* Rechter Button */}
          <button
            className="cssbuttons-io-button-kasse rounded-lg shadow-md w-1/2 transition duration-300"
            onClick={() =>
              navigate("/payment-methods", {
                state: { totalAmount: calculateTotal() },
              })
            }
          >
            Jetzt bezahlen
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
