"use client";
import useCart from "@/stores/cartStore";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const { courses, remove } = useCart();

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <FaShoppingBasket size={25} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent dir="rtl">
          <DrawerCloseButton />
          <DrawerHeader className="mx-auto">سبد خرید</DrawerHeader>
          <DrawerBody>
            {courses.map((course, index) => (
              <Flex
                key={index}
                className="flex-row justify-between items-center"
              >
                <Text className="text-base my-6">{course.title}</Text>
                <MdClose
                  size={20}
                  className="cursor-pointer"
                  onClick={() => remove(course.id)}
                />
              </Flex>
            ))}
          </DrawerBody>
          <DrawerFooter>
            <Button className="w-full" colorScheme="green">
              پرداخت
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Cart;
