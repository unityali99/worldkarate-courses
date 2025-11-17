"use client";
import useAuth from "@/stores/authStore";
import useLanguageStore from "@/stores/languageStore";
import {
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { LuMenu, LuUser, LuLock, LuInstagram, LuLogOut } from "react-icons/lu";
import { redirect } from "next/navigation";
import Cart from "./Cart";

function BurgerMenu({ hydrated }: { hydrated: boolean }) {
  const { user, logout } = useAuth();
  const { t } = useLanguageStore();

  if (hydrated)
    return (
      <HStack spacing={3}>
        <Cart />
        <Menu direction="rtl" placement="bottom-end">
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<LuMenu size={24} style={{ color: "white" }} />}
            variant="ghost"
            size={{ base: "sm", md: "md" }}
            colorScheme="whiteAlpha"
            color="white"
            _hover={{ bg: "rgba(255, 255, 255, 0.2)", color: "white" }}
            _active={{ bg: "rgba(255, 255, 255, 0.3)", color: "white" }}
          />
          <MenuList
            minW="200px"
            dir="rtl"
            bg="rgba(13, 22, 27, 0.95)"
            borderColor="rgba(255, 255, 255, 0.1)"
          >
            {user ? (
              <MenuItem
                as={Link}
                href="/profile"
                bg="transparent"
                _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                icon={<LuUser size={20} style={{ color: "white" }} />}
              >
                <Text color="white">{`${user?.firstName} ${user?.lastName}`}</Text>
              </MenuItem>
            ) : (
              <MenuItem
                as={Link}
                href={"/auth/login"}
                bg="transparent"
                _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                icon={<LuLock size={20} style={{ color: "white" }} />}
              >
                <Text color="white">{t.ui.login + " / " + t.ui.register}</Text>
              </MenuItem>
            )}
            <MenuItem
              as={Link}
              target="_blank"
              href="https://www.instagram.com/amiryarikata/?hl=en"
              bg="transparent"
              _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
              icon={<LuInstagram size={20} style={{ color: "white" }} />}
            >
              <Text color="white">{t.ui.instagram}</Text>
            </MenuItem>
            {user && (
              <>
                <MenuDivider borderColor="rgba(255, 255, 255, 0.2)" />
                <MenuItem
                  onClick={() => {
                    logout();
                    redirect("/");
                  }}
                  bg="transparent"
                  _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                  icon={<LuLogOut size={20} style={{ color: "white" }} />}
                >
                  <Text color="white">{t.ui.logout}</Text>
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      </HStack>
    );
}

export default BurgerMenu;
