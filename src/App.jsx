import React, { useState } from "react";
import "./App.css";
import products from "./components/Products";
import Popup from "./components/Popup";
import Category from "./components/Category";

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Check if product is already in cart
    const index = cart.findIndex((item) => item.id === product.id);
    if (index === -1) {
      // If not, add to cart with quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      // If yes, increase quantity by 1
      const updatedCart = [...cart];
      updatedCart[index].quantity++;
      setCart(updatedCart);
    }
  };

  const removeFromCart = (product) => {
    // Check if product is in cart
    const index = cart.findIndex((item) => item.id === product.id);
    if (index === -1) return;
    // If quantity is greater than 1, decrease quantity by 1
    if (cart[index].quantity > 1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity--;
      setCart(updatedCart);
    } else {
      // If quantity is 1, remove from cart
      const updatedCart = cart.filter((item) => item.id !== product.id);
      setCart(updatedCart);
    }
  };
 
  return (
      <div className="bg-gray-100 mx-auto flex flex-col lg:flex-row  w-screen h-screen">
        <div className=" bg-white shadow-md rounded-lg px-4 py-4 mb-3 mt-3 ml-3 lg:w-1/4 lg:mr-3 overflow-hidden relative">
          <Category />
        </div>
        <div className="relative grid grid-cols-2 w-screen mt-3 mb-3 scrollbar-thin rounded-lg ">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg flex flex-col p-3 relative h-96 mr-3 mb-3 "
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-40 drop-shadow-xl object-contain"
              />
              <h3 className="text-lg font-semibold my-2">{product.name}</h3>

              <p className="mb-4">{product.description}</p>

              <p className="font-semibold text-xl absolute mb-1 bottom-14 right-3">
                {product.price.toFixed(2)} €
              </p>

              <button
                class="cssbuttons-io-button absolute bottom-3 right-3"
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
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 mb-3 lg:w-1/4 lg:ml-3 w-screen mt-3 mr-3 overflow-hidden relative">
          <h2 className="text-3xl font-semibold mb-4">Warenkorb</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">
              Der Warenkorb ist leer.
              <img
                className="img-shopping-card drop-shadow-2xl"
                src="./img/shopping_cart.png"
                alt=""
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
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
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
                    onClick={() => setButtonPopup(true)}
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

                  <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <button
                      onClick={() =>
                        removeFromCart(item) && props.setTrigger(false)
                      }
                      className="bg-red-600 ml-6 text-white font-bold py-2 px-4 rounded-xl mt-4 place-content-end"
                    >
                      Produkt entfernen
                    </button>
                  </Popup>
                </div>
              ))}
              <hr className="my-4 absolute inset-x-0 bottom-12 mb-16 mx-3  font-semibold" />
              <div className="flex justify-between absolute inset-x-0 bottom-16 mx-3 mb-2 text-lg ">
                <p className="  font-semibold">Summe:</p>
                <p className="text-green-400 font-semibold">
                  {cart
                    .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                    .toFixed(2)}{" "}
                  €
                </p>
              </div>
              <button class="absolute inset-x-0 bottom-0 cssbuttons-io-button-kasse mx-2 my-3 ">
                <span>Zur Kasse gehen</span>
              </button>
            </>
          )}
        </div>
      </div>
    
  );
}

export default App;
