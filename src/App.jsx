import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./components/App.css";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./components/LandingPage";
import OrderPage from "./components/OrderPage";
import OrderSummary from "./components/OrderSummary";
import PaymentMethods from "./components/PaymentMethods";
import OrderConfirmation from "./components/OrderConfirmation";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const location = useLocation();

  // Warenkorb im App-Komponenten-Status speichern
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const itemPrice = Number(product.finalPrice ?? product.price);
      const productId = String(product.id);
      const index = currentCart.findIndex((item) => item.id === product.id);

      if (index === -1) {
        return [
          ...currentCart,
          {
            ...product,
            id: productId,
            quantity: 1,
            price: itemPrice,
            finalPrice: itemPrice,
          },
        ];
      }

      return currentCart.map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
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
            path="/order/summary"
            element={<OrderSummary cart={cart} />} // Übergibt den Warenkorb an OrderSummary
          />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmation setCart={setCart} />}
          />
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
  );
};

export default App;