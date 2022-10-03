import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text
} from "@chakra-ui/react";
import {FC, useContext, useMemo} from "react";
import {ProductsTypes} from "../../mockData/products";
import {GlobalContext} from "../../libs/context";
import {ReducerTypes} from "../../libs/reducer";
import {formatterCurrency} from "../../libs/utils";

type ProductProps = {
  onOpen: () => void
} & ProductsTypes

export const Product: FC<ProductProps> = (props) => {
  const {id, name, description, image, price, quantity, onOpen} = props
  const [, dispatch] = useContext(GlobalContext);

  const handleChange = (valueString: string, valueAsNumber: number) => {
    dispatch({
      type: ReducerTypes.SET_QUANTITY,
      payload: {id, quantity: valueAsNumber}
    })
  }
  const handleClick = () => {
    dispatch({
      type: ReducerTypes.SET_CARTQUANTITY_FOR_QUANTITY,
      payload: {id}
    })
    onOpen();
  }

  const mountPrice = useMemo(() => {
    const parseQuantity = isNaN(quantity) ? 0 : quantity;
    return parseQuantity * price
  }, [quantity, price])

  return (
    <Flex transform="translateZ(0)" flexWrap="wrap" w="100%" mb="64px" maxW="1000px">
      <Box width="50%">
        <Heading as="h2" fontSize="40px" m="revert">{name}</Heading>
        <Text fontSize="20px" m="revert">{description}</Text>
        <Box display="grid" gridTemplateColumns="75px 175px" gridGap="16px" borderRadius="4px">
          <Box>
            <Text m="revert" fontSize="12px" fontWeight="700" color="#6b6b6b">QUANTITY</Text>
            <NumberInput value={isNaN(quantity) ? "" : quantity} min={1}
                         onChange={handleChange}>
              <NumberInputField/>
              <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box>
            <Text m="revert" fontSize="12px" fontWeight="700" color="#6b6b6b">FORMAT</Text>
            <Select>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
            </Select>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" fontWeight="700" fontSize="20px"
               whiteSpace="nowrap">{formatterCurrency.format(mountPrice)}
          </Box>
          <Button cursor="pointer" color="#fff" bgColor="#133986" border="1px solid #113478" borderRadius="3px"
                  fontWeight="700" textTransform="uppercase" textAlign="center" fontSize="12px" letterSpacing="2px"
                  p="16px 24px" display="flex" alignItems="center" whiteSpace="nowrap" _hover={{
            transition: "all .2s",
            transform: "translateY(-2px)",
            boxShadow: "0 2px 10px rgb(17 52 120 / 50%)",
            backgroundColor: "#1a4db3",
          }} onClick={handleClick}>Add to cart</Button>
        </Box>
      </Box>
      <Image width="50%" maxW="500px" maxH="400px" objectFit="cover" borderRadius="8px"
             transform="perspective(650px) rotate(5deg) rotateX(-2.5deg) rotateY(-15deg) scale(.8) translateX(30px)"
             boxShadow="30px 30px 50px rgba(0,0,0,.1)"
             flex="50%" src={image}/>
    </Flex>
  )
}