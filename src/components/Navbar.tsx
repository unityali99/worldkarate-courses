"use client";
import useAuth from "@/stores/authStore";
import { Box, Button, Flex, HStack, Link, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import ProfileLink from "./ProfileLink";
import Cart from "./Cart";
import { usePathname } from "next/navigation";

function Navbar() {
  const { user, logout } = useAuth();
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
          {"اینستاگرام"}
        </Link>
      </HStack>
      {user && (
        <HStack
          className="space-x-0 md:space-x-10"
          display={{ base: "none", md: "flex" }}
        >
          <Cart />
          <ProfileLink fullName={`${user.firstName} ${user.lastName}`} />
          <Button colorScheme="red" p={6} onClick={logout}>
            خروج
          </Button>
        </HStack>
      )}
      {!user && hydrated && (
        <HStack
          className="space-x-0 md:space-x-10"
          display={{ base: "none", md: "flex" }}
        >
          <Cart />
          <Link href={"/auth/login"}>
            <Button colorScheme="red" p={6}>
              {"ورود / ثبت نام"}
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
