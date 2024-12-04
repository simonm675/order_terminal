import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LandingPage from "./components/LandingPage";
import OrderPage from "./components/OrderPage";
import OrderSummary from "./components/OrderSummary";

const App = () => {
  const location = useLocation();

  // Warenkorb im App-Komponenten-Status speichern
  const [cart, setCart] = useState([]);

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

  // useEffect, um den Rechtsklick zu deaktivieren
  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} timeout={500} classNames="page">
        <div className="page-wrapper">
          <Routes location={location}>
            {/* Übergibt addToCart an LandingPage und den Warenkorb an OrderPage */}
            <Route path="/" element={<LandingPage addToCart={addToCart} />} />
            <Route
              path="/order"
              element={
                <OrderPage
                  addToCart={addToCart}
                  cart={cart}
                  setCart={setCart}
                />
              }
            />
            <Route
              path="/order"
              element={
                <OrderPage
                  addToCart={addToCart}
                  cart={cart}
                  setCart={setCart}
                />
              }
            />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
