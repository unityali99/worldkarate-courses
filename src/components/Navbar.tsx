import { Button, Flex, HStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
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
      {/* <HStack
          className="space-x-0 md:space-x-10"
          display={{ base: "none", md: "flex" }}
        >
          <Link className="font-light hover:underline" href={"/courses"}>
            دوره ها
          </Link>
          <Text>Profile</Text>
        </HStack> */}
      <Link href={"/auth/login"}>
        <Button colorScheme="red" p={6}>
          ورود
        </Button>
      </Link>
      {/* <Box className="md:hidden">
          <BurgerMenu />
        </Box> */}
    </Flex>
  );
}

export default Navbar;
