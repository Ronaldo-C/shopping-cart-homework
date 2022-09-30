import {productsData, ProductsTypes} from "../mockData/products";
import produce from "immer"

export enum ReducerTypes {
  SET_QUANTITY = "SET_QUANTITY",
  SET_CARTQUANTITY = "SET_CARTQUANTITY",
  DELETE = "DELETE"
}

export type StateTypes = {
  products: ProductsTypes[]
}

export type ActionTypes = {
  type: ReducerTypes,
  payload: any
}

export const initialState: StateTypes = {
  products: productsData
}

export const reducers = (state: StateTypes = initialState, action: ActionTypes): StateTypes => {
  return produce(state, (draft) => {
    const {type, payload} = action;
    const {id, quantity} = payload;
    switch (type) {
      case ReducerTypes.SET_QUANTITY: {
        const product = draft.products.find(product => product.id === id);
        if (product) product.quantity = quantity
        break;
      }
      case ReducerTypes.SET_CARTQUANTITY: {
        const product = draft.products.find(product => product.id === id);
        if (product) {
          const parseQuantity = isNaN(product.quantity) ? 1 : product.quantity;
          product.cartQuantity += parseQuantity;
        }
        break;
      }
      default:
        break;
    }
  })
}