"use client";
import useCart from "@/stores/cartStore";
import useLanguageStore from "@/stores/languageStore";
import {
  Alert,
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
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { push } = useRouter();
  const btnRef = React.useRef(null);
  const { courses, remove, clear, hydrated, setHydrated } = useCart();
  const { t } = useLanguageStore();
  const isMobileScreenSize = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    setHydrated();
  }, [setHydrated]);

  if (!hydrated) {
    return (
      <Button ref={btnRef} disabled size="sm">
        <FaShoppingBasket size={20} />
      </Button>
    );
  }

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} size="sm">
        <FaShoppingBasket size={20} />
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
              <Alert colorScheme="red" className="rounded-lg mt-10">
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
            <Button
              w={"100%"}
              colorScheme="green"
              onClick={() => {
                if (courses.length === 0) return toast.error(t.ui.emptyCart);
                push("/payment/checkout");
                onClose();
              }}
              isDisabled={courses.length === 0}
            >
              {t.ui.payment}
            </Button>
            <Button
              onClick={clear}
              w={"100%"}
              colorScheme="red"
              isDisabled={courses.length === 0}
            >
              {t.ui.clear}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Cart;
