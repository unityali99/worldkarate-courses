"use client";
import PanelContainer from "@/layouts/PanelContainer";
import PanelTableContainer from "@/layouts/PanelTableContainer";
import Profile, { ProfileType } from "@/schemas/auth/Profile";
import ApiClient from "@/services/ApiClient";
import useAuth from "@/stores/authStore";
import useLanguageStore from "@/stores/languageStore";
import {
  Box,
  Button,
  Center,
  Heading,
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
  const { t } = useLanguageStore();
  const [isEditing, setIsEditing] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { refresh } = useRouter();

  useEffect(() => setHydrated(true), [setHydrated]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileType>({
    resolver: zodResolver(Profile),
    mode: "onSubmit", // Only validate on submit, not on change
    defaultValues: user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }
      : undefined,
  });
  const { push } = useRouter();
  const apiClient = new ApiClient<ProfileType>("/profile");

  const onSubmit = (data: ProfileType) => {
    setIsLoading(true);
    apiClient
      .put(data)
      .then((res) => {
        toast.success(res.data.message);
        login(data);
        // Reset form with the updated data
        reset(data);
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


  return (
    <PanelContainer>
      {isAdmin && (
        <Box
          bg="white"
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          p={{ base: 4, md: 6 }}
          shadow="sm"
          mb={6}
        >
          <Heading size={{ base: "md", md: "lg" }} mb={4} dir="rtl">
            {t.ui.adminPanel}
          </Heading>
          <Center>
            <Button onClick={() => push("/profile/admin")} colorScheme="blue">
              {t.ui.redirectToAdmin}
            </Button>
          </Center>
        </Box>
      )}
      <Box
        bg="white"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
        p={{ base: 4, md: 6 }}
        shadow="sm"
      >
        <Heading size={{ base: "md", md: "lg" }} mb={4} dir="rtl" pb={2}>
          {t.ui.profile}
        </Heading>
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
                  {isLoading ? <Spinner /> : <Text>{t.ui.save}</Text>}
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
                  {t.ui.edit}
                </Button>
              )}
            </TableCaption>
            <Tbody>
              <Tr>
                <Td p={{ base: "8px", md: "16px" }}>{t.ui.firstName}:</Td>
                <Td
                  w={hydrated ? "unset" : "50%"}
                  p={{ base: "8px", md: "16px" }}
                >
                  {hydrated ? (
                    <>
                      <Input
                        disabled={!isEditing}
                        {...register("firstName")}
                        size={{ base: "sm", md: "md" }}
                        fontSize={{ base: "small", md: "md" }}
                        textAlign={"center"}
                        style={inputDisabledStyle}
                      />
                      {errors.firstName && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.firstName.message}
                        </Text>
                      )}
                    </>
                  ) : (
                    <Placeholder />
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td p={{ base: "8px", md: "16px" }}>{t.ui.lastName}:</Td>
                <Td
                  w={hydrated ? "unset" : "50%"}
                  p={{ base: "8px", md: "16px" }}
                >
                  {hydrated ? (
                    <>
                      <Input
                        disabled={!isEditing}
                        {...register("lastName")}
                        size={{ base: "sm", md: "md" }}
                        fontSize={{ base: "small", md: "md" }}
                        textAlign={"center"}
                        style={inputDisabledStyle}
                      />
                      {errors.lastName && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.lastName.message}
                        </Text>
                      )}
                    </>
                  ) : (
                    <Placeholder />
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td p={{ base: "8px", md: "16px" }}>{t.ui.email}:</Td>
                <Td
                  w={hydrated ? "unset" : "50%"}
                  p={{ base: "8px", md: "16px" }}
                >
                  {hydrated ? (
                    <>
                      <Input
                        disabled={!isEditing}
                        {...register("email")}
                        size={{ base: "sm", md: "md" }}
                        fontSize={{ base: "small", md: "md" }}
                        textAlign={"center"}
                        style={inputDisabledStyle}
                      />
                      {errors.email && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.email.message}
                        </Text>
                      )}
                    </>
                  ) : (
                    <Placeholder />
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </PanelTableContainer>
      </Box>
    </PanelContainer>
  );
}

export default ProfileForm;
