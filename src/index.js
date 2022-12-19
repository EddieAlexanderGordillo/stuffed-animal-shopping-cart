const menuMobile = document.querySelector('.menu-mobile');
const navContainer = document.querySelector('.nav-container');
const menu = document.querySelector('.menu');
const shoppingCartIcon = document.querySelector('.shopping-cart__submenu img');
const shoppingCartTable = document.querySelector('.shopping-cart__area');
menuMobile.addEventListener('click', toggleMenuMobile);
shoppingCartIcon.addEventListener('click', showCart);

function toggleMenuMobile() {
  if (!menu.classList.contains('showMenuMobile')) {
    menu.classList.add('showMenuMobile');
    navContainer.classList.add('backdropMobile');
    shoppingCartTable.classList.remove('shopping-cart__area--visible');
  } else {
    menu.classList.remove('showMenuMobile');
    navContainer.classList.remove('backdropMobile');
  }
}
function showCart() {
  if (!shoppingCartTable.classList.contains('shopping-cart__area--visible')) {
    shoppingCartTable.classList.add('shopping-cart__area--visible');
    menu.classList.remove('showMenuMobile');
    navContainer.classList.remove('backdropMobile');
  } else {
    shoppingCartTable.classList.remove('shopping-cart__area--visible');
  }
}

/* Create cards*/
const productsList = [
  {
    image: '../src/assests/images/curso1.jpg',
    name: 'Peluche1',
    description: 'Lana tejida a dos agujas',
    price: 20000,
    id: 1,
  },
  {
    image: '../src/assests/images/curso2.jpg',
    name: 'Peluche2',
    description: 'Lana filter',
    price: 60000,
    id: 2,
  },
  {
    image: '../src/assests/images/curso3.jpg',
    name: 'Peluche3',
    description: 'Crochet',
    price: 40000,
    id: 3,
  },
  {
    image: '../src/assests/images/curso4.jpg',
    name: 'Peluche4',
    description: 'Lana',
    price: 20000,
    id: 4,
  },
  {
    image: '../src/assests/images/curso5.jpg',
    name: 'Peluche5',
    description: 'Lana filter',
    price: 60000,
    id: 5,
  },
  {
    image: '../src/assests/images/curso3.jpg',
    name: 'Peluche6',
    description: 'Lana tejida',
    price: 40000,
    id: 6,
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
      <p class="info__price"><span>$ ${product.price} </span>pesos</p>
    </div>
    <div class="product-card__button">
      <a href="#" class="button-add-card" data-id="${product.id}">Agregar al carrito<img src="../src/assests/icons/plus-solid.svg" alt="" /></a>
      
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

// Variables
const containerTableCart = document.querySelector('#container__table');
const containerProductList = document.querySelector('#product-list');
const productList = document.querySelector('#list-cart tbody');
const emptyCart = document.querySelector('#empty-cart');
let cartItems = [];

// Listeners
loadEventListeners();

function loadEventListeners() {
  // Dispara cuando se presiona "Agregar Carrito"
  containerProductList.addEventListener('click', addProduct);

  // Cuando se elimina un producto del carrito
  containerTableCart.addEventListener('click', deleteProduct);

  //Muestra los cursos de local storage
  document.addEventListener('DOMContentLoaded', () => {
    cartItems = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();
  });

  // Al Vaciar el carrito
  emptyCart.addEventListener('click', emptyProducts);
}

// Funciones
// Función que añade el producto al carrito
function addProduct(e) {
  e.preventDefault();
  // Delegation para agregar-carrito
  if (e.target.classList.contains('button-add-card')) {
    const product = e.target.parentElement.parentElement;
    // Enviamos el producto seleccionado para tomar sus datos
    readProductData(product);
  }
}

// Lee los datos del producto
function readProductData(item) {
  const productInfo = {
    imagen: item.querySelector('img').src,
    titulo: item.querySelector('h3').textContent,
    precio: item.querySelector('.info__price span').textContent,
    id: item.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  };

  if (cartItems.some((itemProduct) => itemProduct.id === productInfo.id)) {
    const products = cartItems.map((product) => {
      if (product.id === productInfo.id) {
        product.cantidad++;
        return product;
      } else {
        return product;
      }
    });
    cartItems = [...products];
  } else {
    cartItems = [...cartItems, productInfo];
  }

  carritoHTML();
}

// Elimina el curso del carrito en el DOM
function deleteProduct(e) {
  e.preventDefault();

  if (e.target.classList.contains('delete-product')) {
    const productId = e.target.parentElement.getAttribute('data-id');

    // Eliminar del arreglo del carrito
    cartItems = cartItems.filter((product) => product.id !== productId);

    carritoHTML();
  }
}

// Muestra el producto seleccionado en el Carrito
function carritoHTML() {
  emptyProducts();

  cartItems.forEach((item) => {
    const rowcart = document.createElement('tr');
    rowcart.innerHTML = `
               <td>  
                    <img src="${item.imagen}" width=70>
               </td>
               <td>${item.titulo}</td>
               <td>${item.precio}</td>
               <td>${item.cantidad} </td>
               <td>
                    <a href="#" class="delete-product" data-id="${item.id}"><img
                src="../src/assests/icons/circle-xmark-regular.svg"
                alt=""
                // class="delete-product"
            /></a>
               </td>
          `;
    productList.appendChild(rowcart);
  });
  //Agregar el carrito de compras al storage
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem('carrito', JSON.stringify(cartItems));
}
// Elimina los productos del carrito en el DOM
function emptyProducts() {
  while (productList.firstChild) {
    productList.removeChild(productList.firstChild);
  }
}
