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
        className="relative grid grid-cols-2 gap-2 py-3 sm:gap-3 sm:py-4 lg:grid-cols-2 lg:gap-5 lg:py-5 2xl:grid-cols-3"
        key={products.length}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="relative flex h-full flex-col rounded-xl border border-gray-200 bg-white p-2 shadow-md sm:rounded-2xl sm:p-3 lg:p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="mb-2 aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 sm:aspect-[4/3] sm:mb-3 lg:mb-4">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => handleImageClick(product.image)}
                aria-label={`Open image of ${product.name}`}
                whileTap={{ scale: 0.95 }}
              />
            </div>
            <h3 className="text-sm font-bold text-center text-gray-900 line-clamp-2 sm:text-base lg:text-xl">
              {product.name}
            </h3>
            <p className="mb-12 mt-1 line-clamp-2 text-center text-xs text-gray-600 sm:mb-14 sm:mt-2 sm:text-sm lg:text-base">
              {product.description}
            </p>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1 sm:bottom-3 sm:left-3 sm:right-3 sm:gap-2 lg:bottom-4 lg:left-5 lg:right-5">
              <p className="text-base font-bold text-green-600 sm:text-lg lg:text-2xl">
                {product.price.toFixed(2)} €
              </p>
              <motion.button
                className="flex min-h-10 items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-2.5 py-2 font-bold text-white shadow-lg sm:min-h-[46px] sm:rounded-xl sm:px-3 sm:py-3 lg:px-5 lg:py-4"
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