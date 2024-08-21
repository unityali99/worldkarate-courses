"use client";
import Profile, { ProfileType } from "@/schemas/Profile";
import ApiClient from "@/services/ApiClient";
import useAuth from "@/utils/store";
import {
  Box,
  Button,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function ProfilePage() {
  const { user, login } = useAuth();
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const { refresh } = useRouter();

  useEffect(() => setHydrated(true), [setHydrated]);
  const { register, handleSubmit, reset } = useForm<ProfileType>({
    resolver: zodResolver(Profile),
  });
  const { replace } = useRouter();
  const apiClient = new ApiClient<ProfileType>("/profile");

  const onSubmit = (data: ProfileType) => {
    reset();
    apiClient
      .put(data)
      .then((res) => {
        toast.success(res.data.message);
        // login(data);
        refresh();
      })
      .catch((error: AxiosError) =>
        toast.error((error.response?.data as { message: string }).message)
      );
  };

  if (!user && hydrated) return replace("/auth/login");
  if (user)
    return (
      <Box className="w-6/12 mx-auto space-y-10">
        <Text className="text-2xl" dir="rtl">
          {"پروفایل"}
        </Text>
        <TableContainer
          className="border border-black border-opacity-20 rounded-lg p-10"
          dir="rtl"
        >
          <Table variant="simple">
            <TableCaption>
              <Button colorScheme="red">{"حذف حساب"}</Button>
            </TableCaption>
            <Tbody>
              <Tr>
                <Td>{"نام"}</Td>
                <Td>
                  {isEditingFirstName ? (
                    <Input
                      {...register("firstName")}
                      size={"md"}
                      defaultValue={hydrated ? user.firstName : ""}
                      outlineColor={"orange"}
                    />
                  ) : hydrated ? (
                    user.firstName
                  ) : (
                    "Loading"
                  )}
                </Td>
                <Td>
                  {isEditingFirstName ? (
                    <Button
                      onClick={handleSubmit((data) => {
                        onSubmit(data);
                        setIsEditingFirstName(false);
                      })}
                      colorScheme="green"
                    >
                      {"ذخیره"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsEditingFirstName(true)}
                      colorScheme="orange"
                    >
                      {"اصلاح"}
                    </Button>
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>{"نام خانوادگی"}</Td>
                <Td>
                  {" "}
                  {isEditingLastName ? (
                    <Input
                      {...register("lastName")}
                      size={"md"}
                      defaultValue={hydrated ? user.lastName : ""}
                      outlineColor={"orange"}
                    />
                  ) : hydrated ? (
                    user.lastName
                  ) : (
                    "Loading"
                  )}
                </Td>
                <Td>
                  {isEditingLastName ? (
                    <Button
                      onClick={handleSubmit((data) => {
                        onSubmit(data);
                        setIsEditingLastName(false);
                      })}
                      colorScheme="green"
                    >
                      {"ذخیره"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsEditingLastName(true)}
                      colorScheme="orange"
                    >
                      {"اصلاح"}
                    </Button>
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>{"ایمیل"}</Td>
                <Td>
                  {" "}
                  {isEditingEmail ? (
                    <Input
                      {...register("email")}
                      size={"md"}
                      defaultValue={hydrated ? user.email : ""}
                      outlineColor={"orange"}
                    />
                  ) : hydrated ? (
                    user.email
                  ) : (
                    "Loading"
                  )}
                </Td>
                <Td>
                  {isEditingEmail ? (
                    <Button
                      onClick={handleSubmit((data) => {
                        onSubmit(data);
                        setIsEditingEmail(false);
                      })}
                      colorScheme="green"
                    >
                      {"ذخیره"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsEditingEmail(true)}
                      colorScheme="orange"
                    >
                      {"اصلاح"}
                    </Button>
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
}

export default ProfilePage;
