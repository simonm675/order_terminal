import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentMethods = () => {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert("Bitte wählen Sie eine Zahlungsmethode aus.");
      return;
    }
    
    // Simuliere Zahlungsverarbeitung
    setIsProcessing(true);
    
    // Warte 2 Sekunden für realistisches Gefühl
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    navigate("/order-confirmation", { state: { paymentMethod: selectedPaymentMethod } });
  };

  const formattedTotal = !isNaN(totalAmount) ? totalAmount.toFixed(2) : "0.00";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-2 lg:p-4">
      <motion.div
        className="relative flex flex-col bg-white shadow-2xl rounded-2xl justify-between w-full max-w-4xl p-4 lg:p-6 border-2 border-gray-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ maxHeight: '95vh' }}
      >
      <h2 className="text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 lg:mb-6">
        💳 Zahlungsmethoden
      </h2>

      {/* Zahlungsmethoden-Auswahl */}
      <div className="flex-grow my-4 lg:my-6 space-y-4 lg:space-y-6 w-full">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            className={`bg-gray-50 border-2 rounded-2xl px-4 lg:px-6 py-12 lg:py-20 cursor-pointer transition-all duration-300 ${
              selectedPaymentMethod === method.id
                ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-2xl"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedPaymentMethod(method.id)}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4 lg:space-x-6">
              <div className="text-5xl lg:text-7xl">{method.icon}</div>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-4xl font-bold mb-1 lg:mb-2 text-gray-900">{method.name}</h3>
                <p className="text-sm lg:text-base text-gray-600">{method.description}</p>
              </div>
              {selectedPaymentMethod === method.id && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
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
      <div className="flex flex-col mt-auto space-y-4 pt-4 w-full">
        <hr className="border-gray-300" />
        <div className="flex justify-between items-center text-lg lg:text-xl font-bold text-gray-800">
          <p>Gesamtsumme:</p>
          <p className="text-green-600 text-2xl lg:text-3xl">{formattedTotal} €</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pb-4 lg:pb-6">
          {/* Zurück-Button */}
          <motion.button
            className="flex-1 bg-gray-200 text-gray-800 rounded-xl shadow-lg font-bold py-3 lg:py-4 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => navigate("/order/summary")}
            whileTap={{ scale: 0.98 }}
            disabled={isProcessing}
          >
            ← Zurück zur Bestellübersicht
          </motion.button>

          {/* Zahlung abschließen-Button */}
          <motion.button
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg font-bold py-3 lg:py-4 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePayment}
            whileTap={{ scale: 0.98 }}
            disabled={isProcessing || !selectedPaymentMethod}
          >
            {isProcessing ? (
              <motion.span 
                className="flex items-center justify-center gap-2"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⏳
                </motion.span>
                Zahlung wird verarbeitet...
              </motion.span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                ✅ Zahlung abschließen
              </span>
            )}
          </motion.button>
        </div>
      </div>
      </motion.div>
    </div>
  );
};

export default PaymentMethods;
