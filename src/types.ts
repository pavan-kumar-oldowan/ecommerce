// src/types.ts

/** Enum representing the status of a product */
export enum ProductStatus {
  Available = "Available",
  OutOfStock = "OutOfStock",
}


/**
 * Defines the strict structure for an available product item.
 */
export interface Product {
    id: number;
    name: string;
    price: number;
    img: string;
    description: string;
    status ?:string;
}

/**
 * Defines the structure for an item currently in the shopping cart.
 * It extends the base Product interface and adds a Quantity property.
 */
export interface CartItem extends Product {
    Quantity: number;
}