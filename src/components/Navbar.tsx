import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BurgerMenu from "./BurgerMenu";
import NewsLetterForm from "./NewsLetterForm";

function Navbar() {
  return (
    <React.Fragment>
      <Flex className="py-10 justify-between md:justify-around items-center px-5">
        <HStack className="space-x-0 md:space-x-16">
          <Image
            priority
            alt="Logo"
            quality={100}
            width={90}
            height={90}
            src={"/logo.webp"}
          />
          <Link className="hidden md:block hover:underline" href={"#"}>
            اینستاگرام
          </Link>
        </HStack>
        <HStack
          className="space-x-0 md:space-x-10"
          display={{ base: "none", md: "flex" }}
        >
          <Link className="font-light hover:underline" href={"/courses"}>
            دوره ها
          </Link>
          <Text>Profile</Text>
        </HStack>
        <Box className="md:hidden">
          <BurgerMenu />
        </Box>
      </Flex>
      <Box className="bg-heading text-white text-center py-12 font-bold text-lg px-4">
        <Heading>سنسی امیر یاری</Heading>
        <Text className="mt-7 mb-10 font-light">پکیج های آموزشی کاتا</Text>
        <Text className="mt-7 mb-10 font-light" dir="rtl">
          {"برای اطلاع از آخرین بروزرسانی پکیج ها ایمیل خود را وارد کنید."}
        </Text>
        <Flex
          alignItems={"center"}
          justify={"center"}
          className="space-y-3 md:space-x-5 md:space-y-0 flex-col md:flex-row"
        >
          <NewsLetterForm />
        </Flex>
      </Box>
    </React.Fragment>
  );
}

export default Navbar;
