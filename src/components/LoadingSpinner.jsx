import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = "Lädt..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        className="relative w-24 h-24 lg:w-32 lg:h-32"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border-8 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-8 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
      </motion.div>
      <motion.p
        className="mt-6 text-xl lg:text-2xl font-bold text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
