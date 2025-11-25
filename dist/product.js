// product.ts
// The list of available products (static data)
export const AvailableProducts = [
    { id: 1, name: "Samsung", price: 16000, img: "./src/images/tv3.jpg", description: "5-star Rating" },
    { id: 2, name: "FRIDGE", price: 20000, img: "./src/images/Fridge.jpg", description: "5-star Rating" },
    { id: 3, name: "AirConditional", price: 28000, img: "./src/images/ac.jpg", description: "5-star Ratingg" },
    { id: 4, name: "Fans", price: 6000, img: "./src/images/fan.jpg", description: "5-star Rating" },
    { id: 5, name: "laptop", price: 45000, img: "./src/images/laptop.jpg", description: "5-star Rating" },
    { id: 6, name: "phone", price: 60000, img: "./src/images/phone.jpg", description: "5-star Rating" },
    { id: 7, name: "watch", price: 600, img: "./src/images/watch.jpg", description: "5-star Rating" },
    { id: 8, name: "airpods", price: 1600, img: "./src/images/airpods.jpg", description: "5-star Rating" }
];
/**
 * Helper function to safely get a DOM element by ID.
 * @param id The ID of the element.
 * @returns The HTML element or null if not found.
 */
function getElement(id) {
    return document.getElementById(id);
}
// NOTE: We export this function so it can be called by searchProduct() in main.ts
export function displayProducts(products = AvailableProducts) {
    const productdiv = getElement("Products");
    if (!productdiv)
        return;
    productdiv.innerHTML = "";
    products.forEach((product) => {
        const productcontainer = document.createElement("div");
        productcontainer.classList.add("product");
        productcontainer.innerHTML = `
            <img class="img1" src="${product.img}" alt="Image for ${product.name}">
            <p class="p1">${product.name}</p>
            <p class="p2">$${product.price}</p>
            <button class="add" data-id="${product.id}">Add to cart</button>
        `;
        productdiv.appendChild(productcontainer);
    });
}
