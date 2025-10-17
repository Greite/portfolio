import { Box, Flex } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'
import Divider from './Divider'

interface ContainerProps {
  withDivider?: boolean
}

export default function Container({ withDivider, children }: PropsWithChildren<ContainerProps>) {
  return (
    <Box position="relative">
      {withDivider && <Divider />}

      <Flex w="full" justifyContent="center" py={16} px={6} bgColor="brand.50">
        <Box w="full" maxW="1280px">
          {children}
        </Box>
      </Flex>
    </Box>
  )
}
