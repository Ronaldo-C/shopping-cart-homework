import {Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, Input} from "@chakra-ui/react"
import {FC, useEffect, useState} from "react";

const PromoTestCode = {
  "test1": 10,
  "test2": 20,
  "test3": 30,
} as const;

type PromoCodeProps = {
  setDiscountPrice: (discountPrice: number) => void
}

export const PromoCode: FC<PromoCodeProps> = (props) => {
  const {setDiscountPrice} = props;
  const [isInput, setIsInput] = useState(false);
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [promoCount, setPromoCount] = useState(0);

  const handleClick = () => {
    setIsInput(true);
  }
  const handleClickCancel = () => {
    setIsInput(false);
    setIsError(false);
    setPromoCount(0);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const handleClickApply = () => {
    const discountPrice = PromoTestCode[value as (keyof typeof PromoTestCode)];
    if (discountPrice) {
      setPromoCount(discountPrice);
      setIsError(false);
    } else {
      setPromoCount(0);
      setIsError(true);
    }
  }

  useEffect(() => {
    setDiscountPrice(promoCount);
  }, [promoCount, setDiscountPrice])

  return (
    <Box w="100%" mb="0">
      {isInput ?
        <Flex justifyContent="space-between" alignItems="center">
          <FormControl bgColor="#fff" boxShadow="0 20px 24px -20px rgb(0 0 0 / 10%)" display="flex" alignItems="center"
                       position="relative" w="100%" boxSizing="border-box" _hover={{
            color: "#2e3338",
            borderColor: "#0aa7f5",
            backgroundColor: "#fff",
          }} isInvalid={isError}>
            <Box lineHeight="normal" h="52px" border="1px solid #e3e6e8" color="#2e3338" bgColor="#fff"
                 position="relative" w="100%" display="flex" justifyContent="center" alignItems="center">
              <Input flex="1" outline="none" maxW="100%" w="100%" h="100%" pl="16px" pr="16px" fontWeight="500"
                     lineHeight="20px" border="unset" _focusVisible={{
                outline: "unset"
              }} placeholder='Promo Code' value={value} onChange={handleChange}/>
              <Button position="absolute" right="16px" variant='link' color="#2e3338" ml="8px" display="inline-block"
                      fontSize="14px" fontWeight="600"
                      p="2px 0" textDecoration="none" borderRadius="revert" minW="revert" _hover={{
                color: "#0d59f2",
                textDecoration: "revert"
              }}
                      borderBottom="1px solid" onClick={handleClickApply}>Apply</Button>
            </Box>
            {isError ?
              <FormErrorMessage position="absolute" bottom="-18px">This promo code isn't valid</FormErrorMessage> :
              promoCount ? <FormHelperText position="absolute" color="green" bottom="-18px">Success</FormHelperText> : null}
          </FormControl>
          <Button variant='link' color="#2e3338" ml="8px" display="inline-block" fontSize="14px" fontWeight="600"
                  p="2px 0" textDecoration="none" borderRadius="revert" minW="revert" _hover={{
            color: "#0d59f2",
            textDecoration: "revert"
          }}
                  borderBottom="1px solid" onClick={handleClickCancel}>Cancel</Button>
        </Flex> :
        <Button boxSizing="border-box" padding="24px 0" textAlign="center" w="100%" border="1px solid #2e3338"
                bgColor="#fff" fontWeight="500" lineHeight="20px" _hover={{
          borderColor: "#0aa7f5"
        }} onClick={handleClick}>Promo Code?</Button>}
    </Box>
  )
}