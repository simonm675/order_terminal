import React, { useState } from "react";
import "./App.css";
import Products from "./components/Products";
import Popup from "./components/Popup";
import Category from "./components/Category";
import { motion } from "framer-motion";

function OrderPage() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null); // Produkt für das Popup
  const [filteredProducts, setFilteredProducts] = useState(Products); // Für die Filterung von Produkten

  const addToCart = (product) => {
    const index = cart.findIndex((item) => item.id === product.id);
    if (index === -1) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      const updatedCart = [...cart];
      updatedCart[index].quantity++;
      setCart(updatedCart);
    }
  };

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
      <div className="bg-white shadow-md rounded-lg px-4 py-4 mb-3 mt-3 ml-3 lg:w-1/4 lg:mr-3 overflow-hidden">
        <Category filterProducts={filterProducts} />
      </div>

      {/* Produkt-Sektion mit Animation */}
      <motion.div
        className="relative grid grid-cols-2 w-full mt-3 mb-3 scrollbar-thin rounded-lg"
        key={filteredProducts.length} // key sorgt dafür, dass beim Filtern die Animation erneut ausgelöst wird
        initial={{ y: 100, opacity: 0 }} // Anfangszustand (unterhalb des Sichtbereichs und unsichtbar)
        animate={{ y: 0, opacity: 1 }} // Endzustand (Produkte erscheinen)
        transition={{ duration: 0.6, ease: "easeOut" }} // Übergangsdauer und Ease-Animation
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
              onClick={() => addToCart(product)}
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
      <div className="bg-white shadow-md rounded-lg p-4 mb-3 lg:w-1/4 lg:ml-3 w-full mt-3 mr-3 overflow-hidden">
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
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
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
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between text-lg">
              <p className="font-semibold">Summe:</p>
              <p className="text-green-400 font-semibold">
                {cart
                  .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                  .toFixed(2)}{" "}
                €
              </p>
            </div>
            <button className="cssbuttons-io-button-kasse mt-4">
              <span>Zur Kasse gehen</span>
            </button>
          </>
        )}
      </div>

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
          className="btn-popup font-bold py-4  rounded-xl ml-8"
        >
          Abbrechen
        </button>
      </Popup>
    </div>
  );
}

export default OrderPage;
