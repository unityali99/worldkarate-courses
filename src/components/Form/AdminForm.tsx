"use client";
import FormContainer from "@/layouts/FormContainer";
import { Alert, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import FormInput from "./components/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormButton from "./components/FormButton";
import ApiClient from "@/services/ApiClient";
import CreateCourse, { CreateCourseType } from "@/schemas/CreateCourse";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { getExternalUrl } from "@/utils/externalUrl";

const courseCreationApi = new ApiClient<CreateCourseType>("/create-course");

function AdminForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCourseType>({
    resolver: zodResolver(CreateCourse),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: CreateCourseType) => {
    setIsLoading(true);
    courseCreationApi
      .post({ ...data, link: getExternalUrl(data.link) })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error: AxiosError) => {
        const errorData = error.response?.data as
          | { message?: string; error?: string }
          | undefined;
        const errorMessage =
          errorData?.message ||
          errorData?.error ||
          error.message ||
          "خطا در ایجاد دوره";

        toast.error(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <FormContainer>
      <Text className="text-lg md:text-2xl text-right" dir="rtl">
        {"ایجاد دوره"}
      </Text>
      <FormInput dir="rtl" label="عنوان:" register={register("title")} />
      {errors.title && (
        <Alert
          className="rounded-md text-sm md:text-lg"
          textColor={"red"}
          colorScheme="red"
        >
          {errors.title.message}
        </Alert>
      )}
      <FormInput
        dir="rtl"
        label="توضیحات:"
        register={register("description")}
      />
      {errors.description && (
        <Alert
          className="rounded-md text-sm md:text-lg"
          textColor={"red"}
          colorScheme="red"
        >
          {errors.description.message}
        </Alert>
      )}
      <FormInput
        dir="ltr"
        label="قیمت:"
        register={register("price", { valueAsNumber: true })}
        number
        placeholder="3000000"
      />
      {errors.price && (
        <Alert
          className="rounded-md text-sm md:text-lg"
          textColor={"red"}
          colorScheme="red"
        >
          {errors.price.message}
        </Alert>
      )}
      <FormInput dir="ltr" label="تصویر (base64):" register={register("img")} />
      {errors.img && (
        <Alert
          className="rounded-md text-sm md:text-lg"
          textColor={"red"}
          colorScheme="red"
        >
          {errors.img.message}
        </Alert>
      )}
      <FormInput
        dir="ltr"
        label="لینک دوره:"
        placeholder="https://example.com/course"
        register={register("link")}
      />
      {errors.link && (
        <Alert
          className="rounded-md text-sm md:text-lg"
          textColor={"red"}
          colorScheme="red"
        >
          {errors.link.message}
        </Alert>
      )}
      <FormButton
        onClick={handleSubmit(onSubmit)}
        isLoading={isLoading}
        text="ذخیره"
      />
    </FormContainer>
  );
}

export default AdminForm;
