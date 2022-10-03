import React, {useReducer} from "react"
import {
  Box,
  ChakraProvider,
  theme, useDisclosure
} from "@chakra-ui/react"
import {GlobalContext} from "./libs/context";
import {initialState, reducers} from "./libs/reducer";
import {Product} from "./components/Product";
import {CartSummary} from "./components/CartSummary";


export const App = () => {
  const [state, dispatch] = useReducer(reducers, initialState);
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <ChakraProvider theme={theme}>
      <GlobalContext.Provider value={[state, dispatch]}>
        <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" marginTop="24px"
             p="8px 32px 8px 24px">
          {state.products.map(product => <Product key={product.id} {...product} onOpen={onOpen}/>)}
          <CartSummary isOpen={isOpen} onClose={onClose}/>
        </Box>
      </GlobalContext.Provider>
    </ChakraProvider>
  )
}