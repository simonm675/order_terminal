import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import ProductCustomizationModal from "./ProductCustomizationModal";

const OrderItems = ({ products, addToCart, openImagePopup }) => {
  const [customizationModal, setCustomizationModal] = useState(null);

  const handleAddToCart = useCallback((product) => {
    // Alle Produkte öffnen das Modal
    setCustomizationModal(product);
  }, []);

  const handleImageClick = useCallback((image) => {
    openImagePopup(image);
  }, [openImagePopup]);

  return (
    <>
      <motion.div
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6 w-full mt-4 mb-4 pb-20 lg:pb-4"
        key={products.length}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-4 lg:p-5 relative h-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-full h-52 lg:h-64 rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-gray-50 to-gray-100">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => handleImageClick(product.image)}
                aria-label={`Open image of ${product.name}`}
                whileTap={{ scale: 0.95 }}
              />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-center text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm lg:text-base text-center text-gray-600 mt-2 mb-16 line-clamp-2">
              {product.description}
            </p>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <p className="text-2xl lg:text-3xl font-bold text-green-600">
                {product.price.toFixed(2)} €
              </p>
              <motion.button
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 lg:px-5 lg:py-4 rounded-xl shadow-lg flex items-center gap-2 font-bold"
                onClick={() => handleAddToCart(product)}
                aria-label={`Add ${product.name} to cart`}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-semibold hidden lg:inline">Hinzufügen</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="lg:w-6 lg:h-6"
                  fill="currentColor"
                >
                  <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Customization Modal */}
      {customizationModal && (
        <ProductCustomizationModal
          product={customizationModal}
          onClose={() => setCustomizationModal(null)}
          onAddToCart={(customizedProduct) => {
            addToCart(customizedProduct);
            setCustomizationModal(null);
          }}
        />
      )}
    </>
  );
};

OrderItems.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
  openImagePopup: PropTypes.func.isRequired,
};

export default OrderItems;