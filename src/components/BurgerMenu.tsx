"use client";
import useAuth from "@/stores/authStore";
import {
  Button,
  Center,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import ProfileLink from "./ProfileLink";
import { redirect } from "next/navigation";
import Cart from "./Cart";

function BurgerMenu({ hydrated }: { hydrated: boolean }) {
  const { user, logout } = useAuth();

  if (hydrated)
    return (
      <Center>
        <Cart />
        <Menu direction="rtl" placement="bottom-end">
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={
              <TiThMenu className="md:hidden" color="#444444" size={"30px"} />
            }
            variant="outline"
          />
          <MenuList minW={0} w={"150px"} dir="rtl">
            {user ? (
              <MenuItem>
                <ProfileLink
                  fullName={`${user?.firstName} ${user?.lastName}`}
                />
              </MenuItem>
            ) : (
              <MenuItem as={Link} href={"/auth/login"}>
                ورود / ثبت نام
              </MenuItem>
            )}
            <MenuItem
              as={Link}
              target="_blank"
              href="https://www.instagram.com/amiryarikata/?hl=en"
            >
              اینستاگرام
            </MenuItem>
            <MenuDivider borderColor={"gray"} mx={2} />
            <MenuItem
              onClick={() => {
                logout();
                redirect("/");
              }}
            >
              خروج
            </MenuItem>
          </MenuList>
        </Menu>
      </Center>
    );
}

export default BurgerMenu;
