require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('se é chamado com a URL correta', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })

  it('se o retorno é um objeto igual o esperado', async () => {
    const retorno = await fetchProducts('computador');
    expect(typeof retorno).toEqual(typeof computadorSearch);
  })

  it('se chamando sem argumentos retorna um erro', async () => {
    const result = await fetchProducts();
    expect(result).toEqual(new Error('You must provide an url'));
  })
});
