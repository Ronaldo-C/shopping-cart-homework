import React, {useContext, useMemo, useState} from "react";
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../../libs/context";
import {CartItem} from "../../components/CartItem";
import {PromoCode} from "../../components/PromoCode";
import {formatterCurrency} from "../../libs/utils";
import {useTotalPrice} from "../../libs/hooks";

const Cart = () => {
  const [state] = useContext(GlobalContext);
  const navigate = useNavigate();
  const [disCountPrice, setDisCountPrice] = useState(0);

  const products = useMemo(() => state.products.filter(product => product.cartQuantity > 0), [state]);
  const totalPrice = useTotalPrice(products, disCountPrice);

  const handleClickRoute = () => {
    navigate("/")
  }

  return (
    <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" marginTop="24px"
         p="8px 32px 8px 24px">
      {products.map(product => <Box w="100%" maxW="1000px"
                                    key={product.id} borderBottom="1px solid #e3e6e8"><Box
        p="32px"><CartItem {...product} /></Box></Box>)}
      {products.length > 0 &&
        <Box w="100%" maxW="1000px" borderBottom="1px solid #e3e6e8"><Flex p="32px" justifyContent="space-between"
                                                                           alignItems="center">
          <Box w="40%">
            <PromoCode
              setDiscountPrice={setDisCountPrice}/>
          </Box>
          <Box w="30%">
            <Flex w="100%" justifyContent="space-between" fontWeight="500" lineHeight="20px">
              <Text>Discount price</Text>
              <Text>- ${disCountPrice}</Text>
            </Flex>
            <Flex w="100%" marginTop="10px" justifyContent="space-between" fontWeight="500" lineHeight="20px">
              <Text>Total</Text>
              <Text>{formatterCurrency.format(totalPrice)}</Text>
            </Flex>
          </Box>
        </Flex></Box>}
      <Button variant='link' mt="300px" color="#2e3338" ml="8px" display="inline-block" fontSize="14px" fontWeight="600"
              p="2px 0" textDecoration="none" borderRadius="revert" minW="revert" _hover={{
        color: "#0d59f2",
        textDecoration: "revert"
      }} borderBottom="1px solid" onClick={handleClickRoute}> Continue shopping </Button>
    </Box>
  )
}

export default Cart;