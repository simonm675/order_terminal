import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentMethods = () => {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate();

  const paymentMethods = [
    {
      id: 1,
      name: "Karte",
      icon: "💳",
      description: "Bezahlen Sie sicher mit Ihrer Bankkarte oder Kreditkarte.",
    },
    {
      id: 2,
      name: "Barzahlung",
      icon: "💵",
      description: "Bezahlen Sie bequem mit Bargeld bei der Abholung.",
    },
  ];

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      alert("Bitte wählen Sie eine Zahlungsmethode aus.");
      return;
    }
    navigate("/order-confirmation", { state: { paymentMethod: selectedPaymentMethod } });
  };

  const formattedTotal = !isNaN(totalAmount) ? totalAmount.toFixed(2) : "0.00";

  return (
    <motion.div
      className="relative flex flex-col min-h-screen bg-white justify-between rounded-lg max-w-3xl mx-auto p-6 shadow-xl m-2"
      
    >
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
        Zahlungsmethoden
      </h2>

      {/* Zahlungsmethoden-Auswahl */}
      <div className="flex-grow mb-6 space-y-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition duration-300 ${
              selectedPaymentMethod === method.id
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
            onClick={() => setSelectedPaymentMethod(method.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{method.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{method.name}</h3>
                <p className="text-sm">{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gesamtsumme und Buttons */}
      <div className="flex flex-col mt-auto space-y-4">
        <hr />
        <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
          <p>Gesamtsumme:</p>
          <p className="text-green-500">{formattedTotal} €</p>
        </div>

        <div className="flex justify-between space-x-4 pb-12">
          {/* Zurück-Button */}
          <button
            className="btn-popup rounded-lg shadow-md w-1/2 font-semibold transition duration-300 py-4"
            onClick={() => navigate("/order/summary")}
          >
            Zurück zur Bestellübersicht
          </button>

          {/* Zahlung abschließen-Button */}
          <button
            className="cssbuttons-io-button-kasse rounded-lg shadow-md w-1/2 font-semibold transition duration-300 py-4"
            onClick={handlePayment}
          >
            Zahlung abschließen
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentMethods;
