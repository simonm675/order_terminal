import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({
  cart,
  handleRemoveClick,
}) => {
  const navigate = useNavigate(); // React Router Hook für Navigation

  return (
    <motion.div className="relative flex flex-col justify-between bg-white shadow-md rounded-lg px-4 py-4 mb-3 mt-3 ml-3 lg:w-1/4 lg:mr-3 overflow-hidden">
      <ul className="space-y-2">
        <h2 className="text-3xl font-semibold mb-4">Warenkorb</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600 flex flex-col">
            Der Warenkorb ist leer.
            <img
              className="img-shopping-card drop-shadow-2xl mt-4"
              src="./img/shopping_cart.png"
              alt="Warenkorb"
            />
          </p>
        ) : (
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className="flex justify-between items-center mb-2"
                initial={{ opacity: 0, scale: 0.9 }} // Animation beim Hinzufügen
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, x: -50 }} // Animation beim Entfernen
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="shadow-lg object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">
                      {item.quantity} x {item.price.toFixed(2)} €
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveClick(item)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.586L5.710 15 4.293 15.586 8.586 11.293 4.293 7 5.707 5.586 10 10.899 14.293 5.586 15.707 7 11.414 11.293 15.707 15.586 14.293 17 10 12.707 5.707 17 4.293 15.586z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </ul>

      {cart.length > 0 && (
        <div className="flex flex-col justify-between mt-auto mb-4">
          <hr className="my-4" />
          <div className="flex justify-between text-lg">
            <p className="font-semibold">Summe:</p>
            <motion.p
              className="text-green-400 font-semibold"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {cart
                .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                .toFixed(2)}{" "}
              €
            </motion.p>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <motion.button
          className="cssbuttons-io-button-kasse py-4"
          onClick={() => navigate("/order/summary")} // Navigiert zur Bestellübersicht
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Zur Kasse gehen</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default ShoppingCart;
