"use client";
import useAuth from "@/utils/store";
import { Box, Button, Flex, HStack, Spinner, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import ProfileLink from "./ProfileLink";
import { redirect } from "next/navigation";
import { FaShoppingBasket } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => setHydrated(true), []);
  console.log(isCartOpen);
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
          <FaShoppingBasket
            size={25}
            className="hover:cursor-pointer"
            onClick={() => setIsCartOpen((prevValue) => !prevValue)}
          />
          <ProfileLink fullName={`${user.firstName} ${user.lastName}`} />
          <Link className="font-light hover:underline" href={"/"}>
            <Button
              colorScheme="red"
              p={6}
              onClick={() => {
                logout();
                redirect("/");
              }}
            >
              خروج
            </Button>
          </Link>
        </HStack>
      )}
      {!user && hydrated && (
        <Link href={"/auth/login"}>
          <Button colorScheme="red" p={6}>
            ورود
          </Button>
        </Link>
      )}
      {user && (
        <Box className="md:hidden">
          <BurgerMenu />
        </Box>
      )}
      {!hydrated && <Spinner color="black" size={"lg"} />}
    </Flex>
  );
}

export default Navbar;
