const saveCartItems = (objeto) => localStorage.setItem('cartItems', JSON.stringify(objeto));

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
