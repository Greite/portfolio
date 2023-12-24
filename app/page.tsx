import { Avatar, Box, Heading, Stack, Text, VStack } from '@chakra-ui/react'

import Container from '@/src/components/Container'

export default function Home() {
  return (
    <Box>
      <Stack
        w="full"
        minH="80vh"
        direction={['column', 'row']}
        alignContent="center"
        alignItems="center"
        justifyContent="space-evenly"
        px={6}
        bg="rgb(250,224,86)"
      >
        <VStack spacing={12}>
          <Heading
            as="h1"
            size={['3xl', '4xl']}
            textAlign={['center', 'left']}
            textTransform="uppercase"
            letterSpacing="7px"
          >
            <Text>Gauthier</Text>
            <Text>Painteaux</Text>
          </Heading>

          <Heading as="h2" size="lg" textAlign="center">
            <Text>Développeur Web</Text>
            <Text>Fullstack</Text>
          </Heading>
        </VStack>

        <Box textAlign="center">
          <Avatar
            boxSize={['200px', '300px']}
            size={['260px', '360px']}
            name="Gauthier Painteaux"
            src="photo.jpg"
            border="10px solid"
            color="black"
            bg="white"
            fontSize="60px"
            fontWeight="bold"
          />
        </Box>
      </Stack>

      <Container withDivider>
        <Heading as="h3" size="lg" textAlign="left">
          Expériences
        </Heading>
      </Container>

      <Container withDivider>
        <Heading as="h3" size="lg" textAlign="left">
          Formations
        </Heading>
      </Container>
    </Box>
  )
}
