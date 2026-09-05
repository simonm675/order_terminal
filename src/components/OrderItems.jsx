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
        className="relative grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-2 lg:gap-5 lg:py-5 2xl:grid-cols-3"
        key={products.length}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-md sm:p-4 lg:p-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 lg:mb-4">
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
            <p className="mb-14 mt-2 line-clamp-3 text-center text-sm text-gray-600 lg:text-base">
              {product.description}
            </p>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 sm:bottom-4 sm:left-4 sm:right-4">
              <p className="text-xl font-bold text-green-600 lg:text-2xl">
                {product.price.toFixed(2)} €
              </p>
              <motion.button
                className="flex min-h-[46px] items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 font-bold text-white shadow-lg lg:px-5 lg:py-4"
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