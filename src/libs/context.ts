import React, {createContext} from "react";
import {ActionTypes, StateTypes} from "./reducer";

export const GlobalContext = createContext<[StateTypes, React.Dispatch<ActionTypes>]>([
  { products: [] },
  () => {},
])