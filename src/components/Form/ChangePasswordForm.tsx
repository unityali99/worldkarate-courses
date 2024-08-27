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
import ResetPassword, { ResetPasswordType } from "@/schemas/ResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ApiClient from "@/services/ApiClient";
import { AxiosError } from "axios";
import useAuth from "@/utils/store";

function ChangePasswordForm() {
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

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

  if (user)
    return (
      <Box className="w-6/12 mx-auto space-y-10">
        <Text className="text-2xl" dir="rtl">
          {"تغییر رمز عبور"}
        </Text>
        <TableContainer
          className="border border-black border-opacity-20 rounded-lg p-10"
          dir="rtl"
        >
          <Table variant="simple">
            <TableCaption className="space-y-10">
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
                className="w-6/12"
                colorScheme="green"
                onClick={handleSubmit(onSubmit)}
              >
                {isLoading ? <Spinner /> : <Text>{"ذخیره"}</Text>}
              </Button>
            </TableCaption>
            <Tbody>
              <Tr>
                <Td>{"رمز عبور جدید:"}</Td>
                <Td>
                  <FormInput
                    password
                    register={register("newPassword")}
                    dir="ltr"
                    key={1}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>{"تکرار رمز عبور جدید:"}</Td>
                <Td>
                  <FormInput
                    password
                    register={register("repeatPassword")}
                    dir="ltr"
                    key={2}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
}

export default ChangePasswordForm;
