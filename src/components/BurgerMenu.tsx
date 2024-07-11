import {
  Center,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { TiThMenu } from "react-icons/ti";

function BurgerMenu() {
  return (
    <Center>
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
          <MenuItem>دوره ها</MenuItem>
          <MenuItem>پروفایل</MenuItem>
          <MenuItem>اینستاگرام</MenuItem>
          <MenuDivider borderColor={"gray"} mx={2} />
          <MenuItem>خروج</MenuItem>
        </MenuList>
      </Menu>
    </Center>
  );
}

export default BurgerMenu;
