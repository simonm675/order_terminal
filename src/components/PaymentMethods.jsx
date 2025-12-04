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
      className="relative flex flex-col min-h-screen bg-white justify-between rounded-xl max-w-4xl mx-auto p-4 lg:p-6 shadow-2xl m-2 lg:m-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4 lg:mb-6">
        💳 Zahlungsmethoden
      </h2>

      {/* Zahlungsmethoden-Auswahl */}
      <div className="flex-grow my-4 lg:my-6 space-y-4 lg:space-y-6">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            className={`px-4 lg:px-6 py-12 lg:py-20 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
              selectedPaymentMethod === method.id
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-2xl"
                : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 border-gray-300 hover:border-blue-400 hover:shadow-lg"
            }`}
            onClick={() => setSelectedPaymentMethod(method.id)}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4 lg:space-x-6">
              <div className="text-5xl lg:text-7xl">{method.icon}</div>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-4xl font-bold mb-1 lg:mb-2">{method.name}</h3>
                <p className="text-sm lg:text-base opacity-90">{method.description}</p>
              </div>
              {selectedPaymentMethod === method.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-3xl lg:text-4xl"
                >
                  ✅
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gesamtsumme und Buttons */}
      <div className="flex flex-col mt-auto space-y-4 pt-4">
        <hr className="border-gray-300" />
        <div className="flex justify-between items-center text-lg lg:text-xl font-bold text-gray-800">
          <p>Gesamtsumme:</p>
          <p className="text-green-600 text-2xl lg:text-3xl">{formattedTotal} €</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pb-4 lg:pb-6">
          {/* Zurück-Button */}
          <motion.button
            className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 rounded-xl shadow-lg font-bold transition duration-300 py-3 lg:py-4 text-sm lg:text-base"
            onClick={() => navigate("/order/summary")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Zurück zur Bestellübersicht
          </motion.button>

          {/* Zahlung abschließen-Button */}
          <motion.button
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl shadow-lg font-bold transition duration-300 py-3 lg:py-4 text-sm lg:text-base"
            onClick={handlePayment}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(22, 163, 74, 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            ✅ Zahlung abschließen
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentMethods;
