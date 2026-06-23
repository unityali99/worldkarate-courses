"use client";
import useAuth from "@/stores/authStore";
import useLanguageStore from "@/stores/languageStore";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import ProfileLink from "./ProfileLink";
import Cart from "./Cart";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePathname } from "next/navigation";
import { LuBookOpen, LuInstagram, LuLogOut } from "react-icons/lu";

function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguageStore();
  const path = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasTransparentHero =
    path === "/" || path === "/profile" || path.startsWith("/courses");
  const shouldShowBackground = isScrolled || !hasTransparentHero;
  const navbarPosition = hasTransparentHero
    ? isScrolled
      ? "fixed"
      : "absolute"
    : "sticky";

  // Add extra padding to the bottom of the navbar when it's sticky on special pages to push content down and avoid gaps.

  return (
    <Flex
      position={navbarPosition}
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      className={`w-full py-3 md:py-6 px-3 md:px-4 transition-all duration-300 md:text-white`}
      bg={shouldShowBackground ? "rgba(13, 22, 27, 0.5)" : undefined}
      backdropFilter={shouldShowBackground ? "blur(5px)" : "none"}
      boxShadow={shouldShowBackground ? "lg" : "none"}
      borderBottom={
        shouldShowBackground ? "1px solid rgba(255, 255, 255, 0.1)" : "none"
      }
      suppressHydrationWarning={true}
    >
      <Flex className="w-full md:max-w-6xl mx-auto justify-between items-center">
        <HStack spacing={{ base: 0, md: 20, lg: 20 }}>
          <Link href={"/"}>
            <Box
              position="relative"
              width={{ base: "100px", md: "120px" }}
              height={{ base: "100px", md: "120px" }}
            >
              <Image
                priority
                alt="Logo"
                quality={100}
                fill
                className="object-contain"
                src={"/logo.webp"}
                unoptimized
              />
            </Box>
          </Link>
          <Stack
            display={{ base: "none", md: "flex" }}
            spacing={{ md: 3, lg: 5 }}
            direction={{ md: "column", lg: "row" }}
          >
            {/* Instagram Link */}
            <Link
              href="https://www.instagram.com/amiryarikata/?hl=en"
              isExternal
              aria-label="Instagram"
              _hover={{ textDecoration: "none" }}
            >
              <HStack
                spacing={3}
                px={4}
                py={2}
                rounded="full"
                border="1px solid"
                borderColor="whiteAlpha.300"
                transition="all 0.2s ease"
                _hover={{
                  borderColor: "pink.400",
                  transform: "translateY(-2px)",
                  opacity: 0.9,
                }}
              >
                <Flex
                  align="center"
                  justify="center"
                  w={8}
                  h={8}
                  rounded="full"
                  bgGradient="linear(135deg, pink.400, pink.600, purple.500)"
                  shadow="0 0 12px rgba(236,72,153,0.55)"
                  flexShrink={0}
                  transition="all 0.2s ease"
                  _groupHover={{ shadow: "0 0 20px rgba(236,72,153,0.8)" }}
                >
                  <LuInstagram size={16} color="white" />
                </Flex>
                <Box
                  fontWeight="bold"
                  fontSize={"lg"}
                  fontFamily="sans-serif"
                  color="white"
                  letterSpacing="wide"
                >
                  {t.ui.instagram}
                </Box>
              </HStack>
            </Link>

            {/* Courses Link */}
            <Link
              href="/courses"
              aria-label={t.ui.courses}
              _hover={{ textDecoration: "none" }}
            >
              <HStack
                spacing={3}
                px={4}
                py={2}
                rounded="full"
                border="1px solid"
                borderColor="whiteAlpha.300"
                transition="all 0.2s ease"
                _hover={{
                  borderColor: "teal.400",
                  transform: "translateY(-2px)",
                  opacity: 0.9,
                }}
              >
                <Flex
                  align="center"
                  justify="center"
                  w={9}
                  h={9}
                  rounded="full"
                  bgGradient="linear(135deg, cyan.400, teal.500, blue.600)"
                  shadow="0 0 14px rgba(20,184,166,0.75)"
                  flexShrink={0}
                  transition="all 0.2s ease"
                >
                  <LuBookOpen size={18} color="white" />
                </Flex>
                <Box
                  fontWeight="bold"
                  fontSize={"lg"}
                  fontFamily="sans-serif"
                  color="white"
                  letterSpacing="wide"
                >
                  {t.ui.courses}
                </Box>
              </HStack>
            </Link>
          </Stack>
        </HStack>
        {user && hydrated && (
          <HStack
            className="space-x-0 md:space-x-5"
            display={{ base: "none", md: "flex" }}
          >
            <Cart />
            <LanguageSwitcher />
            <ProfileLink fullName={`${user.firstName} ${user.lastName}`} />
            <IconButton
              aria-label="Logout"
              icon={<LuLogOut size={20} />}
              colorScheme="red"
              onClick={logout}
              size="md"
            />
          </HStack>
        )}
        {!user && hydrated && (
          <HStack
            className="space-x-0 md:space-x-10"
            display={{ base: "none", md: "flex" }}
          >
            <Cart />
            <LanguageSwitcher />
            <Link href={"/auth/login"}>
              <Button colorScheme="red" p={6}>
                {t.ui.login + " / " + t.ui.register}
              </Button>
            </Link>
          </HStack>
        )}
        <Box className="md:hidden">
          <BurgerMenu hydrated={hydrated} />
        </Box>
        {!hydrated && <Spinner size={{ base: "sm", md: "lg" }} />}
      </Flex>
    </Flex>
  );
}

export default Navbar;
