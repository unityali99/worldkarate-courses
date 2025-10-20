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
      <Text fontSize="sm" color="gray.600">
        {currentLanguage === "fa" ? "فا" : "En"}
      </Text>
      <Button
        size="sm"
        variant="outline"
        onClick={toggleLanguage}
        fontSize="xs"
        px={2}
        py={1}
      >
        {currentLanguage === "fa" ? "English" : "فارسی"}
      </Button>
    </HStack>
  );
}

export default LanguageSwitcher;
