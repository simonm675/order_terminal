import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const OrderItems = ({ products, addToCart, openImagePopup }) => {
  const handleAddToCart = useCallback((product) => {
    addToCart(product);
  }, [addToCart]);

  const handleImageClick = useCallback((image) => {
    openImagePopup(image);
  }, [openImagePopup]);

  return (
    <motion.div
      className="relative grid md:grid-cols-2 sm:grid-cols-1 w-full mt-3 mb-3 scrollbar-thin rounded-lg overflow-auto"
      key={products.length}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg flex flex-col p-3 relative h-96 mr-3 mb-3"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-56 object-contain mx-auto rounded-lg drop-shadow-lg cursor-pointer"
            onClick={() => handleImageClick(product.image)} // Opens the image in a popup
            aria-label={`Open image of ${product.name}`}
          />
          <h3 className="text-lg font-semibold text-center mt-2">
            {product.name}
          </h3>
          <p className="text-center text-gray-600">{product.description}</p>
          <p className="font-semibold text-xl absolute bottom-4 right-20">
            {product.price.toFixed(2)} €
          </p>
          <button
            className="cssbuttons-io-button absolute bottom-3 right-3"
            onClick={() => addToCart(product)} // Hinzufügen zum Warenkorb
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
              ></path>
            </svg>
          </button>
        </div>
      ))}
    </motion.div>
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