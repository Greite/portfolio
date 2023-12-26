import { Flex, Box } from '@chakra-ui/react'

export default function Divider() {
  return (
    <Flex w="full" mt="-4px" justifyContent="center">
      <Box w="full" maxW="1440px" borderBottom="8px solid" borderBottomColor="black" />
    </Flex>
  )
}
