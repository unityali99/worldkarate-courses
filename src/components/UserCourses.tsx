"use client";

import PanelContainer from "@/layouts/PanelContainer";
import { CreateCourseType } from "@/schemas/CreateCourse";
import ApiClient from "@/services/ApiClient";
import { getExternalUrl } from "@/utils/externalUrl";
import {
  Alert,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { LuBookOpen, LuExternalLink } from "react-icons/lu";
import { toast } from "react-toastify";
import Placeholder from "./Placeholder";

function UserCourses({ email }: { email?: string }) {
  const [hydrated, setHydrated] = useState(false);
  const [courses, setCourses] = useState<CreateCourseType[]>([]);

  useEffect(() => {
    const endpoint = email
      ? `/admin/fetch-course/${email}`
      : "/user/fetch-course";
    const apiClient = new ApiClient<CreateCourseType[]>(endpoint);
    apiClient
      .get()
      .then((res) => setCourses(res.data))
      .catch((error: AxiosError) =>
        toast.error((error.response?.data as { message: string }).message)
      )
      .finally(() => setHydrated(true));
  }, [email]);

  return (
    <PanelContainer w="full">
      <Stack
        dir="rtl"
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
            w={11}
            h={11}
            rounded="xl"
            bg="whiteAlpha.100"
            color="teal.100"
          >
            <LuBookOpen size={22} />
          </Flex>
          <Box>
            <Heading size="md">دوره‌های خریداری شده</Heading>
            <Text mt={1} color="whiteAlpha.600" fontSize="xs" fontWeight="normal">
              دسترسی سریع به محتوای آموزشی شما
            </Text>
          </Box>
        </Flex>

        {!hydrated ? (
          <Stack spacing={4}>
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </Stack>
        ) : courses.length === 0 ? (
          <Alert
            status="info"
            rounded="xl"
            bg="whiteAlpha.100"
            color="whiteAlpha.800"
            border="1px solid"
            borderColor="whiteAlpha.200"
          >
            <Text mx="auto">دوره‌ای خریداری نشده است</Text>
          </Alert>
        ) : (
          <Stack spacing={3}>
            {courses.map((course, index) => (
              <Flex
                key={`${course.title}-${index}`}
                align={{ base: "stretch", sm: "center" }}
                justify="space-between"
                direction={{ base: "column", sm: "row" }}
                gap={4}
                p={4}
                rounded="xl"
                bg="whiteAlpha.100"
                border="1px solid"
                borderColor="whiteAlpha.200"
                transition="border-color 0.2s ease, background 0.2s ease"
                _hover={{ bg: "whiteAlpha.200", borderColor: "teal.300" }}
              >
                <Text fontWeight="bold">{course.title}</Text>
                {getExternalUrl(course.link) ? (
                  <Link
                    href={getExternalUrl(course.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    _hover={{ textDecoration: "none" }}
                  >
                    <Button
                      w={{ base: "full", sm: "auto" }}
                      size="sm"
                      rounded="lg"
                      colorScheme="teal"
                      rightIcon={<LuExternalLink />}
                    >
                      مشاهده دوره
                    </Button>
                  </Link>
                ) : (
                  <Button
                    w={{ base: "full", sm: "auto" }}
                    size="sm"
                    rounded="lg"
                    isDisabled
                  >
                    لینک موجود نیست
                  </Button>
                )}
              </Flex>
            ))}
          </Stack>
        )}

        <Link href="/courses" _hover={{ textDecoration: "none" }}>
          <Button w="full" variant="outline" colorScheme="teal" rounded="xl">
            مشاهده همه دوره‌ها
          </Button>
        </Link>
      </Stack>
    </PanelContainer>
  );
}

export default UserCourses;
