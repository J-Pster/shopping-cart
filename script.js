// Definindo Binds
const query = document.querySelector.bind(document);

// Definindo Variáveis Globais
const itemsContainer = query('.items');
const cartItemsContainer = query('.cart__items');
const totalPricePlaceholder = query('.total-price');
const cartRemoveItemsButton = query('.empty-cart');

// ---- Funcionalidade de Salvar os produtos no Local Storage
const criarObjetoParaSalvar = (elementoOrigem) => {
  const objetoTarefas = {};
  for (let i = 0; i < elementoOrigem.length; i += 1) {
    const objetoInterno = {};
    objetoTarefas[`${i}`] = objetoInterno;
  }
  return objetoTarefas;
};

const salvarObjeto = () => {
  const items = cartItemsContainer.children;
  const objetoTarefas = criarObjetoParaSalvar(items);
  
  for (let i = 0; i < items.length; i += 1) {
    objetoTarefas[`${i}`].innerHTML = items[i].innerHTML;
    objetoTarefas[`${i}`].className = items[i].className;
    objetoTarefas[`${i}`].id = items[i].id;
  }

  objetoTarefas.totalPrice = totalPricePlaceholder.innerText;

  saveCartItems(objetoTarefas);
};

// ---- Função para atualiar o preço total

async function upadeTotalPrice(price, mode = 'sub') {
  const totalPrice = parseFloat(totalPricePlaceholder.innerText);
  if (mode === 'add') {
    totalPricePlaceholder.innerText = totalPrice + price;
  } else {
    totalPricePlaceholder.innerText = totalPrice - price;
  }
}

// ---- Funções Auxiliares para Criar Elementos

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// Mini função do clique dos itens do carrinho
async function cartItemClickListener(event) {
  event.target.parentNode.removeChild(event.target);
  const price = parseFloat(event.target.id);
  upadeTotalPrice(price, 'sub');
  salvarObjeto();
}

function createCartItemElement({ sku, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  li.id = price;
  upadeTotalPrice(price, 'add');
  return li;
}

// -- Funções para os produtos do carrinho

// Função para pegar o SKU do produto
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const addItemToCart = async (event) => {
  const sku = getSkuFromProductItem(event.target.parentNode);
  const { title, price } = await fetchItem(sku);
  const item = {
    sku,
    title,
    price,
  };
  console.log(`Price no Add Item: ${item.price}`);
  const itemElement = createCartItemElement(item);
  cartItemsContainer.appendChild(itemElement);
  salvarObjeto();
};

function createProductItemElement({ id, title, thumbnail, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  const pricePlaceholder = createCustomElement('span', 'item__price_placeholder', 'R$');
  pricePlaceholder.appendChild(createCustomElement('span', 'item__price', price));
  section.appendChild(pricePlaceholder);
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', addItemToCart);
  section.appendChild(button);

  return section;
}

function removeAllCartProducts() {
  cartItemsContainer.innerHTML = '';
  totalPricePlaceholder.innerText = '0.00';
  salvarObjeto();
}
cartRemoveItemsButton.addEventListener('click', removeAllCartProducts);

// ---- Funcionalidade de Loading para espera da API
function createLoadingElement(type) {
  if (type === 'add') {
    const loadElement = createCustomElement('div', 'loading', 'Carregando...');
    itemsContainer.appendChild(loadElement);
  } else {
    itemsContainer.removeChild(itemsContainer.firstElementChild);
  }
}

// ---- Funções de Renderização do Carrinho e dos Produtos

const renderProducts = async () => {
  createLoadingElement('add');
  const result = await fetchProducts('computador');
  createLoadingElement('remove');
  result.results.forEach((element) => {
    const product = createProductItemElement(element);
    itemsContainer.appendChild(product);
  });
};

const renderCartFromLocal = () => {
  let tarefasDoLocal = getSavedCartItems();
  if (tarefasDoLocal === null) tarefasDoLocal = '{"totalPrice":"0.00"}';
  tarefasDoLocal = JSON.parse(tarefasDoLocal);
  Object.entries(tarefasDoLocal).forEach((element) => {
    if (element[0] === 'totalPrice') return;
    const itemDaLista = document.createElement('li');
    itemDaLista.className = element[1].className;
    itemDaLista.innerHTML = element[1].innerHTML;
    itemDaLista.id = element[1].id;
    itemDaLista.addEventListener('click', cartItemClickListener);
    cartItemsContainer.appendChild(itemDaLista);
  });
  
  totalPricePlaceholder.innerText = tarefasDoLocal.totalPrice;
};

// ---- Window Onload ----

window.onload = () => {
  renderProducts();
  renderCartFromLocal();
 };

 // QOD - João Pster