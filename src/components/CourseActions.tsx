"use client";

import AddToCartBtn from "@/components/AddToCartBtn";
import DeleteBtn from "@/components/DeleteBtn";
import { CourseType } from "@/schemas/Course";
import useAuth from "@/stores/authStore";
import { Box, Button, Link, Stack } from "@chakra-ui/react";

function CourseActions({ course }: { course: CourseType }) {
  const { user } = useAuth();

  if (user?.isAdmin) {
    return (
      <Stack spacing={3}>
        <DeleteBtn text="حذف دوره" courseId={course.id} />
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
