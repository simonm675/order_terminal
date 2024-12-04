import React, { useState } from "react";
import "./App.css";
import Products from "./Products";
import Popup from "./popups/PopupShoppingCart";
import Category from "./Category";
import ShoppingCart from "./ShoppingCart";
import { motion } from "framer-motion";

function OrderPage({ addToCart, cart, setCart }) {
  
  const [buttonPopup, setButtonPopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Produkt für das Popup
  const [filteredProducts, setFilteredProducts] = useState(Products); // Für die Filterung von Produkten

  const handleRemoveClick = (product) => {
    setCurrentProduct(product); // Produkt speichern
    setButtonPopup(true); // Popup öffnen
  };

  const removeFromCart = () => {
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
    setCurrentProduct(null); // Produkt zurücksetzen
    setButtonPopup(false); // Popup schließen
  };

  const filterProducts = (category) => {
    if (category === "All") {
      setFilteredProducts(Products); // Zeige alle Produkte
    } else {
      const filtered = Products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col lg:flex-row w-screen h-screen select-none">
      {/* Kategorie-Sektion */}
      <Category filterProducts={filterProducts} setCart={setCart} />

      {/* Produkt-Sektion mit Animation */}
      <motion.div
        className="relative grid grid-cols-2 w-full mt-3 mb-3 scrollbar-thin rounded-lg"
        key={filteredProducts.length}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg flex flex-col p-3 relative h-96 mr-3 mb-3"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-contain mx-auto"
            />
            <h3 className="text-lg font-semibold my-4 text-center">
              {product.name}
            </h3>
            <p className="text-center text-gray-600">{product.description}</p>
            <p className="font-semibold text-xl absolute bottom-4 right-20">
              {product.price.toFixed(2)} €
            </p>
            <button
              className="cssbuttons-io-button absolute bottom-3 right-3"
              onClick={() => addToCart(product)} // addToCart ist nun als Prop verfügbar
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </motion.div>

      {/* Warenkorb-Sektion */}
      <ShoppingCart
        cart={cart}
        handleRemoveClick={handleRemoveClick}
        removeFromCart={removeFromCart}
        buttonPopup={buttonPopup}
        setButtonPopup={setButtonPopup}
      />

      {/* Popup-Sektion */}
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <button
          onClick={removeFromCart}
          className="bottom-btn2 font-bold py-4 rounded-xl mt-4"
        >
          Produkt entfernen
        </button>
        <button
          onClick={() => setButtonPopup(false)} // Popup schließen
          className="btn-popup font-bold py-4 my-4 rounded-xl ml-8"
        >
          Abbrechen
        </button>
      </Popup>
    </div>
  );
}

export default OrderPage;
