import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LandingPage from "./LandingPage";
import OrderPage from "./OrderPage";

const App = () => {
  const location = useLocation();  // Standort von React Router

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}  // Schlüssel wird auf die URL gesetzt, um die Transition bei jeder Navigation zu aktivieren
        timeout={500}        // Dauer der Transition in Millisekunden
        classNames="page"    // CSS-Klasse für die Transition
      >
        <div className="page-wrapper">
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/order/*" element={<OrderPage />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
