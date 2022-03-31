require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  it('se o fetch é chamado', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it('se é chamado com a URL correta', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  it('se o retorno é um objeto igual o esperado', async () => {
    const retorno = await fetchItem('MLB1615760527');
    expect(typeof retorno).toEqual(typeof item);
  })

  it('se chamando sem argumentos retorna um erro', async () => {
    const result = await fetchItem();
    expect(result).toEqual(new Error('You must provide an url'));
  })
});
