import { Flex, Box } from '@chakra-ui/react'

export default function Divider() {
  return (
    <Flex position="absolute" top="-4px" w="full" justifyContent="center">
      <Box w="full" maxW="1440px" borderBottom="8px solid" borderBottomColor="brand.950" />
    </Flex>
  )
}
