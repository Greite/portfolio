'use client'

import { ChakraProvider } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

import theme from '@/lib/theme/theme'

export default function Provider({ children }: PropsWithChildren) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
