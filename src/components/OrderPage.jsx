import React, { useState, useEffect } from "react";
import Products from "./products/Products";
import Popup from "./popups/PopupShoppingCart";
import Category from "./Category";
import ShoppingCart from "./ShoppingCart";
import { motion } from "framer-motion";

function OrderPage({ addToCart, cart, setCart }) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Produkt für das Popup
  const [filteredProducts, setFilteredProducts] = useState(Products); // Für die Filterung von Produkten
  const [imagePopup, setImagePopup] = useState(null); // Zustand für das Bild-Popup
  const [category, setCategory] = useState("All"); // Zustand für die Kategorie

  // useEffect, um Produkte basierend auf der Kategorie zu filtern
  useEffect(() => {
    if (category === "All") {
      setFilteredProducts(Products); // Zeige alle Produkte
    } else {
      const filtered = Products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  }, [category]); // Wird nur ausgelöst, wenn sich die Kategorie ändert

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

  const openImagePopup = (image) => {
    setImagePopup(image); // Bild für die Vorschau setzen
  };

  const closeImagePopup = () => {
    setImagePopup(null); // Popup schließen
  };

  return (
    <div className="bg-gray-100 flex flex-col lg:flex-row w-screen h-screen select-none">
      {/* Kategorie-Sektion */}
      <Category filterProducts={setCategory} setCart={setCart} />

      {/* Produkt-Sektion mit Animation */}
      <motion.div
        className="relative grid md:grid-cols-2 sm:grid-cols-1 w-full mt-3 mb-3 scrollbar-thin rounded-lg overflow-auto"
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
              className=" h-56 object-contain mx-auto rounded-lg drop-shadow-lg cursor-pointer"
              onClick={() => openImagePopup(product.image)} // Bild anklickbar machen
            />
            <h3 className="text-lg font-semibold text-center mt-2">
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

      {/* Bild-Popup für Vorschau mit Animation und Unschärfe */}
      {imagePopup && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center z-50"
          onClick={closeImagePopup} // Popup schließen, wenn außerhalb des Bildes geklickt wird
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="relative bg-white rounded-xl max-w-3xl"
            onClick={(e) => e.stopPropagation()} // Verhindern, dass das Klicken im Bild das Popup schließt
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
