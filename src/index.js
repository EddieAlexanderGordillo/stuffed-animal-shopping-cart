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
