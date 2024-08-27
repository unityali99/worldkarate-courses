"use client";
import Profile, { ProfileType } from "@/schemas/Profile";
import ApiClient from "@/services/ApiClient";
import useAuth from "@/utils/store";
import {
  Box,
  Button,
  Input,
  Spinner,
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

function ProfileForm() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { refresh } = useRouter();

  useEffect(() => setHydrated(true), [setHydrated]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileType>({
    resolver: zodResolver(Profile),
  });
  const { replace } = useRouter();
  const apiClient = new ApiClient<ProfileType>("/profile");

  const onSubmit = (data: ProfileType) => {
    setIsLoading(true);
    reset();
    apiClient
      .put(data)
      .then((res) => {
        toast.success(res.data.message);
        login(data);
        refresh();
      })
      .catch((error: AxiosError) =>
        toast.error((error.response?.data as { message: string }).message)
      )
      .finally(() => setIsLoading(false));
  };
  const inputDisabledStyle = {
    opacity: isEditing ? 1 : 1,
    cursor: isEditing ? "text" : "default",
  };

  if (!user && hydrated) {
    replace("/auth/login");
    return;
  }
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
            <TableCaption className="space-y-10">
              {isEditing ? (
                <Button
                  className="w-6/12"
                  display={"block"}
                  mx={"auto"}
                  onClick={handleSubmit((data) => {
                    onSubmit(data);
                    setIsEditing(false);
                  })}
                  colorScheme="green"
                >
                  {isLoading ? <Spinner /> : <Text>{"ذخیره"}</Text>}
                </Button>
              ) : (
                <Button
                  className="w-6/12"
                  display={"block"}
                  mx={"auto"}
                  onClick={() => setIsEditing(true)}
                  colorScheme="orange"
                >
                  {"اصلاح"}
                </Button>
              )}
              <Button colorScheme="red">{"حذف حساب"}</Button>
            </TableCaption>
            <Tbody>
              <Tr>
                <Td>{"نام"}</Td>
                <Td>
                  {hydrated ? (
                    <Input
                      disabled={!isEditing}
                      {...register("firstName")}
                      size={"md"}
                      defaultValue={user.firstName}
                      style={inputDisabledStyle}
                    />
                  ) : (
                    <Input
                      disabled
                      size={"md"}
                      placeholder="Loading"
                      outlineColor={"black"}
                    />
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>{"نام خانوادگی"}</Td>
                <Td>
                  {hydrated ? (
                    <Input
                      disabled={!isEditing}
                      {...register("lastName")}
                      size={"md"}
                      defaultValue={user.lastName}
                      style={inputDisabledStyle}
                    />
                  ) : (
                    <Input
                      disabled
                      size={"md"}
                      placeholder="Loading"
                      outlineColor={"black"}
                    />
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>{"ایمیل"}</Td>
                <Td>
                  {hydrated ? (
                    <Input
                      disabled={!isEditing}
                      {...register("email")}
                      size={"md"}
                      defaultValue={user.email}
                      style={inputDisabledStyle}
                    />
                  ) : (
                    <Input
                      disabled
                      size={"md"}
                      placeholder="Loading"
                      outlineColor={"black"}
                    />
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
}

export default ProfileForm;
