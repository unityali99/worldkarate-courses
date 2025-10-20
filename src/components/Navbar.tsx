"use client";
import useAuth from "@/stores/authStore";
import useLanguageStore from "@/stores/languageStore";
import { Box, Button, Flex, HStack, Link, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import ProfileLink from "./ProfileLink";
import Cart from "./Cart";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePathname } from "next/navigation";

function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguageStore();
  const path = usePathname();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  return (
    <Flex
      className={`w-full bg-opacity-40 py-10 justify-between sm:justify-around items-center px-2 sm:px-0 ${
        path === "/" && "absolute md:text-white"
      }`}
      suppressHydrationWarning={true}
    >
      <HStack className="space-x-0 md:space-x-16">
        <Link href={"/"}>
          <Image
            priority
            alt="Logo"
            quality={100}
            width={90}
            height={90}
            src={"/logo.webp"}
          />
        </Link>
        <Link
          className="hidden md:block hover:underline"
          href={"https://www.instagram.com/amiryarikata/?hl=en"}
          target="_blank"
        >
          {t.ui.instagram}
        </Link>
      </HStack>
      {user && hydrated && (
        <HStack
          className="space-x-0 md:space-x-10"
          display={{ base: "none", md: "flex" }}
        >
          <Cart />
          <LanguageSwitcher />
          <ProfileLink fullName={`${user.firstName} ${user.lastName}`} />
          <Button colorScheme="red" p={6} onClick={logout}>
            {t.ui.logout}
          </Button>
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
      <Box className="md:hidden mr-10 md:m-0">
        <BurgerMenu hydrated={hydrated} />
      </Box>
      {!hydrated && <Spinner size={"lg"} />}
    </Flex>
  );
}

export default Navbar;
