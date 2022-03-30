const ITEM_URL = 'https://api.mercadolibre.com/items/';

const fetchItem = async (id) => {
  try {
    const response = await fetch(`${ITEM_URL}${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
