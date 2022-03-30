const API_BASE_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';

const fetchProducts = async (termo) => {
  try {
    const response = await fetch(`${API_BASE_URL}${termo}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
