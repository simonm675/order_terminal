import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCustomizationModal = ({ product, onClose, onAddToCart }) => {
  const [customization, setCustomization] = useState({
    removedIngredients: [],
    addedIngredients: [],
    extras: {},
    sauces: [],
    size: 'normal',
    cookLevel: 'medium',
    specialInstructions: '',
  });

  // Standard-Zutaten basierend auf Produkttyp
  const getStandardIngredients = (product) => {
    if (product.category === 'Burger') {
      return [
        { id: 'tomato', name: 'Tomaten', icon: '🍅' },
        { id: 'lettuce', name: 'Salat', icon: '🥬' },
        { id: 'onion', name: 'Zwiebeln', icon: '🧅' },
        { id: 'pickle', name: 'Gurken', icon: '🥒' },
        { id: 'cheese', name: 'Käse', icon: '🧀' },
        { id: 'ketchup', name: 'Ketchup', icon: '🍅' },
        { id: 'mayo', name: 'Mayonnaise', icon: '🥚' },
        { id: 'mustard', name: 'Senf', icon: '🌭' },
      ];
    } else if (product.category === 'Subs') {
      return [
        { id: 'tomato', name: 'Tomaten', icon: '🍅' },
        { id: 'lettuce', name: 'Salat', icon: '🥬' },
        { id: 'onion', name: 'Zwiebeln', icon: '🧅' },
        { id: 'pickle', name: 'Gurken', icon: '🥒' },
        { id: 'cheese', name: 'Käse', icon: '🧀' },
        { id: 'peppers', name: 'Paprika', icon: '🌶️' },
      ];
    } else if (product.category === 'Menüs') {
      return [
        { id: 'ketchup', name: 'Ketchup', icon: '🍅' },
        { id: 'mayo', name: 'Mayonnaise', icon: '🥚' },
        { id: 'mustard', name: 'Senf', icon: '🌭' },
      ];
    }
    return [];
  };

  // Verfügbare Extras
  const getAvailableExtras = (product) => {
    if (product.category === 'Burger') {
      return [
        { id: 'double_meat', name: 'Doppelt Fleisch', price: 2.50, icon: '🥩' },
        { id: 'triple_meat', name: 'Dreifach Fleisch', price: 4.50, icon: '🥩🥩' },
        { id: 'bacon', name: 'Bacon', price: 1.50, icon: '🥓' },
        { id: 'extra_cheese', name: 'Extra Käse', price: 1.00, icon: '🧀' },
        { id: 'fried_egg', name: 'Spiegelei', price: 1.20, icon: '🍳' },
        { id: 'jalapenos', name: 'Jalapeños', price: 0.80, icon: '🌶️' },
        { id: 'onion_rings', name: 'Onion Rings', price: 1.30, icon: '🧅' },
        { id: 'avocado', name: 'Avocado', price: 1.80, icon: '🥑' },
        { id: 'mushrooms', name: 'Champignons', price: 1.20, icon: '🍄' },
      ];
    } else if (product.category === 'Subs') {
      return [
        { id: 'double_meat', name: 'Doppelt Fleisch', price: 2.50, icon: '🥩' },
        { id: 'bacon', name: 'Bacon', price: 1.50, icon: '🥓' },
        { id: 'extra_cheese', name: 'Extra Käse', price: 1.00, icon: '🧀' },
        { id: 'avocado', name: 'Avocado', price: 1.80, icon: '🥑' },
      ];
    } else if (product.category === 'Menüs') {
      return [
        { id: 'large_fries', name: 'Große Pommes', price: 1.50, icon: '🍟' },
        { id: 'large_drink', name: 'Großes Getränk', price: 1.00, icon: '🥤' },
        { id: 'extra_dip', name: 'Extra Dip', price: 0.80, icon: '🥫' },
      ];
    } else if (product.category === 'Beilagen') {
      return [
        { id: 'large_portion', name: 'Große Portion', price: 1.50, icon: '🍟' },
        { id: 'extra_dip', name: 'Extra Dip', price: 0.80, icon: '🥫' },
      ];
    } else if (product.category === 'Getränke') {
      return [
        { id: 'large_size', name: 'Groß (0.5L)', price: 1.00, icon: '🥤' },
      ];
    } else if (product.category === 'Bowls') {
      return [
        { id: 'extra_protein', name: 'Extra Protein', price: 2.00, icon: '🍗' },
        { id: 'avocado', name: 'Avocado', price: 1.80, icon: '🥑' },
      ];
    }
    return [];
  };

  const standardIngredients = getStandardIngredients(product);
  const availableExtras = getAvailableExtras(product);

  // Prüfen ob es ein einfaches Produkt ist (Dips, keine Optionen)
  const isSimpleProduct = standardIngredients.length === 0 && availableExtras.length === 0 && product.category !== 'Burger';

  const toggleIngredient = (ingredientId) => {
    setCustomization(prev => ({
      ...prev,
      removedIngredients: prev.removedIngredients.includes(ingredientId)
        ? prev.removedIngredients.filter(id => id !== ingredientId)
        : [...prev.removedIngredients, ingredientId]
    }));
  };

  const toggleExtra = (extraId, price) => {
    setCustomization(prev => ({
      ...prev,
      extras: {
        ...prev.extras,
        [extraId]: prev.extras[extraId] ? 0 : 1
      }
    }));
  };

  const changeExtraQuantity = (extraId, change) => {
    setCustomization(prev => ({
      ...prev,
      extras: {
        ...prev.extras,
        [extraId]: Math.max(0, Math.min(3, (prev.extras[extraId] || 0) + change))
      }
    }));
  };

  const calculateTotalPrice = () => {
    let total = product.price;
    
    // Größenaufpreis
    if (customization.size === 'small') total -= 1.00;
    if (customization.size === 'large') total += 1.50;
    
    // Extras
    Object.entries(customization.extras).forEach(([extraId, quantity]) => {
      const extra = availableExtras.find(e => e.id === extraId);
      if (extra && quantity > 0) {
        total += extra.price * quantity;
      }
    });
    
    return total;
  };

  const handleAddToCart = () => {
    // Überprüfe ob das Produkt tatsächlich angepasst wurde
    const hasCustomization = 
      customization.removedIngredients.length > 0 ||
      customization.addedIngredients.length > 0 ||
      Object.values(customization.extras).some(qty => qty > 0) ||
      customization.sauces.length > 0 ||
      customization.size !== 'normal' ||
      customization.cookLevel !== 'medium' ||
      customization.specialInstructions.trim().length > 0;

    const customizedProduct = {
      ...product,
      ...(hasCustomization && { customization }),
      finalPrice: calculateTotalPrice(),
      id: `${product.id}_${Date.now()}`, // Unique ID für customized products
    };
    onAddToCart(customizedProduct);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`max-h-[calc(100dvh-2rem)] w-full overflow-y-auto rounded-3xl bg-white shadow-2xl ${isSimpleProduct ? 'max-w-md' : 'max-w-4xl'}`}
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {isSimpleProduct ? (
          // Einfaches Bestätigungs-Modal
          <div className="p-5 sm:p-6">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 rounded-xl overflow-hidden border-2 border-gray-200">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-3xl font-bold text-green-600">
                {product.price.toFixed(2)} €
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-semibold"
              >
                Abbrechen
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold"
              >
                In den Warenkorb
              </button>
            </div>
          </div>
        ) : (
          // Vollständiges Anpassungs-Modal
          <>
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 p-6 mb-4 border-b-2 border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name} anpassen
              </h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-gray-100 text-gray-700 p-3 ml-4 rounded-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-4 px-4 pb-4 sm:space-y-6 sm:px-6 sm:pb-6">
          {/* Größe auswählen */}
          {product.category === 'Burger' && (
            <div className="rounded-2xl bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📏</span> Größe wählen
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'small', name: 'Klein', icon: '🍔', discount: -1.00 },
                  { id: 'normal', name: 'Normal', icon: '🍔🍔', discount: 0 },
                  { id: 'large', name: 'Groß', icon: '🍔🍔🍔', extra: 1.50 },
                ].map(size => (
                  <motion.button
                    key={size.id}
                    onClick={() => setCustomization(prev => ({ ...prev, size: size.id }))}
                    className={`border-2 rounded-xl p-4 text-center transition-all ${
                      customization.size === size.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 bg-white'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-3xl mb-2">{size.icon}</div>
                    <div className="font-semibold text-gray-900">{size.name}</div>
                    {size.discount && (
                      <div className="text-xs text-green-600 font-semibold">{size.discount.toFixed(2)} €</div>
                    )}
                    {size.extra && (
                      <div className="text-xs text-blue-600 font-semibold">+{size.extra.toFixed(2)} €</div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Garstufe */}
          {product.category === 'Burger' && (
            <div className="rounded-2xl bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔥</span> Garstufe
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'rare', name: 'Rare', icon: '🥩' },
                  { id: 'medium', name: 'Medium', icon: '🍖' },
                  { id: 'well', name: 'Well Done', icon: '🥓' },
                ].map(level => (
                  <motion.button
                    key={level.id}
                    onClick={() => setCustomization(prev => ({ ...prev, cookLevel: level.id }))}
                    className={`border-2 rounded-xl p-4 text-center transition-all ${
                      customization.cookLevel === level.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 bg-white'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-3xl mb-2">{level.icon}</div>
                    <div className="font-semibold text-gray-900 text-sm">{level.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Zutaten entfernen */}
          {standardIngredients.length > 0 && (
            <div className="rounded-2xl bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔧</span> Zutaten anpassen
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {standardIngredients.map(ingredient => (
                  <motion.button
                    key={ingredient.id}
                    onClick={() => toggleIngredient(ingredient.id)}
                    className={`bg-white border-2 rounded-xl p-4 text-left ${
                      customization.removedIngredients.includes(ingredient.id)
                        ? 'border-red-300 bg-red-50 opacity-60'
                        : 'border-gray-200'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{ingredient.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold">{ingredient.name}</div>
                        <div className="text-xs text-gray-600">
                          {customization.removedIngredients.includes(ingredient.id)
                            ? '❌ Entfernt'
                            : '✅ Enthalten'}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Extras hinzufügen */}
          {availableExtras.length > 0 && (
            <div className="rounded-2xl bg-gray-50 p-4 sm:p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>➕</span> Extras hinzufügen
              </h3>
              <div className="space-y-3">
                {availableExtras.map(extra => (
                  <div
                    key={extra.id}
                    className="bg-white border-2 border-gray-200 rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-3xl">{extra.icon}</span>
                      <div>
                        <div className="font-semibold text-lg">{extra.name}</div>
                        <div className="text-sm text-gray-600">
                          +{extra.price.toFixed(2)} €
                        </div>
                      </div>
                    </div>
                    
                    {customization.extras[extra.id] > 0 ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => changeExtraQuantity(extra.id, -1)}
                          className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center"
                        >
                          <span className="text-xl font-bold">−</span>
                        </button>
                        <span className="text-2xl font-bold min-w-[2rem] text-center text-gray-900">
                          {customization.extras[extra.id]}
                        </span>
                        <button
                          onClick={() => changeExtraQuantity(extra.id, 1)}
                          className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center"
                        >
                          <span className="text-xl font-bold">+</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleExtra(extra.id, extra.price)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold"
                      >
                        Hinzufügen
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spezielle Anweisungen */}
          <div className="rounded-2xl bg-gray-50 p-4 sm:p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📝</span> Spezielle Anweisungen
            </h3>
            <textarea
              value={customization.specialInstructions}
              onChange={(e) => setCustomization(prev => ({
                ...prev,
                specialInstructions: e.target.value
              }))}
              placeholder="z.B. Burger durchgebraten, extra Sauce..."
              className="w-full h-24 resize-none border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none bg-white text-gray-900"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 mt-4 border-t-2 border-gray-100 bg-white p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-base font-semibold text-gray-700 sm:text-xl">Gesamtpreis:</span>
            <motion.span
              className="text-2xl font-bold text-green-600 sm:text-4xl"
              key={calculateTotalPrice()}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {calculateTotalPrice().toFixed(2)} €
            </motion.span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white w-full py-4 text-lg font-bold rounded-xl shadow-lg"
          >
            In den Warenkorb legen
          </button>
        </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProductCustomizationModal;
