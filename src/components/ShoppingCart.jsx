import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ cart, handleRemoveClick, setCart }) => {
  const navigate = useNavigate();

  const totalAmount = useMemo(() => {
    return cart.reduce((acc, curr) => {
      const price = curr.finalPrice || curr.price;
      return acc + price * curr.quantity;
    }, 0).toFixed(2);
  }, [cart]);

  const updateQuantity = (item, change) => {
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === item.id) {
        const newQuantity = Math.max(1, cartItem.quantity + change);
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  return (
    <>
      {/* Desktop & Tablet (lg und größer) */}
      <motion.div 
        className="hidden lg:flex flex-col justify-between bg-white shadow-xl px-3 py-4 ml-3 mr-3 w-auto min-w-[280px] max-w-[320px] overflow-hidden rounded-2xl border-2 border-gray-100 h-[calc(100vh-24px)]"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ul
          className="space-y-2 flex-1"
          style={{ overflowY: "auto", overflowX: "hidden" }}
        >
          <h2 className="text-lg font-bold mb-3 text-gray-900 flex items-center gap-2 sticky top-0 bg-white pb-2 border-b-2 border-gray-100">
            🛒 Warenkorb
            {cart.length > 0 && (
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">{cart.length}</span>
            )}
          </h2>
          {cart.length === 0 ? (
            <motion.div 
              className="text-gray-500 flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-center mb-3">Der Warenkorb ist leer.</p>
              <img
                className="w-24 h-24 drop-shadow-lg opacity-50 rounded-xl"
                src="./img/shopping_cart.png"
                alt="Warenkorb"
              />
            </motion.div>
          ) : (
            <AnimatePresence>
              {cart.map((item) => {
                const itemPrice = item.finalPrice || item.price;
                return (
                  <motion.div
                    key={item.id}
                    className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2"
                    initial={{ opacity: 0, scale: 0.9, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -100 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    layout
                  >
                    <div className="flex items-start gap-2 mb-1">
                      <motion.div 
                        className="w-12 h-12 rounded-lg overflow-hidden shadow-md flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-xs text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-600">
                          {itemPrice.toFixed(2)} €
                        </p>
                        {item.customization && (
                          <div className="text-xs text-blue-600">
                            ⚙️ Angepasst
                          </div>
                        )}
                      </div>
                      <motion.button
                        onClick={() => handleRemoveClick(item)}
                        className="bg-red-500 text-white p-1 rounded flex-shrink-0"
                        aria-label={`Remove ${item.name} from cart`}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg
                          className="w-3 h-3"
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
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between gap-1 mt-1">
                      <div className="flex items-center gap-1">
                        <motion.button
                          onClick={() => updateQuantity(item, -1)}
                          className="bg-gray-200 text-gray-700 w-6 h-6 rounded flex items-center justify-center text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                          whileTap={{ scale: 0.9 }}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </motion.button>
                        <span className="text-sm font-bold min-w-[1.5rem] text-center text-gray-900">
                          {item.quantity}
                        </span>
                        <motion.button
                          onClick={() => updateQuantity(item, 1)}
                          className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                          whileTap={{ scale: 0.9 }}
                        >
                          +
                        </motion.button>
                      </div>
                      <span className="font-bold text-green-600 text-xs">
                        {(itemPrice * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </ul>

        {cart.length > 0 && (
          <div className="flex flex-col justify-between mt-4 bg-white border-t-2 border-gray-100 pt-3">
            <div className="flex justify-between text-sm mb-3">
              <p className="font-bold text-gray-700">Summe:</p>
              <motion.p
                className="text-green-600 font-bold text-lg"
                key={totalAmount}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {totalAmount} €
              </motion.p>
            </div>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-full py-2 text-sm font-bold rounded-lg shadow-lg"
              onClick={() => navigate("/order/summary")}
              whileTap={{ scale: 0.98 }}
              aria-label="Proceed to checkout"
            >
              <span className="flex items-center justify-center gap-1">
                💳 Kasse ({cart.length})
              </span>
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Mobile (unter lg) */}
      <motion.div 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t-2 border-gray-100 rounded-t-2xl z-40 box-border"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-full px-3 py-3 max-h-[40vh] flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              🛒 Warenkorb
              {cart.length > 0 && (
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">{cart.length}</span>
              )}
            </h2>
          </div>

          {cart.length === 0 ? (
            <div className="text-gray-500 flex flex-col items-center justify-center py-8 text-center flex-1">
              <p className="text-sm mb-2">Der Warenkorb ist leer.</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto min-h-0 mb-3">
              <AnimatePresence>
                {cart.map((item) => {
                  const itemPrice = item.finalPrice || item.price;
                  return (
                    <motion.div
                      key={item.id}
                      className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2 mb-2 flex-shrink-0"
                      initial={{ opacity: 0, scale: 0.9, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: -100 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      layout
                    >
                      <div className="flex items-start gap-2">
                        <motion.div 
                          className="w-14 h-14 rounded-lg overflow-hidden shadow-md flex-shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-gray-900 truncate">{item.name}</p>
                          <p className="text-xs text-gray-600 mb-1">
                            {itemPrice.toFixed(2)} € x{item.quantity}
                          </p>
                          {item.customization && (
                            <div className="text-xs text-blue-600">
                              ⚙️ Angepasst
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <motion.button
                            onClick={() => handleRemoveClick(item)}
                            className="bg-red-500 text-white p-1.5 rounded"
                            aria-label={`Remove ${item.name} from cart`}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg
                              className="w-4 h-4"
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
                        </div>
                      </div>

                      {/* Quantity Controls Mobile */}
                      <div className="flex items-center gap-2 mt-2 ml-16">
                        <motion.button
                          onClick={() => updateQuantity(item, -1)}
                          className="bg-gray-200 text-gray-700 w-7 h-7 rounded flex items-center justify-center text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                          whileTap={{ scale: 0.9 }}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </motion.button>
                        <span className="text-sm font-bold min-w-[1.5rem] text-center text-gray-900">
                          {item.quantity}
                        </span>
                        <motion.button
                          onClick={() => updateQuantity(item, 1)}
                          className="bg-blue-500 text-white w-7 h-7 rounded flex items-center justify-center text-sm font-bold"
                          whileTap={{ scale: 0.9 }}
                        >
                          +
                        </motion.button>
                        <span className="ml-auto font-bold text-green-600">
                          {(itemPrice * item.quantity).toFixed(2)} €
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {cart.length > 0 && (
            <div className="border-t-2 border-gray-100 pt-3">
              <div className="flex justify-between text-sm mb-3">
                <p className="font-bold text-gray-700">Summe:</p>
                <motion.p
                  className="text-green-600 font-bold text-lg"
                  key={totalAmount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {totalAmount} €
                </motion.p>
              </div>
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-full py-3 text-base font-bold rounded-lg shadow-lg"
                onClick={() => navigate("/order/summary")}
                whileTap={{ scale: 0.98 }}
                aria-label="Proceed to checkout"
              >
                <span className="flex items-center justify-center gap-2">
                  💳 Zur Kasse ({cart.length})
                </span>
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Spacing für mobile Bottom Sheet */}
      <div className="lg:hidden h-[40vh]" />
    </>
  );
};

export default ShoppingCart;