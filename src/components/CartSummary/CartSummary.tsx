import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, Box, Button, Text, Flex
} from '@chakra-ui/react'
import {FC, useContext, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../../libs/context";
import {CartItem} from "../CartItem";
import {formatterCurrency} from "../../libs/utils";
import {PromoCode} from "../PromoCode";

type CartSummaryProps = {
  isOpen: boolean,
  onClose: () => void
}

export const CartSummary: FC<CartSummaryProps> = (props) => {
  const {isOpen, onClose} = props
  const [state] = useContext(GlobalContext);
  const navigate = useNavigate();
  const [disCountPrice, setDisCountPrice] = useState(0);

  const products = useMemo(() => state.products.filter(product => product.cartQuantity > 0), [state]);
  const mountPrice = useMemo(() => {
    return products.reduce((total: number, product) => {
      return total += product.cartQuantity * product.price
    }, -disCountPrice);
  }, [products, disCountPrice])

  const handleClickRoute = () => {
    navigate("/cart")
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay/>
      <DrawerContent>
        <Box padding="0 32px" minH="96px" display="flex" flex="1" flexShrink="0"
             justifyContent="space-between" alignItems="center" backgroundColor="#f7f7f8" height="100%"
             maxH="64px">
          <DrawerHeader flex="1" fontWeight="500" lineHeight="20px" fontSize="18px">Cart summary</DrawerHeader>
          <DrawerCloseButton position="revert"/>
        </Box>
        <DrawerBody p="0">
          {products.map(product => <Box
            key={product.id} borderBottom="1px solid #e3e6e8"><Box p="32px"><CartItem {...product} /></Box></Box>)}
          {products.length > 0 && <Box borderBottom="1px solid #e3e6e8"><Box p="32px"><PromoCode
            setDiscountPrice={setDisCountPrice}/></Box></Box>}
        </DrawerBody>
        <DrawerFooter display="revert">
          <Flex w="100%" justifyContent="space-between" fontWeight="500" lineHeight="20px">
            <Text>Discount price</Text>
            <Text>- ${disCountPrice}</Text>
          </Flex>
          <Flex w="100%" marginTop="10px" justifyContent="space-between" fontWeight="500" lineHeight="20px">
            <Text>Total</Text>
            <Text>{formatterCurrency.format(mountPrice)}</Text>
          </Flex>
          <Box textAlign="center">
            <Button marginTop="16px" color="#fff" bgColor="#1a4db3" w="100%" h="54px" _hover={{
              borderColor: "transparent",
              backgroundColor: "#0d59f2",
              boxShadow: "0 10px 4px -8px rgb(0 0 0 / 50%)"
            }}>Checkout</Button>
            <Button variant='link' color="#2e3338" ml="8px" display="inline-block" fontSize="14px" fontWeight="600"
                    p="2px 0" textDecoration="none" borderRadius="revert" minW="revert" _hover={{
              color: "#0d59f2",
              textDecoration: "revert"
            }}
                    borderBottom="1px solid" onClick={handleClickRoute}>View detailed cart</Button>
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}