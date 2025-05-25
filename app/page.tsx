import Container from "@/components/Container";
import { Avatar } from "@/components/ui/avatar";
import { Box, Flex, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import Link from "next/link";
import { IoIosMail, IoLogoGithub, IoLogoLinkedin } from "react-icons/io";

export default function Home() {
  const iconStyle = { color: '#c68908' }

  const now = dayjs()
  const currentJobYear = Math.floor(now.diff('2023-06-01', 'years', true))
  const currentJobMonth = Math.floor(now.diff('2023-06-01', 'months', true) - currentJobYear * 12)

  return (
    <Box>
      <Flex w="full" minH="65vh" py={[12, 24]} px={6} justifyContent="center" bgColor="brand.300">
        <Stack
          w="full"
          maxW="1280px"
          gap={[10, null, null, 0]}
          direction={['column-reverse', null, null, 'row']}
          alignContent="center"
          alignItems="center"
          justifyContent="space-between"
        >
          <VStack gap={12} alignItems="flex-start">
            <Heading as="h1" fontSize={{base: '4xl', sm: '5xl', md: '6xl', lg:'7xl' }} textAlign="left" textTransform="uppercase" letterSpacing={{base: '4px', sm: '8px'}}>
              <Text lineHeight={1}>Gauthier</Text>
              <Text lineHeight={1}>Painteaux</Text>
            </Heading>

            <Heading as="h2" fontSize={{base: '2xl', sm: '3xl', md: '4xl'}} textAlign="left">
              <Text lineHeight={1.2}>Développeur Web</Text>
              <Text lineHeight={1.2}>Fullstack</Text>
            </Heading>

            <VStack gap={4} alignItems="flex-start">
              <Link href="https://www.linkedin.com/in/gauthier-painteaux-1018a2167/" target="_blank">
                <HStack gap={2} alignItems="center">
                  <IoLogoLinkedin size="28px" style={iconStyle} />
                  <Text>LinkedIn</Text>
                </HStack>
              </Link>

              <Link href="https://github.com/Greite" target="_blank">
                <HStack gap={2} alignItems="center">
                  <IoLogoGithub size="28px" style={iconStyle} />
                  <Text>Github</Text>
                </HStack>
              </Link>

              <Link href="mailto:contact@gauthierpainteaux.fr">
                <HStack gap={2} alignItems="center">
                  <IoIosMail size="28px" style={iconStyle} />
                  <Text>contact@gauthierpainteaux.fr</Text>
                </HStack>
              </Link>
            </VStack>
          </VStack>

          <Box textAlign="center">
            <Avatar
              boxSize={['300px', '400px']}
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
        <Heading as="h3" fontSize="4xl" textAlign="left">
          Expériences
        </Heading>

        <Stack gap={6} pt={8}>
          <Box>
            <Stack direction={['column', null, 'row']} gap={[1, 4]} alignItems="flex-start">
              <Heading as="h4" fontSize="xl" lineHeight={1.2} textAlign="left">
                <Link href="https://koul.io/" target="_blank">
                  Koul
                </Link>
              </Heading>
              <Text textAlign="left" fontWeight={500}>
                Juin 2023 - Aujourd&apos;hui (
                {currentJobYear !== 0 ? `${currentJobYear} ${currentJobYear > 1 ? 'ans' : 'an'}` : undefined}
                {currentJobMonth !== 0 ? ` et ${currentJobMonth} mois` : undefined})
              </Text>
            </Stack>
            <Text textAlign="left">Développeur Web Fullstack - CDI</Text>
            <Text textAlign="left" fontStyle="italic" fontWeight={300}>
              Next.JS, Symfony, TypeScript, Docker
            </Text>
          </Box>

          <Box>
            <Stack direction={['column', null, 'row']} gap={[1, 4]} alignItems="flex-start">
              <Heading as="h4" fontSize="xl" lineHeight={1.2} textAlign="left">
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
            <Stack direction={['column', null, 'row']} gap={[1, 4]} alignItems="flex-start">
              <Heading as="h4" fontSize="xl" lineHeight={1.2} textAlign="left">
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
            <Stack direction={['column', null, 'row']} gap={[1, 4]} alignItems="flex-start">
              <Heading as="h4" fontSize="xl" lineHeight={1.2} textAlign="left">
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
        <Heading as="h3" fontSize="4xl" textAlign="left">
          Formations
        </Heading>

        <Stack gap={6} pt={8}>
          <Box>
            <Stack direction={['column', null, 'row']} gap={[1, 4]} alignItems="flex-start">
              <Heading as="h4" fontSize="xl" lineHeight={1.2} textAlign="left">
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
            <Stack direction={['column', null, 'row']} gap={[1, 4]} alignItems="flex-start">
              <Heading as="h4" fontSize="xl" lineHeight={1.2} textAlign="left">
                Lycée Raymond Poincaré
              </Heading>
              <Text textAlign="left" fontWeight={500}>
                2015 - 2017
              </Text>
            </Stack>
            <Text textAlign="left">BTS SNIR - Systèmes numériques opt. A : Informatique et réseaux</Text>
          </Box>

          <Box>
            <Stack direction={['column', null, 'row']} gap={[1, 4]} alignItems="flex-start">
              <Heading as="h4" fontSize="xl" lineHeight={1.2} textAlign="left">
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
