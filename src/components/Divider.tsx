import { Flex, Box } from '@chakra-ui/react'

export default function Divider() {
  return (
    <Flex w="full" justifyContent="center">
      <Box w="full" maxW="1440px" borderBottom="7px solid" borderBottomColor="black" />
    </Flex>
  )
}
