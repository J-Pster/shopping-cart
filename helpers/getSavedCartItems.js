const getSavedCartItems = () => {
  const savedCartItems = localStorage.getItem('cartItems');
  return savedCartItems;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
