import React, {useReducer} from "react"
import {
  Box,
  ChakraProvider,
  theme
} from "@chakra-ui/react"
import {GlobalContext} from "./libs/context";
import {initialState, reducers} from "./libs/reducer";
import {Product} from "./components/Product";

export const App = () => {
  const [state, dispatch] = useReducer(reducers, initialState);
  return (
    <ChakraProvider theme={theme}>
      <GlobalContext.Provider value={[state, dispatch]}>
        <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" marginTop="24px"
             p="8px 32px 8px 24px">
          {state.products.map(product => <Product key={product.id} {...product} />)}
        </Box>
      </GlobalContext.Provider>
    </ChakraProvider>
  )
}