import React, {useContext} from "react";
import {Box, useDisclosure} from "@chakra-ui/react";
import {Product} from "../../components/Product";
import {CartSummary} from "../../components/CartSummary";
import {GlobalContext} from "../../libs/context";

const Home = () => {
  const [state] = useContext(GlobalContext);
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" marginTop="24px"
         p="8px 32px 8px 24px">
      {state.products.map(product => <Product key={product.id} {...product} onOpen={onOpen}/>)}
      <CartSummary isOpen={isOpen} onClose={onClose}/>
    </Box>
  )
}

export default Home;