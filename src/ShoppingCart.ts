// shoppingCart.ts

import { AvailableProducts } from './product.js';
import { CartItem, Product } from './types.js';

// State variable for the cart
export let cart: CartItem[] = [];

/**
 * Helper function to safely get a DOM element by ID.
 * NOTE: Duplicated here for modularity, but could be put in a utility file.
 */
function getElement(id: string): HTMLElement | null {
    return document.getElementById(id);
}

/**
 * Displays a temporary 'Product Added' toast notification.
 */
export function showToast(): void {
    const toast = getElement("toast");
    if (toast) {
        toast.classList.add("open");
        setTimeout(() => {
            toast.classList.remove("open");
        }, 2000);
    }
}

/**
 * Updates the cart DOM display, calculates the total, and saves the cart to localStorage.
 */
export function updateCartDisplay(): void {
    const cartDiv = getElement("cart");
    const totalDisplay = getElement("total");

    if (!cartDiv || !totalDisplay) return;

    // 💡 IMPROVEMENT: Cache the new HTML content first
    let newCartContent = "";
    let Total = 0;

    if (cart.length === 0) {
        newCartContent = `<p class='empty'>Your Cart Is Empty</p>`;
        Total = 0;
        localStorage.removeItem("cart");
    } else {
        // Build the content string without touching the DOM yet
        cart.forEach((item: CartItem, index: number) => {
            Total += item.price * item.Quantity;

            newCartContent += `
                <div class="cart-p" id="cart-p">
                    <img class="img2" src="${item.img}" alt="${item.name} Image">
                    <p class="p3">${item.name} - $${item.price}</p>
                    <input type="number" class="num" min="1" value="${item.Quantity}" data-index="${index}">
                    <button class="remove" data-index="${index}">Remove</button>
                </div>
            `;
           
        });
    }

    // 2. Perform the DOM updates in a single, fast operation
    cartDiv.innerHTML = newCartContent;
    totalDisplay.textContent = `Total:$${Total.toFixed(2)}`;
    
    // 3. Save to storage
    if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // 4. Re-attach listeners *after* the DOM update
    attachCartEventListeners();
  }



/**
 * Adds a product to the cart or increments its quantity if it already exists.
 */
export function addToCart(id: number): void {
    const selectedProduct: Product | undefined = AvailableProducts.find((product: Product) => product.id === id);

    if (!selectedProduct) return;

    const existingItem: CartItem | undefined = cart.find((item: CartItem) => item.id === id);

    if (existingItem) {
        existingItem.Quantity++;
    } else {
        cart.push({ ...selectedProduct, Quantity: 1 });
    }

    showToast();
    updateCartDisplay();
}

/**
 * Removes a product from the cart based on its index.
 */

export function removeProduct(index: number): void {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCartDisplay();
    }
}
  


/**
 * Updates the quantity of a cart item.
 */
export function quantityUpdate(index: number, quantity: string): void {
    const newQuantity: number = Math.max(1, parseInt(quantity, 10));

    if (index >= 0 && index < cart.length) {
        cart[index].Quantity = newQuantity;
        updateCartDisplay();
    }
}

/**
 * Attaches change/click listeners to the dynamically created cart item buttons/inputs.
 */
function attachCartEventListeners(): void {
  const cartDiv= getElement("cart");
  if(!cartDiv) return;
    
        // 1. Quantity Change Listeners
     cartDiv.querySelectorAll<HTMLInputElement>(".num").forEach(input => {
        const index = parseInt(input.getAttribute("data-index") || "-1", 10);
        if (index !== -1) {
            input.addEventListener("change", (event) => {
                const target = event.target as HTMLInputElement;
                quantityUpdate(index, target.value);
            });
        }
    });
      // 2.Remove Product Listeners
       cartDiv.querySelectorAll<HTMLButtonElement>(".remove").forEach(button => {
        console.log(button);
        const index = parseInt(button.getAttribute("data-index") || "-1", 10);
        if (index !== -1) {
          
            button.addEventListener("click", () => {
                console.log(index);
                removeProduct(index);
            });
        }
    });

    
      
    }


/**
 * Loads cart from localStorage on initialization.
 */
export function loadCartFromStorage(): void {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
        try {
            const parsedCart: unknown = JSON.parse(storedCart);
            if (Array.isArray(parsedCart) && parsedCart.every(item => 'id' in item && 'Quantity' in item)) {
                 cart = parsedCart as CartItem[];
            }
        } catch (error) {
            console.error("Failed to parse cart from localStorage:", error);
            localStorage.removeItem("cart");
        }
    }
}
