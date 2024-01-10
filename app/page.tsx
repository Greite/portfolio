import { Avatar, Box, Flex, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdMail } from 'react-icons/md'

import Container from '@/lib/components/Container'

import 'dayjs/locale/fr'

dayjs.extend(relativeTime)
dayjs.locale('fr')

export default function Home() {
  return (
    <Box>
      <Flex w="full" minH="65vh" py={[12, 24]} px={6} justifyContent="center" bg="rgb(250,224,86)">
        <Stack
          w="full"
          maxW="1280px"
          spacing={[10, null, null, 0]}
          direction={['column-reverse', null, null, 'row']}
          alignContent="center"
          alignItems="center"
          justifyContent="space-between"
        >
          <VStack spacing={12} alignItems="flex-start">
            <Heading as="h1" size={['3xl', '4xl']} textAlign="left" textTransform="uppercase" letterSpacing="8px">
              <Text>Gauthier</Text>
              <Text>Painteaux</Text>
            </Heading>

            <Heading as="h2" size="lg" textAlign="left">
              <Text>Développeur Web</Text>
              <Text>Fullstack</Text>
            </Heading>

            <VStack spacing={4} alignItems="flex-start">
              <Link href="https://www.linkedin.com/in/gauthier-painteaux-1018a2167/" target="_blank">
                <HStack spacing={2} alignItems="center">
                  <FaLinkedin size="25px" />
                  <Text>LinkedIn</Text>
                </HStack>
              </Link>

              <Link href="https://github.com/Greite" target="_blank">
                <HStack spacing={2} alignItems="center">
                  <FaGithub size="25px" />
                  <Text>Github</Text>
                </HStack>
              </Link>

              <Link href="mailto:contact@gauthierpainteaux.fr">
                <HStack spacing={2} alignItems="center">
                  <MdMail size="25px" />
                  <Text>contact@gauthierpainteaux.fr</Text>
                </HStack>
              </Link>
            </VStack>
          </VStack>

          <Box textAlign="center">
            <Avatar
              boxSize={['300px', '400px']}
              size={['360px', '460px']}
              name="Gauthier Painteaux"
              src="photo.webp"
              border="10px solid"
              color="black"
              bg="white"
              fontSize="60px"
              fontWeight="bold"
            />
          </Box>
        </Stack>
      </Flex>

      <Container withDivider>
        <Heading as="h3" size="lg" textAlign="left">
          Expériences
        </Heading>

        <Stack spacing={6} pt={8}>
          <Box>
            <Stack direction={['column', null, 'row']} spacing={[1, 4]} alignItems="flex-start">
              <Heading as="h4" size="md" textAlign="left">
                <Link href="https://koul.io/" target="_blank">
                  Koul
                </Link>
              </Heading>
              <Text textAlign="left" fontWeight={500}>
                Juin 2023 - Aujourd&apos;hui ({dayjs().diff('2023-06-01', 'month')} mois)
              </Text>
            </Stack>
            <Text textAlign="left">Développeur Web Fullstack - CDI</Text>
            <Text textAlign="left" fontStyle="italic" fontWeight={300}>
              Next.JS, Symfony, TypeScript, Docker, Kubernetes
            </Text>
          </Box>

          <Box>
            <Stack direction={['column', null, 'row']} spacing={[1, 4]} alignItems="flex-start">
              <Heading as="h4" size="md" textAlign="left">
                <Link href="https://globalis-ms.com/" target="_blank">
                  Globalis media system
                </Link>
              </Heading>
              <Text textAlign="left" fontWeight={500}>
                Novembre 2018 - Mai 2023 (4 ans et 5 mois)
              </Text>
            </Stack>
            <Text textAlign="left">Développeur Web Fullstack - CDI</Text>
            <Text textAlign="left" fontStyle="italic" fontWeight={300}>
              Wordpress, React, Typescript, Slim, Symfony
            </Text>
          </Box>

          <Box>
            <Stack direction={['column', null, 'row']} spacing={[1, 4]} alignItems="flex-start">
              <Heading as="h4" size="md" textAlign="left">
                <Link href="https://appartoo.com/" target="_blank">
                  Appartoo
                </Link>
              </Heading>
              <Text textAlign="left" fontWeight={500}>
                Avril 2018 - Août 2018 (5 mois)
              </Text>
            </Stack>
            <Text textAlign="left">Développeur Web Fullstack - Stage</Text>
            <Text textAlign="left" fontStyle="italic" fontWeight={300}>
              AngularJS, Symfony
            </Text>
          </Box>

          <Box>
            <Stack direction={['column', null, 'row']} spacing={[1, 4]} alignItems="flex-start">
              <Heading as="h4" size="md" textAlign="left">
                DTI Soft
              </Heading>
              <Text textAlign="left" fontWeight={500}>
                Mai 2016 - Juin 2016 (2 mois)
              </Text>
            </Stack>
            <Text textAlign="left">Développeur - Stage</Text>
            <Text textAlign="left" fontStyle="italic" fontWeight={300}>
              Talend
            </Text>
          </Box>
        </Stack>
      </Container>

      <Container withDivider>
        <Heading as="h3" size="lg" textAlign="left">
          Formations
        </Heading>

        <Stack spacing={6} pt={8}>
          <Box>
            <Stack direction={['column', null, 'row']} spacing={[1, 4]} alignItems="flex-start">
              <Heading as="h4" size="md" textAlign="left">
                IUT Nancy Charlemagne
              </Heading>
              <Text textAlign="left" fontWeight={500}>
                2017 - 2018
              </Text>
            </Stack>
            <Text textAlign="left">
              L.P. Concepteur intégrateur en système internet et intranet pour l&apos;entreprise
            </Text>
          </Box>

          <Box>
            <Stack direction={['column', null, 'row']} spacing={[1, 4]} alignItems="flex-start">
              <Heading as="h4" size="md" textAlign="left">
                Lycée Raymond Poincaré
              </Heading>
              <Text textAlign="left" fontWeight={500}>
                2015 - 2017
              </Text>
            </Stack>
            <Text textAlign="left">BTS SNIR - Systèmes numériques opt. A : Informatique et réseaux</Text>
          </Box>

          <Box>
            <Stack direction={['column', null, 'row']} spacing={[1, 4]} alignItems="flex-start">
              <Heading as="h4" size="md" textAlign="left">
                IUT Metz
              </Heading>
              <Text textAlign="left" fontWeight={500}>
                2014 - 2015
              </Text>
            </Stack>
            <Text textAlign="left">DUT Informatique</Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
