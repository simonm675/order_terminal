import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ cart, handleRemoveClick }) => {
  const navigate = useNavigate(); // React Router Hook für Navigation

  const totalAmount = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2);
  }, [cart]);

  return (
    <motion.div 
      className="relative flex flex-col justify-between bg-white shadow-xl rounded-xl px-3 py-3 mb-3 mt-3 ml-0 lg:ml-3 mr-0 lg:mr-3 w-full lg:w-auto lg:min-w-[280px] lg:max-w-[320px] overflow-hidden"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ul
        className="space-y-2 overflow-y-auto scrollbar-thin" // Fügt Scrollen für die Liste hinzu
        style={{ maxHeight: "calc(100vh - 250px)" }} // Setzt eine maximale Höhe für die Liste
      >
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          🛒 Warenkorb
        </h2>
        {cart.length === 0 ? (
          <motion.div 
            className="text-gray-500 flex flex-col items-center justify-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-base lg:text-lg text-center mb-4">Der Warenkorb ist leer.</p>
            <img
              className="w-32 h-32 lg:w-40 lg:h-40 drop-shadow-lg opacity-50"
              src="./img/shopping_cart.png"
              alt="Warenkorb"
            />
          </motion.div>
        ) : (
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-200 pb-3 last:border-b-0"
                initial={{ opacity: 0, scale: 0.9, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                layout
              >
                <div className="flex items-center mb-2 flex-1">
                  <motion.div 
                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg overflow-hidden mr-3 shadow-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-bold text-sm lg:text-base text-gray-800">{item.name}</p>
                    <p className="text-xs lg:text-sm text-gray-600">
                      {item.quantity} x {item.price.toFixed(2)} €
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => handleRemoveClick(item)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                  aria-label={`Remove ${item.name} from cart`}
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-5 h-5 lg:w-6 lg:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </ul>

      {cart.length > 0 && (
        <div className="flex flex-col justify-between mt-auto pt-3">
          <hr className="my-3 border-gray-200" />
          <div className="flex justify-between text-base lg:text-lg">
            <p className="font-bold text-gray-700">Summe:</p>
            <motion.p
              className="text-green-600 font-bold text-lg lg:text-xl"
              key={totalAmount}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {totalAmount} €
            </motion.p>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <motion.button
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 lg:py-4 rounded-xl shadow-lg transition-all duration-300 text-sm lg:text-base"
          onClick={() => navigate("/order/summary")}
          whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(37, 99, 235, 0.3)" }}
          whileTap={{ scale: 0.97 }}
          aria-label="Proceed to checkout"
        >
          <span className="flex items-center justify-center gap-2">
            💳 Zur Kasse gehen
          </span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default ShoppingCart;