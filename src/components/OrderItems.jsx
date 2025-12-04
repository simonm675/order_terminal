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
      className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-3 lg:gap-4 w-full mt-3 mb-3 pb-20 lg:pb-3 scrollbar-thin rounded-lg overflow-auto"
      key={products.length}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-white shadow-lg hover:shadow-2xl rounded-xl flex flex-col p-3 lg:p-4 relative h-auto transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-48 lg:h-64 w-full object-contain mx-auto rounded-lg drop-shadow-xl cursor-pointer transition-transform"
            onClick={() => handleImageClick(product.image)}
            aria-label={`Open image of ${product.name}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
          <h3 className="text-base lg:text-lg font-bold text-center mt-3 text-gray-800 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs lg:text-sm text-center text-gray-500 mt-1 mb-12 line-clamp-2">{product.description}</p>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <p className="font-bold text-lg lg:text-xl text-green-600">
              {product.price.toFixed(2)} €
            </p>
            <motion.button
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg p-2 lg:p-3 shadow-lg transition-all duration-300"
              onClick={() => handleAddToCart(product)}
              aria-label={`Add ${product.name} to cart`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="lg:w-6 lg:h-6"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                ></path>
              </svg>
            </motion.button>
          </div>
        </motion.div>
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