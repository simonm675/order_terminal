import React, { useState, useEffect, useCallback } from "react";
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
    <div className="bg-gray-100 flex flex-col lg:flex-row w-screen h-screen select-none">
      {/* Category section */}
      <Category filterProducts={setCategory} setCart={setCart} />

      {/* Product section */}
      <OrderItems
        products={filteredProducts}
        addToCart={addToCart}
        openImagePopup={openImagePopup}
      />

      {/* Shopping cart section */}
      <ShoppingCart
        cart={cart}
        handleRemoveClick={handleRemoveClick}
        removeFromCart={removeFromCart}
        buttonPopup={buttonPopup}
        setButtonPopup={setButtonPopup}
      />

      {/* Popup section */}
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <button
          onClick={removeFromCart}
          className="bottom-btn2 font-bold py-4 rounded-xl mt-4"
        >
          Produkt entfernen
        </button>
        <button
          onClick={() => setButtonPopup(false)} // Close the popup
          className="btn-popup font-bold py-4 my-4 rounded-xl ml-8"
        >
          abbrechen
        </button>
      </Popup>

      {/* Image popup for preview with animation and blur */}
      {imagePopup && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center z-50"
          onClick={closeImagePopup} // Close the popup when clicking outside the image
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="relative bg-white rounded-xl max-w-3xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing the popup when clicking inside the image
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
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