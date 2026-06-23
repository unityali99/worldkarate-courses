"use client";
import { Button, HStack, Text } from "@chakra-ui/react";
import useLanguageStore from "@/stores/languageStore";
import React from "react";

function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "fa" ? "en" : "fa";
    setLanguage(newLanguage);
  };

  return (
    <HStack spacing={2}>
      <Text
        fontSize="sm"
        fontWeight="bold"
        color="whiteAlpha.800"
        fontFamily="sans-serif"
      >
        {currentLanguage === "fa" ? "فا" : "En"}
      </Text>
      <Button
        size="sm"
        variant="outline"
        onClick={toggleLanguage}
        fontSize="xs"
        fontWeight="bold"
        fontFamily="sans-serif"
        px={3}
        py={1}
        rounded="full"
        color="white"
        borderColor="whiteAlpha.400"
        _hover={{
          borderColor: "whiteAlpha.700",
          bg: "whiteAlpha.100",
          transform: "translateY(-1px)",
        }}
        _active={{ bg: "whiteAlpha.200" }}
        transition="all 0.2s ease"
      >
        {currentLanguage === "fa" ? "English" : "فارسی"}
      </Button>
    </HStack>
  );
}

export default LanguageSwitcher;
