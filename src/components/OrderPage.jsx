import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Products from "./products/Products";
import Popup from "./popups/PopupShoppingCart";
import Category from "./Category";
import ShoppingCart from "./ShoppingCart";
import OrderItems from "./OrderItems"; // Import the new component
import { motion } from "framer-motion";

function OrderPage({ addToCart, cart, setCart }) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Product for the popup
  const [filteredProducts, setFilteredProducts] = useState(Products); // For filtering products
  const [imagePopup, setImagePopup] = useState(null); // State for the image popup
  const [category, setCategory] = useState("All"); // State for the category
  const navigate = useNavigate();

  // Inaktivitäts-Timer: Nach 3 Minuten zurück zur Startseite
  useEffect(() => {
    let inactivityTimer;
    
    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setCart([]);
        navigate("/");
      }, 180000); // 3 Minuten
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate, setCart]);

  // useEffect to filter products based on the category
  useEffect(() => {
    if (category === "All") {
      setFilteredProducts(Products); // Show all products
    } else {
      const filtered = Products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  }, [category]); // Triggered only when the category changes

  const handleRemoveClick = useCallback((product) => {
    setCurrentProduct(product); // Save the product
    setButtonPopup(true); // Open the popup
  }, []);

  const removeFromCart = useCallback(() => {
    if (!currentProduct) return;
    const index = cart.findIndex((item) => item.id === currentProduct.id);
    if (index === -1) return;

    if (cart[index].quantity > 1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity--;
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter((item) => item.id !== currentProduct.id);
      setCart(updatedCart);
    }
    setCurrentProduct(null); // Reset the product
    setButtonPopup(false); // Close the popup
  }, [cart, currentProduct, setCart]);

  const openImagePopup = useCallback((image) => {
    setImagePopup(image); // Set the image for preview
  }, []);

  const closeImagePopup = useCallback(() => {
    setImagePopup(null); // Close the popup
  }, []);

  return (
    <div className="relative flex flex-col lg:flex-row w-screen h-screen select-none overflow-hidden bg-white">
      
      {/* Category section */}
      <Category filterProducts={setCategory} setCart={setCart} />

      {/* Product section */}
      <div className="flex-1 overflow-y-auto px-2 lg:px-3">
        <OrderItems
          products={filteredProducts}
          addToCart={addToCart}
          openImagePopup={openImagePopup}
        />
      </div>

      {/* Shopping cart section */}
      <ShoppingCart
        cart={cart}
        handleRemoveClick={handleRemoveClick}
        setCart={setCart}
        removeFromCart={removeFromCart}
        buttonPopup={buttonPopup}
        setButtonPopup={setButtonPopup}
      />

      {/* Popup section */}
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <button
          onClick={() => setButtonPopup(false)}
          className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-semibold"
        >
          Abbrechen
        </button>
        <button
          onClick={removeFromCart}
          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl font-semibold"
        >
          Entfernen
        </button>
      </Popup>

      {/* Image popup for preview with animation and blur */}
      {imagePopup && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={closeImagePopup}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-4xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={closeImagePopup}
              className="absolute top-2 right-2 bg-white text-gray-700 p-2 rounded-full shadow-lg z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={imagePopup}
              alt="Popup Image"
              className="max-h-[80vh] max-w-full rounded-xl object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default OrderPage;