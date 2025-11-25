// main.ts
import { AvailableProducts, displayProducts } from './product.js';
import { addToCart, loadCartFromStorage, updateCartDisplay } from './ShoppingCart.js';
// Helper function (same as in product.ts/shoppingCart.ts)
function getElement(id) {
    return document.getElementById(id);
}
/**
 * Toggles the visibility of the cart element on smaller screens.
 */
function cartToggle() {
    const cartElement = document.querySelector(".container");
    if (cartElement) {
        cartElement.classList.toggle("open");
    }
}
/**
 * Filters and displays products based on the search input value.
 */
function searchProduct() {
    const searchInput = getElement("search");
    console.log(searchInput);
    console.log(searchInput === null || searchInput === void 0 ? void 0 : searchInput.value);
    if (!searchInput)
        return;
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    // const query: string = searchInput.value.toLowerCase();
    console.log(query);
    const filtered = AvailableProducts.filter(product => {
        return product.name.toLowerCase().includes(query);
    });
    displayProducts(filtered); // Calls the function imported from product.ts
}
/**
 * Attaches initial event listeners (search, cart button, add to cart buttons).
 */
function attachInitialEventListeners() {
    // 1. Search Input Listener
    const searchInput = getElement("search");
    if (searchInput) {
        console.log(searchInput);
        searchInput.addEventListener("input", searchProduct);
    }
    // 2. Cart Toggle Button Listener
    const cartToggleButton = getElement("cart-toggle");
    if (cartToggleButton) {
        cartToggleButton.addEventListener("click", cartToggle);
    }
    // 3. Add to Cart Listeners (using Event Delegation on the product container)
    const productDiv = getElement("Products");
    if (productDiv) {
        productDiv.addEventListener("click", (event) => {
            const target = event.target;
            // Check if the clicked element is an 'add' button
            if (target.classList.contains("add")) {
                const idString = target.getAttribute("data-id");
                const id = idString ? parseInt(idString, 10) : NaN;
                if (!isNaN(id)) {
                    addToCart(id); // Calls the function imported from shoppingCart.ts
                }
            }
        });
    }
}
// --- APP INITIALIZATION ---
// Load cart state and set up the app once the DOM is ready
window.addEventListener("DOMContentLoaded", () => {
    // 1. Load existing cart data
    loadCartFromStorage();
    // 2. Initial render of products and cart
    displayProducts();
    updateCartDisplay();
    // 3. Attach all interactive event listeners
    attachInitialEventListeners();
});
