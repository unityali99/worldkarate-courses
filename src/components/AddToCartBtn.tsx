"use client";
import { CourseType } from "@/schemas/Course";
import ApiClient from "@/services/ApiClient";
import useCart from "@/stores/cartStore";
import { Alert, Box, Button, Link, Spinner } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const apiClient = new ApiClient<CourseType[]>("/user/fetch-course");

function AddToCartBtn({ course }: { course: CourseType }) {
  const { add } = useCart();
  const [hydrated, setHydrated] = useState(false);
  const [userCourses, setUserCourses] = useState<CourseType[]>([]);
  useEffect(() => {
    apiClient
      .get()
      .then((res) => setUserCourses(res.data))
      .catch((error: AxiosError) =>
        toast.error((error.response?.data as { message: string }).message)
      )
      .finally(() => setHydrated(true));
  }, []);

  if (!hydrated) return <Spinner size={"xl"} />;

  if (userCourses.find((c) => c.id === course.id))
    return (
      <Box className="space-y-5">
        <Alert colorScheme="teal" className="rounded-lg">
          {"شما این دوره را خریداری نموده اید"}
        </Alert>
        <Link className="block" href="/profile">
          <Button colorScheme="red">{"مشاهده دوره"}</Button>
        </Link>
      </Box>
    );
  return (
    <Button onClick={() => add(course)} colorScheme="red">
      {"افزودن به سبد خرید"}
    </Button>
  );
}

export default AddToCartBtn;
