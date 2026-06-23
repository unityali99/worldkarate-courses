"use client";
import React from "react";
import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Link,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { FaWhatsapp, FaInstagram, FaTelegram } from "react-icons/fa";
import useLanguageStore from "@/stores/languageStore";

const Footer = () => {
  const { t, currentLanguage } = useLanguageStore();

  return (
    <Box
      dir={currentLanguage === "fa" ? "rtl" : "ltr"}
      bg="#0d161b"
      color="white"
      py={10}
      mt="auto"
    >
      <Container maxW="container.xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={8}
          justify="space-between"
          align="center"
          textAlign={{
            base: "center",
            md: currentLanguage === "fa" ? "right" : "left",
          }}
        >
          {/* Contact Info */}
          <Stack
            spacing={4}
            align={{
              base: "center",
              md: "flex-start",
            }}
          >
            <Text fontSize="xl" fontWeight="bold" color="teal.400">
              {t.ui.footer.contactUs}
            </Text>
            <Flex
              align="center"
              gap={2}
              direction={{ base: "column", md: "row" }}
            >
              <Text opacity={0.8}>{t.ui.footer.address}</Text>
            </Flex>
            <Flex
              align="center"
              gap={2}
              direction={{ base: "column", md: "row" }}
            >
              <Text opacity={0.8}>{t.ui.footer.phone}</Text>
            </Flex>
          </Stack>

          {/* Social Links */}
          <Stack spacing={4} align="center">
            <Text fontSize="lg" fontWeight="semibold">
              {t.ui.footer.socialMedias}
            </Text>
            <Stack direction="row" spacing={6}>
              <Link
                href="https://wa.me/989191257020"
                isExternal
                aria-label="WhatsApp"
                _hover={{ transform: "translateY(-2px)", color: "green.400" }}
                transition="all 0.3s"
              >
                <Icon as={FaWhatsapp} w={8} h={8} />
              </Link>
              <Link
                href="https://www.instagram.com/amiryarikata/"
                isExternal
                aria-label="Instagram"
                _hover={{ transform: "translateY(-2px)", color: "pink.400" }}
                transition="all 0.3s"
              >
                <Icon as={FaInstagram} w={8} h={8} />
              </Link>
              <Link
                href="https://t.me/Amiryarikata"
                isExternal
                aria-label="Telegram"
                _hover={{ transform: "translateY(-2px)", color: "blue.400" }}
                transition="all 0.3s"
              >
                <Icon as={FaTelegram} w={8} h={8} />
              </Link>
            </Stack>
          </Stack>
        </Stack>

        <Divider my={8} borderColor="gray.800" />

        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          fontSize="sm"
          opacity={0.8}
        >
          <Flex align="center" gap={1}>
            <Text>{t.ui.footer.designer}</Text>
            <Text fontWeight="bold" color="teal.400">
              {t.ui.footer.designerName}
            </Text>
          </Flex>
          <Text>
            {t.ui.footer.rights} © {new Date().getFullYear()}
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
