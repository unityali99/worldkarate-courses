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
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import ProfileLink from "./ProfileLink";
import Cart from "./Cart";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePathname } from "next/navigation";
import { LuInstagram, LuLogOut } from "react-icons/lu";

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

  // Determine if navbar should be absolute (only on home page when not scrolled)
  const isAbsolute = path === "/" && !isScrolled;

  // Determine background and effects - dark background only when scrolled on all pages
  const shouldShowBackground = isScrolled || path.startsWith("/profile");

  return (
    <Flex
      position={isAbsolute ? "absolute" : "sticky"}
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
        <HStack spacing={{ base: 3, md: 16 }}>
          <Link href={"/"}>
            <Image
              priority
              alt="Logo"
              quality={100}
              width={180}
              height={180}
              className="w-[60px] h-[60px] md:w-[90px] md:h-[90px]"
              src={"/logo.webp"}
              unoptimized
            />
          </Link>
          <Link
            className="hidden md:flex items-center gap-2 hover:underline"
            href={"https://www.instagram.com/amiryarikata/?hl=en"}
            target="_blank"
          >
            <LuInstagram size={20} />
            {t.ui.instagram}
          </Link>
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
