import {
  Box,
  Flex,
  IconButton,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text
} from '@chakra-ui/react'
import {DeleteIcon} from "@chakra-ui/icons";
import {FC, useContext, useMemo} from "react";
import {ProductsTypes} from "../../mockData/products";
import {formatterCurrency} from "../../libs/utils";
import {GlobalContext} from "../../libs/context";
import {ReducerTypes} from "../../libs/reducer";

export const CartItem: FC<ProductsTypes> = (props) => {
  const {id, name, image, price, cartQuantity} = props
  const [, dispatch] = useContext(GlobalContext);

  const handleChange = (valueString: string, valueAsNumber: number) => {
    const draftCartQuantity = valueAsNumber > 0 ? valueAsNumber : 0;
    dispatch({
      type: ReducerTypes.SET_CARTQUANTITY,
      payload: {id, cartQuantity: draftCartQuantity}
    })
  }
  const handleClickIcon = () => {
    dispatch({
      type: ReducerTypes.SET_CARTQUANTITY,
      payload: {id, cartQuantity: 0}
    })
  }

  const mountPrice = useMemo(() => {
    return cartQuantity * price
  }, [cartQuantity, price])

  return (
    <Box p="32px">
      <Flex alignItems="center" justifyContent="space-between">
        <Image minW="auto" h="32px" w="auto" src={image}/>
        <Text fontSize="18px" flex="1" textAlign="left" paddingLeft="8px" fontWeight="600">{name}</Text>
        <IconButton
          aria-label='Remove item'
          icon={<DeleteIcon/>}
          color="#9e2215"
          borderColor="transparent"
          bgColor="#fceae8"
          w="20px"
          h="20px"
          boxSizing="content-box"
          borderRadius="100%"
          padding="8px"
          minW="revert"
          onClick={handleClickIcon}
        />
      </Flex>
      <Box p="16px 0">
        <Text fontSize="12px" color="#2e3338" mb="8px">Quantity</Text>
        <Flex justifyContent="space-between" alignItems="center">
          <NumberInput value={cartQuantity} min={0} onChange={handleChange}>
            <NumberInputField readOnly={true} />
            <NumberInputStepper>
              <NumberIncrementStepper/>
              <NumberDecrementStepper/>
            </NumberInputStepper>
          </NumberInput>
          <Text fontWeight="500" lineHeight="20px">{formatterCurrency.format(mountPrice)}</Text>
        </Flex>
      </Box>
    </Box>
  )
}