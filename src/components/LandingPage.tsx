"use client";

import useLanguageStore from "@/stores/languageStore";
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  LuArrowRight,
  LuArrowLeft,
  LuShield,
  LuTarget,
  LuAward,
} from "react-icons/lu";
import { motion } from "framer-motion";

export default function LandingPage() {
  const { t, currentLanguage } = useLanguageStore();
  const dir = currentLanguage === "fa" ? "rtl" : "ltr";
  const ArrowIcon = currentLanguage === "fa" ? LuArrowLeft : LuArrowRight;

  // Define color scheme
  const bgColor = useColorModeValue("gray.50", "#080f12");
  const cardBg = useColorModeValue("white", "#0b1318");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box dir={dir} className="w-full font-iran-sans" bg={bgColor}>
      {/* Hero Section with Enhanced Visuals */}
      <Box
        minH={{ base: "80vh", md: "90vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px={4}
        position="relative"
        overflow="hidden"
        backgroundImage={"url('/navbar.webp')"}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        {/* Dark Overlay to make text legible and align contrast on all screens */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="full"
          height="full"
          bgGradient="linear(to-b, blackAlpha.600, blackAlpha.400)"
          zIndex={0}
        />

        <Container maxW="container.xl" zIndex={1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <VStack
              spacing={8}
              align="center"
              maxW="3xl"
              mx="auto"
              textAlign="center"
            >
              <motion.div
                initial={{ opacity: 0, y: -50, x: 0 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
              >
                <Heading
                  as="h1"
                  size={{ base: "xl", md: "2xl", lg: "3xl" }}
                  mb={6}
                  bgClip="text"
                  color="white"
                  fontWeight="normal"
                  lineHeight="1.2"
                  fontFamily="var(--font-lalezar)"
                >
                  {t.ui.landing.heroTitle}
                </Heading>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
              >
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  color="gray.200"
                  mb={8}
                  lineHeight="tall"
                  maxW="2xl"
                  mx="auto"
                  className="font-iran-sans"
                >
                  {t.ui.landing.heroDesc}
                </Text>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 0, x: 50 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <Link href="/courses">
                  <Button
                    size="lg"
                    bgGradient="linear(to-r, blue.500, purple.500)"
                    color="white"
                    _hover={{
                      bgGradient: "linear(to-r, blue.600, purple.600)",
                      transform: "translateY(-2px)",
                      shadow: "lg",
                    }}
                    leftIcon={
                      currentLanguage !== "fa" ? <ArrowIcon /> : undefined
                    }
                    rightIcon={
                      currentLanguage === "fa" ? <ArrowIcon /> : undefined
                    }
                    px={8}
                    py={7}
                    fontSize="lg"
                    shadow="xl"
                    transition="all 0.3s ease"
                  >
                    {t.ui.landing.ctaButton}
                  </Button>
                </Link>
              </motion.div>
            </VStack>
          </motion.div>
        </Container>
      </Box>

      <Box
        py={16}
        bgGradient={useColorModeValue(
          "linear(to-b, white, gray.50)",
          "linear(to-b, #060a0c, #0a1115)",
        )}
        color={textColor}
      >
        <Container maxW="container.xl">
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={8}
            textAlign="center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Box p={6}>
                <Icon
                  as={LuAward}
                  w={12}
                  h={12}
                  color="blue.500"
                  mx="auto"
                  mb={4}
                />
                <Heading as="h3" size="md" mb={2}>
                  {t.ui.landing.experience}
                </Heading>
                <Text color="gray.600">{t.ui.landing.experienceDesc}</Text>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Box p={6}>
                <Icon
                  as={LuTarget}
                  w={12}
                  h={12}
                  color="purple.500"
                  mx="auto"
                  mb={4}
                />
                <Heading as="h3" size="md" mb={2}>
                  {t.ui.landing.training}
                </Heading>
                <Text color="gray.600">{t.ui.landing.trainingDesc}</Text>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box p={6}>
                <Icon
                  as={LuShield}
                  w={12}
                  h={12}
                  color="green.500"
                  mx="auto"
                  mb={4}
                />
                <Heading as="h3" size="md" mb={2}>
                  {t.ui.landing.environment}
                </Heading>
                <Text color="gray.600">{t.ui.landing.environmentDesc}</Text>
              </Box>
            </motion.div>
          </SimpleGrid>
        </Container>
      </Box>

      <Box
        py={20}
        bgGradient={useColorModeValue(
          "linear(to-b, gray.50, blue.50)",
          "linear(to-b, #0a1115, #0f191f)",
        )}
        color={textColor}
      >
        <Container maxW="container.xl">
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={12}
            alignItems="center"
          >
            <motion.div
              initial={{ opacity: 0, x: currentLanguage === "fa" ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Box
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="2xl"
                position="relative"
                h={{ base: "300px", md: "400px", lg: "500px" }}
              >
                <Image
                  src="/sensei.webp"
                  alt="Sensei Amir Yari"
                  objectFit="cover"
                  w="full"
                  h="full"
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: currentLanguage === "fa" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Box textAlign="start" className="space-y-4 lg:space-y-7">
                <Heading
                  as="h2"
                  size="2xl"
                  bgGradient="linear(to-r, blue.500, purple.500)"
                  bgClip="text"
                  fontFamily="var(--font-lalezar)"
                  fontWeight="normal"
                >
                  {t.ui.landing.aboutTitle}
                </Heading>
                <Text
                  fontSize="lg"
                  lineHeight="tall"
                  color="gray.600"
                  textAlign={"justify"}
                >
                  {t.ui.landing.aboutDesc}
                </Text>
                <HStack spacing={4} justify="start">
                  <Link href="/courses">
                    <Button
                      variant="outline"
                      colorScheme="blue"
                      borderColor="blue.500"
                      color="blue.500"
                      _hover={{ bg: "blue.50", transform: "translateY(-2px)" }}
                    >
                      {t.ui.landing.learnMore}
                    </Button>
                  </Link>
                  <Link href="/profile/admin">
                    <Button
                      bgGradient="linear(to-r, blue.500, purple.500)"
                      color="white"
                      _hover={{
                        bgGradient: "linear(to-r, blue.600, purple.600)",
                        transform: "translateY(-2px)",
                      }}
                    >
                      {t.ui.landing.meetSensei}
                    </Button>
                  </Link>
                </HStack>
              </Box>
            </motion.div>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Divider */}
      <Container maxW="container.xl">
        <Box
          h="1px"
          w="full"
          bgGradient={useColorModeValue(
            "linear(to-r, transparent, blue.200, transparent)",
            "linear(to-r, transparent, whiteAlpha.200, transparent)",
          )}
          opacity={0.6}
        />
      </Container>

      <Box
        py={20}
        bgGradient={useColorModeValue(
          "linear(to-b, blue.50, purple.50)",
          "linear(to-b, #0f191f, #0d161b)",
        )}
        color={textColor}
      >
        <Container maxW="container.xl">
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={12}
            alignItems="center"
          >
            <motion.div
              initial={{ opacity: 0, x: currentLanguage === "fa" ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Box textAlign="start" className="space-y-4 lg:space-y-7">
                <Heading
                  as="h2"
                  size="2xl"
                  bgGradient="linear(to-r, green.500, teal.500)"
                  bgClip="text"
                  fontFamily="var(--font-lalezar)"
                  fontWeight="normal"
                >
                  {t.ui.landing.methodologyTitle}
                </Heading>
                <Text fontSize="lg" lineHeight="tall" color="gray.600">
                  {t.ui.landing.methodologyDesc}
                </Text>
                <VStack spacing={3} align={"flex-start"}>
                  <HStack>
                    <Icon as={LuTarget} color="green.500" />
                    <Text>{t.ui.landing.structuredApproach}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={LuTarget} color="green.500" />
                    <Text>{t.ui.landing.progressiveSkill}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={LuTarget} color="green.500" />
                    <Text>{t.ui.landing.traditionalModern}</Text>
                  </HStack>
                </VStack>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: currentLanguage === "fa" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Box
                overflow="hidden"
                position="relative"
                h={{ base: "290px", md: "400px", lg: "500px" }}
              >
                <Image
                  src="/product-1.webp"
                  alt="Karate Methodology"
                  objectFit="contain"
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.02)" }}
                />
              </Box>
            </motion.div>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Divider */}
      <Container maxW="container.xl">
        <Box
          h="1px"
          w="full"
          bgGradient={useColorModeValue(
            "linear(to-r, transparent, purple.200, transparent)",
            "linear(to-r, transparent, whiteAlpha.200, transparent)",
          )}
          opacity={0.6}
        />
      </Container>

      <Box
        py={20}
        bgGradient={useColorModeValue(
          "linear(to-b, purple.50, white)",
          "linear(to-b, #0d161b, #060a0c)",
        )}
        color={textColor}
      >
        <Container maxW="container.xl">
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={12}
            alignItems="center"
          >
            <motion.div
              initial={{ opacity: 0, x: currentLanguage === "fa" ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Box
                borderRadius="2xl"
                overflow="hidden"
                position="relative"
                h={{ base: "200px", md: "400px", lg: "500px" }}
              >
                <Image
                  src="/product-3.webp"
                  alt="Legacy 2012"
                  objectFit="contain"
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: currentLanguage === "fa" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Box textAlign="start" className="space-y-4 lg:space-y-7">
                <Heading
                  as="h2"
                  size="2xl"
                  bgGradient="linear(to-r, orange.500, red.500)"
                  bgClip="text"
                  fontFamily="var(--font-lalezar)"
                  fontWeight="normal"
                >
                  {t.ui.landing.legacyTitle}
                </Heading>
                <Text
                  fontSize="lg"
                  lineHeight="tall"
                  color="gray.600"
                  textAlign={"justify"}
                >
                  {t.ui.landing.legacyDesc}
                </Text>
                <HStack spacing={4} justify="start">
                  <Link href="/courses">
                    <Button
                      bgGradient="linear(to-r, orange.500, red.500)"
                      color="white"
                      _hover={{
                        bgGradient: "linear(to-r, orange.600, red.600)",
                        transform: "translateY(-2px)",
                      }}
                    >
                      {t.ui.landing.exploreHistory}
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button
                      variant="outline"
                      colorScheme="orange"
                      borderColor="orange.500"
                      color="orange.500"
                      _hover={{
                        bg: "orange.50",
                        transform: "translateY(-2px)",
                      }}
                    >
                      {t.ui.landing.viewAchievements}
                    </Button>
                  </Link>
                </HStack>
              </Box>
            </motion.div>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        py={24}
        bgGradient="linear(to-r, blue.800, purple.800)"
        color="white"
      >
        <Container maxW="container.lg" textAlign="center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Heading
              as="h2"
              size="2xl"
              mb={6}
              fontWeight="normal"
              fontFamily="var(--font-lalezar)"
            >
              {t.ui.landing.readyToBegin}
            </Heading>
            <Text
              fontSize="xl"
              mb={8}
              maxW="2xl"
              mx="auto"
              color="gray.200"
              textAlign={"center"}
            >
              {t.ui.landing.joinCommunity}
            </Text>
            <Link href="/courses">
              <Button
                size="xl"
                variant="outline"
                borderColor="white"
                color="white"
                _hover={{ bg: "white", color: "purple.900" }}
                px={10}
                py={6}
                fontSize="xl"
                leftIcon={currentLanguage !== "fa" ? <ArrowIcon /> : undefined}
                rightIcon={currentLanguage === "fa" ? <ArrowIcon /> : undefined}
              >
                {t.ui.landing.ctaButton}
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
