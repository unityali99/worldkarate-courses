"use client";
import ApiClient from "@/services/ApiClient";
import { getErrorMessage } from "@/utils/getErrorMessage";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

function DeleteBtn({ text, courseId }: { text: string; courseId: string }) {
  const courseDeletionApi = new ApiClient(`/delete-course/${courseId}`);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { replace } = useRouter();

  const onClick = () => {
    courseDeletionApi
      .delete()
      .then((res) => {
        toast.success(res.data.message);
        replace("/");
      })
      .catch((error) =>
        toast.error(getErrorMessage(error, "خطا در حذف دوره"))
      );
  };

  return (
    <Box>
      <Button w="full" size="lg" rounded="xl" colorScheme="red" onClick={onOpen}>
        {text}
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="justify-center" dir="rtl">
          <ModalHeader className="mr-5">{text}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{"آیا از حذف این مورد اطمینان دارید؟"}</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onClick} mr={3}>
              {"حذف"}
            </Button>
            <Button onClick={onClose}>{"انصراف"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default DeleteBtn;
