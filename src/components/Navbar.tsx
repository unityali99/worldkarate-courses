"use client";
import useAuthStore from "@/utils/store";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BurgerMenu from "./BurgerMenu";

function Navbar() {
  const { user, logout } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  return (
    <Flex className="py-10 justify-between md:justify-around items-center px-5">
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
        <Link className="hidden md:block hover:underline" href={"#"}>
          اینستاگرام
        </Link>
      </HStack>
      {user && (
        <HStack
          className="space-x-0 md:space-x-10"
          display={{ base: "none", md: "flex" }}
        >
          <Link className="font-light hover:underline" href={"/courses"}>
            دوره ها
          </Link>
          <Text>{user?.fullName}</Text>
          <Link className="font-light hover:underline" href={"/"}>
            <Button colorScheme="red" p={6} onClick={logout}>
              خروج
            </Button>
          </Link>
        </HStack>
      )}
      {!user ||
        (!hydrated && (
          <Link href={"/auth/login"}>
            <Button colorScheme="red" p={6}>
              ورود
            </Button>
          </Link>
        ))}
      {user && (
        <Box className="md:hidden">
          <BurgerMenu />
        </Box>
      )}
      {!hydrated && <div>Loading</div>}
    </Flex>
  );
}

export default Navbar;
