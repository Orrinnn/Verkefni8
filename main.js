import { createCartLine, showCartContent } from './lib/ui.js';

/**
 * @typedef {Object} Product
 * @property {number} id Auðkenni vöru, jákvæð heiltala stærri en 0.
 * @property {string} title Titill vöru, ekki tómur strengur.
 * @property {string} description Lýsing á vöru, ekki tómur strengur.
 * @property {number} price Verð á vöru, jákvæð heiltala stærri en 0.
 */

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

const cart = new Map(); // Map to store cart items with quantities

function addProductToCart(product, quantity) {
  if (cart.has(product.id)) {
    // Product is already in the cart, update quantity
    cart.set(product.id, cart.get(product.id) + quantity);
  } else {
    // Product is not in the cart, add it with the quantity
    cart.set(product.id, quantity);
  }

  // Sýna efni körfu
  showCartContent(true);

  // TODO: Update cart view
  updateCartView();
}

function updateCartView() {
  const cartTableBodyElement = document.querySelector('.cart table tbody');
  
  if (!cartTableBodyElement) {
    console.warn('fann ekki .cart');
    return;
  }

  // Clear the current cart view
  cartTableBodyElement.innerHTML = '';

  // Iterate through the cart items and create cart lines
  cart.forEach((quantity, productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const cartLine = createCartLine(product, quantity);
      cartTableBodyElement.appendChild(cartLine);
    }
  });
}

function submitHandler(event) {
  // Prevent form submission
  event.preventDefault();

  // Find the parent <tr> element
  const parent = event.target.closest('tr');

  // Find the product ID from the dataset
  const productId = Number.parseInt(parent.dataset.productId);

  // Find the associated product
  const product = products.find((i) => i.id === productId);

  // Find the quantity by selecting the input element
  const inputElement = parent.querySelector('input[type="number"]');
  const quantity = parseInt(inputElement.value, 10);

  if (!product || isNaN(quantity) || quantity < 1) {
    // Handle errors or invalid input
    return;
  }

  // Add the product to the cart with the selected quantity
  addProductToCart(product, quantity);
}

// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll('.add');

// Iterate through the forms
for (const form of Array.from(addToCartForms)) {
  // Add a submit event listener to each form
  form.addEventListener('submit', submitHandler);
}

// TODO: Add event handler for the checkout form
