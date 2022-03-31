const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('se getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  it('se getItem é chamado com os parametros desejados', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenLastCalledWith('cartItems');
  })
});
