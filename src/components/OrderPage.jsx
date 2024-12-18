import React, { useState, useEffect } from "react";
import Products from "./products/Products";
import Popup from "./popups/PopupShoppingCart";
import Category from "./Category";
import ShoppingCart from "./ShoppingCart";
import OrderItems from "./OrderItems"; // Importiere die neue Komponente
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

      {/* Produkt-Sektion */}
      <OrderItems
        products={filteredProducts}
        addToCart={addToCart}
        openImagePopup={openImagePopup}
      />

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
