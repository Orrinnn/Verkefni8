import { formatPrice } from './helpers.js';

function deleteLineFromCart(event) {
  event.preventDefault();
  const lineToDelete = event.submitter.closest('tr');

  if (lineToDelete) {
    lineToDelete.remove(); // Remove the line from the DOM
  }
}

/**
 * Búa til línu í cart töflu.
 * @param {import('../main.js').Product} product
 * @param {number} quantity
 * @returns HTMLElement
 */
export function createCartLine(product, quantity) {
  const cartLineElement = document.createElement('tr');
  cartLineElement.dataset.productId = product.id.toString();

  const titleElement = document.createElement('td');
  titleElement.textContent = product.title;
  cartLineElement.appendChild(titleElement);

  const quantityElement = document.createElement('td');
  quantityElement.textContent = quantity.toString();
  cartLineElement.appendChild(quantityElement);

  const priceElement = document.createElement('td');
  priceElement.textContent = formatPrice(product.price);
  cartLineElement.appendChild(priceElement);

  const totalElement = document.createElement('td');
  totalElement.textContent = formatPrice(product.price * quantity);
  cartLineElement.appendChild(totalElement);

  const formTdElement = document.createElement('td');
  
  const formElement = document.createElement('form');
  formElement.addEventListener('submit', deleteLineFromCart);

  const buttonElement = document.createElement('button');
  buttonElement.textContent = 'Eyða';

  formElement.appendChild(buttonElement);
  formTdElement.appendChild(formElement);
  cartLineElement.appendChild(formTdElement);

  return cartLineElement;
}

/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = true) {
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart');
    return;
  }

  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');

  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element');
    return;
  }

  if (show) {
    emptyMessage.classList.add('hidden');
    cartContent.classList.remove('hidden');
  } else {
    emptyMessage.classList.remove('hidden');
    cartContent.classList.add('hidden');
  }
}
