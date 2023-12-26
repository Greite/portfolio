'use client'

import { Box, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Box>
      <Stack
        w="full"
        h="100vh"
        direction={['column', 'row']}
        alignContent="center"
        alignItems="center"
        justifyContent="space-evenly"
        px={6}
        bg="rgb(250,224,86)"
      >
        <VStack spacing={12} alignItems={['center', 'flex-start']}>
          <Heading as="h1" size={['3xl', '4xl']} textAlign={['center', 'left']} textTransform="uppercase">
            <Text>404</Text>
            <Text>Page introuvable</Text>
          </Heading>

          <Heading as="h2" size="lg" textAlign={['center', 'left']}>
            <Link href="/">Retour à l&apos;acceuil</Link>
          </Heading>
        </VStack>
      </Stack>
    </Box>
  )
}
