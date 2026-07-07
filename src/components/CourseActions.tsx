"use client";

import AddToCartBtn from "@/components/AddToCartBtn";
import DeleteBtn from "@/components/DeleteBtn";
import { CourseType } from "@/schemas/Course";
import useAuth from "@/stores/authStore";
import { Box, Button, Link, Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function CourseActions({ course }: { course: CourseType }) {
  const { user } = useAuth();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  if (!hydrated) return <Spinner size="xl" color="teal.200" />;

  if (user?.isAdmin) {
    return (
      <Stack spacing={3}>
        <DeleteBtn text="حذف دوره" courseId={String(course.id)} />
        <Link href="/profile/admin" _hover={{ textDecoration: "none" }}>
          <Button w="full" size="lg" rounded="xl" colorScheme="teal">
            ایجاد دوره جدید
          </Button>
        </Link>
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        "& > button": {
          width: "100%",
          minHeight: "48px",
          borderRadius: "12px",
        },
      }}
    >
      <AddToCartBtn course={course} />
    </Box>
  );
}

export default CourseActions;
