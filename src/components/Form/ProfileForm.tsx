"use client";

import PanelContainer from "@/layouts/PanelContainer";
import Profile, { ProfileType } from "@/schemas/auth/Profile";
import ApiClient from "@/services/ApiClient";
import useAuth from "@/stores/authStore";
import useLanguageStore from "@/stores/languageStore";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuPencil, LuShieldCheck, LuUserRound } from "react-icons/lu";
import { toast } from "react-toastify";
import Placeholder from "../Placeholder";

function ProfileForm({ isAdmin }: { isAdmin: boolean }) {
  const { user, login } = useAuth();
  const { t } = useLanguageStore();
  const [isEditing, setIsEditing] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { push, refresh } = useRouter();

  useEffect(() => setHydrated(true), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileType>({
    resolver: zodResolver(Profile),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }
      : undefined,
  });

  const apiClient = new ApiClient<ProfileType>("/profile");

  const cancelEditing = () => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
    setIsEditing(false);
  };

  const onSubmit = (data: ProfileType) => {
    setIsLoading(true);
    apiClient
      .put(data)
      .then((res) => {
        toast.success(res.data.message);
        login(data);
        reset(data);
        setIsEditing(false);
        refresh();
      })
      .catch((error: AxiosError) => {
        const message = (error.response?.data as { message?: string })?.message;
        toast.error(message || "ویرایش اطلاعات با خطا روبه‌رو شد");
      })
      .finally(() => setIsLoading(false));
  };

  const inputStyles = {
    bg: isEditing ? "white" : "whiteAlpha.100",
    color: isEditing ? "gray.900" : "white",
    borderColor: isEditing ? "teal.300" : "whiteAlpha.200",
    opacity: 1,
    cursor: isEditing ? "text" : "default",
  };

  return (
    <PanelContainer w="full" h="full">
      <Stack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        dir="rtl"
        h="full"
        spacing={6}
        p={{ base: 6, md: 8 }}
        rounded={{ base: "2xl", md: "3xl" }}
        color="white"
        bg="rgba(13, 22, 27, 0.76)"
        border="1px solid"
        borderColor="whiteAlpha.200"
        backdropFilter="blur(12px)"
        shadow="0 14px 38px rgba(0, 0, 0, 0.2)"
      >
        <Flex align="center" gap={3}>
          <Flex
            align="center"
            justify="center"
            boxSize={{ base: 10, sm: 11 }}
            rounded="xl"
            bg="whiteAlpha.100"
            color="teal.100"
            flexShrink={0}
          >
            <Icon as={LuUserRound} boxSize={{ base: 5, sm: 6 }} />
          </Flex>
          <Box>
            <Heading size="md">{t.ui.profile}</Heading>
            <Text mt={1} color="whiteAlpha.600" fontSize="xs" fontWeight="normal">
              اطلاعات حساب کاربری شما
            </Text>
          </Box>
        </Flex>

        {isAdmin && (
          <Flex
            align={{ base: "stretch", sm: "center" }}
            justify="space-between"
            direction={{ base: "column", sm: "row" }}
            gap={3}
            p={4}
            rounded="xl"
            bg="rgba(56, 178, 172, 0.12)"
            border="1px solid"
            borderColor="rgba(129, 230, 217, 0.25)"
          >
            <Flex align="center" gap={2} color="teal.100">
              <Icon as={LuShieldCheck} boxSize={5} flexShrink={0} />
              <Text>{t.ui.adminPanel}</Text>
            </Flex>
            <Button
              type="button"
              size="sm"
              colorScheme="teal"
              onClick={() => push("/profile/admin")}
            >
              {t.ui.redirectToAdmin}
            </Button>
          </Flex>
        )}

        {hydrated ? (
          <Stack spacing={4} flex="1">
            <FormControl isInvalid={Boolean(errors.firstName)}>
              <FormLabel color="whiteAlpha.700">{t.ui.firstName}</FormLabel>
              <Input
                disabled={!isEditing}
                {...register("firstName")}
                textAlign="right"
                rounded="xl"
                {...inputStyles}
              />
              <FormErrorMessage mt={2} color="red.300" fontSize="sm">
                {errors.firstName?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.lastName)}>
              <FormLabel color="whiteAlpha.700">{t.ui.lastName}</FormLabel>
              <Input
                disabled={!isEditing}
                {...register("lastName")}
                textAlign="right"
                rounded="xl"
                {...inputStyles}
              />
              <FormErrorMessage mt={2} color="red.300" fontSize="sm">
                {errors.lastName?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel color="whiteAlpha.700">{t.ui.email}</FormLabel>
              <Input
                disabled={!isEditing}
                {...register("email")}
                dir="ltr"
                textAlign="left"
                rounded="xl"
                {...inputStyles}
              />
              <FormErrorMessage mt={2} color="red.300" fontSize="sm">
                {errors.email?.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        ) : (
          <Stack spacing={5}>
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </Stack>
        )}

        {isEditing ? (
          <Flex direction={{ base: "column", sm: "row" }} gap={3}>
            <Button
              type="submit"
              flex="1"
              size="lg"
              rounded="xl"
              colorScheme="teal"
              isDisabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : t.ui.save}
            </Button>
            <Button
              type="button"
              flex="1"
              size="lg"
              rounded="xl"
              variant="outline"
              colorScheme="whiteAlpha"
              onClick={cancelEditing}
              isDisabled={isLoading}
            >
              {t.ui.cancel}
            </Button>
          </Flex>
        ) : (
          <Button
            type="button"
            w="full"
            size="lg"
            rounded="xl"
            colorScheme="orange"
            leftIcon={<LuPencil />}
            onClick={() => setIsEditing(true)}
            isDisabled={!hydrated}
          >
            {t.ui.edit}
          </Button>
        )}
      </Stack>
    </PanelContainer>
  );
}

export default ProfileForm;
