"use client";
import useAuth from "@/stores/authStore";
import {
  Center,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { TiThMenu } from "react-icons/ti";
import ProfileLink from "./ProfileLink";
import { redirect } from "next/navigation";
import Cart from "./Cart";

function BurgerMenu() {
  const { user, logout } = useAuth();

  return (
    <Center>
      <Menu direction="rtl" placement="bottom-end">
        <MenuItem>
          <Cart />
        </MenuItem>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={
            <TiThMenu className="md:hidden" color="#444444" size={"30px"} />
          }
          variant="outline"
        />
        <MenuList minW={0} w={"150px"} dir="rtl">
          <MenuItem>
            <ProfileLink fullName={`${user?.firstName} ${user?.lastName}`} />
          </MenuItem>
          <MenuItem>اینستاگرام</MenuItem>
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
