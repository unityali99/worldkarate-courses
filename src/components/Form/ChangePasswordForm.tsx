"use client";

import PanelContainer from "@/layouts/PanelContainer";
import ResetPassword, { ResetPasswordType } from "@/schemas/auth/ResetPassword";
import ApiClient from "@/services/ApiClient";
import useLanguageStore from "@/stores/languageStore";
import { getErrorMessage } from "@/utils/getErrorMessage";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff, LuKeyRound, LuLockKeyhole } from "react-icons/lu";
import { toast } from "react-toastify";
import Placeholder from "../Placeholder";

function ChangePasswordForm() {
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const { t } = useLanguageStore();

  useEffect(() => setHydrated(true), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPassword),
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const apiClient = new ApiClient<ResetPasswordType>("/reset-password");

  const onSubmit = (data: ResetPasswordType) => {
    setIsLoading(true);
    apiClient
      .put(data)
      .then((res) => {
        toast.success(res.data.message);
        reset();
      })
      .catch((error) => {
        toast.error(getErrorMessage(error, "تغییر رمز عبور با خطا روبه‌رو شد"));
      })
      .finally(() => setIsLoading(false));
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
            color="orange.200"
            flexShrink={0}
          >
            <Icon as={LuLockKeyhole} boxSize={{ base: 5, sm: 6 }} />
          </Flex>
          <Box>
            <Heading size="md">{t.ui.changePassword}</Heading>
            <Text mt={1} color="whiteAlpha.600" fontSize="xs" fontWeight="normal">
              برای امنیت بیشتر، رمز قدرتمندی انتخاب کنید
            </Text>
          </Box>
        </Flex>

        {hydrated ? (
          <Stack spacing={5} flex="1">
            <FormControl isInvalid={Boolean(errors.newPassword)}>
              <FormLabel color="whiteAlpha.700">{t.ui.newPassword}</FormLabel>
              <InputGroup dir="ltr">
                <Input
                  type={showPasswords ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("newPassword")}
                  bg="white"
                  color="gray.900"
                  borderColor="whiteAlpha.300"
                  focusBorderColor="teal.300"
                  rounded="xl"
                  pr={12}
                />
                <InputRightElement>
                  <IconButton
                    type="button"
                    aria-label={showPasswords ? "پنهان کردن رمز" : "نمایش رمز"}
                    icon={showPasswords ? <LuEyeOff /> : <LuEye />}
                    size="sm"
                    variant="ghost"
                    color="gray.600"
                    onClick={() => setShowPasswords((visible) => !visible)}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage mt={2} color="red.300" fontSize="sm">
                {errors.newPassword?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.repeatPassword)}>
              <FormLabel color="whiteAlpha.700">{t.ui.repeatPassword}</FormLabel>
              <InputGroup dir="ltr">
                <Input
                  type={showPasswords ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("repeatPassword")}
                  bg="white"
                  color="gray.900"
                  borderColor="whiteAlpha.300"
                  focusBorderColor="teal.300"
                  rounded="xl"
                  pr={12}
                />
                <InputRightElement>
                  <IconButton
                    type="button"
                    aria-label={showPasswords ? "پنهان کردن رمز" : "نمایش رمز"}
                    icon={showPasswords ? <LuEyeOff /> : <LuEye />}
                    size="sm"
                    variant="ghost"
                    color="gray.600"
                    onClick={() => setShowPasswords((visible) => !visible)}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage mt={2} color="red.300" fontSize="sm">
                {errors.repeatPassword?.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        ) : (
          <Stack spacing={5}>
            <Placeholder />
            <Placeholder />
          </Stack>
        )}

        <Button
          type="submit"
          w="full"
          size="lg"
          rounded="xl"
          colorScheme="green"
          leftIcon={<LuKeyRound />}
          isDisabled={!hydrated || isLoading}
        >
          {isLoading ? <Spinner size="sm" /> : t.ui.save}
        </Button>
      </Stack>
    </PanelContainer>
  );
}

export default ChangePasswordForm;
