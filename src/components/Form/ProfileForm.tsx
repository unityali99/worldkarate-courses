"use client";
import PanelContainer from "@/layouts/PanelContainer";
import PanelTableContainer from "@/layouts/PanelTableContainer";
import Profile, { ProfileType } from "@/schemas/auth/Profile";
import ApiClient from "@/services/ApiClient";
import useAuth from "@/stores/authStore";
import {
  Button,
  Center,
  Input,
  Spinner,
  Table,
  TableCaption,
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
import Placeholder from "../Placeholder";

function ProfileForm({ isAdmin }: { isAdmin: boolean }) {
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
  const { push } = useRouter();
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
    window.location.replace("/auth/login");
    return;
  }

  return (
    <PanelContainer>
      {isAdmin && (
        <>
          <Text className="text-lg md:text-2xl" dir="rtl">
            {"پنل ادمین"}
          </Text>
          <Center>
            <Button onClick={() => push("/profile/admin")} colorScheme="blue">
              {"هدایت به پنل ادمین"}
            </Button>
          </Center>
        </>
      )}
      <Text className="text-lg md:text-2xl" dir="rtl">
        {"پروفایل"}
      </Text>
      <PanelTableContainer>
        <Table variant="simple">
          <TableCaption>
            {isEditing ? (
              <Button
                w={{ base: "100%", md: "50%" }}
                size={{ base: "sm", md: "md" }}
                mx="auto"
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
                w={{ base: "100%", md: "50%" }}
                size={{ base: "sm", md: "md" }}
                mx="auto"
                onClick={() => setIsEditing(true)}
                colorScheme="orange"
                isDisabled={!hydrated}
              >
                {"اصلاح"}
              </Button>
            )}
          </TableCaption>
          <Tbody>
            <Tr>
              <Td p={{ base: "8px", md: "16px" }}>{"نام:"}</Td>
              <Td
                w={hydrated ? "unset" : "50%"}
                p={{ base: "8px", md: "16px" }}
              >
                {hydrated ? (
                  <Input
                    disabled={!isEditing}
                    {...register("firstName")}
                    size={{ base: "sm", md: "md" }}
                    fontSize={{ base: "small", md: "md" }}
                    textAlign={"center"}
                    defaultValue={user!.firstName}
                    style={inputDisabledStyle}
                  />
                ) : (
                  <Placeholder />
                )}
              </Td>
            </Tr>
            <Tr>
              <Td p={{ base: "8px", md: "16px" }}>{"نام خانوادگی:"}</Td>
              <Td
                w={hydrated ? "unset" : "50%"}
                p={{ base: "8px", md: "16px" }}
              >
                {hydrated ? (
                  <Input
                    disabled={!isEditing}
                    {...register("lastName")}
                    size={{ base: "sm", md: "md" }}
                    fontSize={{ base: "small", md: "md" }}
                    textAlign={"center"}
                    defaultValue={user!.lastName}
                    style={inputDisabledStyle}
                  />
                ) : (
                  <Placeholder />
                )}
              </Td>
            </Tr>
            <Tr>
              <Td p={{ base: "8px", md: "16px" }}>{"ایمیل:"}</Td>
              <Td
                w={hydrated ? "unset" : "50%"}
                p={{ base: "8px", md: "16px" }}
              >
                {hydrated ? (
                  <Input
                    disabled={!isEditing}
                    {...register("email")}
                    size={{ base: "sm", md: "md" }}
                    fontSize={{ base: "small", md: "md" }}
                    textAlign={"center"}
                    defaultValue={user!.email}
                    style={inputDisabledStyle}
                  />
                ) : (
                  <Placeholder />
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </PanelTableContainer>
    </PanelContainer>
  );
}

export default ProfileForm;
