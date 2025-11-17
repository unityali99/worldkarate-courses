"use client";
import PanelContainer from "@/layouts/PanelContainer";
import PanelTableContainer from "@/layouts/PanelTableContainer";
import { CreateCourseType } from "@/schemas/CreateCourse";
import {
  Alert,
  Box,
  Button,
  Heading,
  Link,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Placeholder from "./Placeholder";
import ApiClient from "@/services/ApiClient";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

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
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error: AxiosError) =>
        toast.error((error.response?.data as { message: string }).message)
      )
      .finally(() => setHydrated(true));
  }, [email]);

  if (hydrated && courses.length === 0)
    return (
      <PanelContainer>
        <Box
          bg="white"
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          p={{ base: 4, md: 6 }}
          shadow="sm"
        >
          <Heading size={{ base: "md", md: "lg" }} mb={4} dir="rtl" pb={2}>
            {"دوره های خریداری شده"}
          </Heading>
          <Alert colorScheme="red">
            <Text mx={"auto"}>{"دوره ای خریداری نشده است"}</Text>
          </Alert>
        </Box>
      </PanelContainer>
    );

  return (
    <PanelContainer>
      <Box
        bg="white"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
        p={{ base: 4, md: 6 }}
        shadow="sm"
      >
        <Heading size={{ base: "md", md: "lg" }} mb={4} dir="rtl" pb={2}>
          {"دوره های خریداری شده"}
        </Heading>
        <PanelTableContainer>
          <Table variant="striped" size={{ base: "md", md: "lg" }}>
            <TableCaption>
              <Link href="/">
                <Button
                  w={{ base: "70%", md: "40%" }}
                  size={{ base: "sm", md: "md" }}
                  mx="auto"
                  colorScheme="green"
                >
                  {"بازگشت به صفحه اصلی"}
                </Button>
              </Link>
            </TableCaption>
            <Thead>
              <Tr>
                <Th>{"عنوان"}</Th>
                <Th>{"لینک"}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {hydrated
                ? courses.map((c, i) => (
                    <Tr key={i}>
                      <Td p={{ base: "0", md: "25px" }}>{c.title}</Td>
                      <Td p={{ base: "0", md: "25px" }}>
                        <Link target="_blank" href={c.link}>
                          <Text className="text-blue-700">{"دانلود"}</Text>
                        </Link>
                      </Td>
                    </Tr>
                  ))
                : [0, 1, 2].map((v, i) => (
                    <Tr key={i}>
                      <Td>
                        <Placeholder />
                      </Td>
                      <Td>
                        <Placeholder />
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
          </Table>
        </PanelTableContainer>
      </Box>
    </PanelContainer>
  );
}

export default UserCourses;
