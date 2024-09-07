"use client";
import useCart from "@/stores/cartStore";
import {
  Alert,
  Badge,
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
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const { courses, remove, clear } = useCart();
  const isMobileScreenSize = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <FaShoppingBasket size={25} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement={isMobileScreenSize ? "bottom" : "right"}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent dir="rtl">
          <DrawerCloseButton />
          <DrawerHeader className="mx-auto">سبد خرید</DrawerHeader>
          <DrawerBody>
            {courses.length === 0 ? (
              <Alert colorScheme="purple" className="rounded-lg mt-10">
                <Text className="mx-auto">سبد خرید خالی میباشد</Text>
              </Alert>
            ) : (
              courses.map((course, index) => (
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
              ))
            )}
          </DrawerBody>
          <DrawerFooter className="flex flex-col space-y-3">
            <Button w={"100%"} colorScheme="green">
              پرداخت
            </Button>
            <Button onClick={clear} w={"100%"} colorScheme="red">
              حذف همه
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Cart;
