import {useMemo} from "react";
import {ProductsTypes} from "../mockData/products";

export const useTotalPrice = (products: ProductsTypes[], disCountPrice: number) => useMemo(() => {
  return products.reduce((total: number, product) => {
    return total += product.cartQuantity * product.price
  }, -disCountPrice);
}, [products, disCountPrice])
