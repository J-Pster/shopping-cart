const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

const objetoExemplo = {
  0: {
    className: "cart__item",
    innerHTML: "SKU: MLB2168492707 | NAME: Notebook Multilaser Legacy Book Pc310 Preta 14.1 , Intel Celeron N3000  4gb De Ram 64gb Ssd, Intel Hd Graphics 1366x768px Windows 10 Home | PRICE: $1339"
  }
}

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('se setItem é chamado', () => {
    saveCartItems(objetoExemplo);
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  it('se setItem é chamado com os parametros desejados', () => {
    saveCartItems(objetoExemplo);
    expect(localStorage.setItem).toHaveBeenLastCalledWith('cartItems', JSON.stringify(objetoExemplo));
  })
});
