const menuMobile = document.querySelector('.menu-mobile');
const menu = document.querySelector('.menu');
const shoppingCartIcon = document.querySelector('.shopping-cart__submenu img');
const shoppingCartTable = document.querySelector('.shopping-cart__area');
menuMobile.addEventListener('click', toggleMenuMobile);
shoppingCartIcon.addEventListener('click', showCart);

function toggleMenuMobile() {
  menu.classList.toggle('showMenuMobile');
}
function showCart() {
  shoppingCartTable.classList.toggle('shopping-cart__area--visible');
}

/* Create cards*/
const productsList = [
  {
    image: '../src/assests/images/curso1.jpg',
    name: 'da',
    description: 'lana lalalalalsadkadkask kafojaijijdkdjsjdj',
    price: 20000,
  },
  {
    image: '../src/assests/images/curso2.jpg',
    name: 'la',
    description: 'lna',
    price: 60000,
  },
  {
    image: '../src/assests/images/curso3.jpg',
    name: 'ua',
    description: 'lra',
    price: 40000,
  },
  {
    image: '../src/assests/images/curso4.jpg',
    name: 'da',
    description: 'lana',
    price: 20000,
  },
  {
    image: '../src/assests/images/curso5.jpg',
    name: 'la',
    description: 'lna',
    price: 60000,
  },
  {
    image: '../src/assests/images/curso3.jpg',
    name: 'ua',
    description: 'lra',
    price: 40000,
  },
];
const createCard = (product) => {
  const cardTemplate = `
  <div>
    <img
      class="product-card__img"
      src="${product.image}"
      alt=""
    />
    <div class="product-card__info">
      <h3 class="info__title">${product.name}</h3>
      <p class="info__description">${product.description}</p>
      <p class="info__price">$ ${product.price}</p>
    </div>
    <div class="product-card__button">
      <a href="#" class="button-add-card">Agregar al carrito<img src="../src/assests/icons/plus-solid.svg" alt="" /></a>
      
    </div>
  </div>`;
  const cardTimeFrame = document.querySelector('.product-card__container');
  cardTimeFrame.insertAdjacentHTML('beforeend', cardTemplate);
};
function renderCards() {
  for (let i = 0; i < productsList.length; i++) {
    createCard(productsList[i]);
  }
}
renderCards();
