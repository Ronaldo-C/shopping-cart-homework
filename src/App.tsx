import React, {useReducer} from "react"
import {
  ChakraProvider,
  theme
} from "@chakra-ui/react"
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {GlobalContext} from "./libs/context";
import {initialState, reducers} from "./libs/reducer";
import Home from "./pages/home"
import Cart from "./pages/cart"

export const App = () => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <ChakraProvider theme={theme}>
      <GlobalContext.Provider value={[state, dispatch]}>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
          </Routes>
        </Router>
      </GlobalContext.Provider>
    </ChakraProvider>
  )
}