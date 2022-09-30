import product1 from "../images/product1.png";
import product2 from "../images/product2.png";


export type ProductsTypes = {
    id: number,
    name: string,
    description: string,
    image: string,
    quantity: number,
    cartQuantity: number,
    price: number
}

export const productsData: ProductsTypes[] = [
    {
        id: 1,
        name: "Starry Night",
        description: "High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh.",
        image: product1,
        quantity: 1,
        cartQuantity: 0,
        price: 79.95
    },
    {
        id: 2,
        name: "Irises",
        description: "Irises is yet again, another painting by the Dutch artist Vincent van Gogh.",
        image: product2,
        quantity: 1,
        cartQuantity: 0,
        price: 65.95
    }
]