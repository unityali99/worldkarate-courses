"use client";
import {
  Alert,
  Box,
  Button,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FormInput from "./components/FormInput";
import { toast } from "react-toastify";
import ResetPassword, { ResetPasswordType } from "@/schemas/auth/ResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ApiClient from "@/services/ApiClient";
import { AxiosError } from "axios";
import useAuth from "@/stores/authStore";
import useLanguageStore from "@/stores/languageStore";
import Placeholder from "../Placeholder";

function ChangePasswordForm() {
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { t } = useLanguageStore();

  useEffect(() => setHydrated(true), [setHydrated]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPassword),
  });
  const apiClient = new ApiClient<ResetPasswordType>("/reset-password");

  const onSubmit = (data: ResetPasswordType) => {
    setIsLoading(true);
    apiClient
      .put(data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error: AxiosError) =>
        toast.error((error.response?.data as { message: string }).message)
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <Box
      className="mx-auto space-y-10 text-xs md:text-base font-bold"
      w={{ base: "90%", md: "75%", lg: "50%" }}
    >
      <Text className="text-lg md:text-2xl" dir="rtl">
        {t.ui.changePassword}
      </Text>
      <TableContainer
        className="border border-black border-opacity-20 rounded-lg"
        dir="rtl"
        overflowX="auto"
        p={{ base: "2", md: "5" }}
      >
        <Table variant="simple">
          <TableCaption>
            {errors.newPassword && (
              <Alert
                className="rounded-md text-sm"
                textColor={"red"}
                colorScheme="red"
              >
                {errors.newPassword.message}
              </Alert>
            )}
            {errors.repeatPassword && (
              <Alert
                className="rounded-md text-sm"
                textColor={"red"}
                colorScheme="red"
              >
                {errors.repeatPassword.message}
              </Alert>
            )}
            <Button
              w={{ base: "100%", md: "50%" }}
              size={{ base: "sm", md: "md" }}
              colorScheme="green"
              isDisabled={!hydrated}
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? <Spinner /> : <Text>{t.ui.save}</Text>}
            </Button>
          </TableCaption>
          <Tbody>
            <Tr>
              <Td p={{ base: "8px", md: "16px" }}>{t.ui.newPassword}:</Td>
              <Td
                w={hydrated ? "unset" : "50%"}
                p={{ base: "8px", md: "16px" }}
              >
                {hydrated ? (
                  <FormInput
                    password
                    register={register("newPassword")}
                    dir="ltr"
                    autoComplete="new-password"
                    key={1}
                  />
                ) : (
                  <Placeholder />
                )}
              </Td>
            </Tr>

            <Tr>
              <Td p={{ base: "8px", md: "16px" }}>{t.ui.repeatPassword}:</Td>
              <Td
                w={hydrated ? "unset" : "50%"}
                p={{ base: "8px", md: "16px" }}
              >
                {hydrated ? (
                  <FormInput
                    password
                    register={register("repeatPassword")}
                    dir="ltr"
                    autoComplete="new-password"
                    key={2}
                  />
                ) : (
                  <Placeholder />
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ChangePasswordForm;
