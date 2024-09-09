"use client";
import FormContainer from "@/layouts/FormContainer";
import { Text } from "@chakra-ui/react";
import React, { useState } from "react";
import FormInput from "./components/FormInput";
import { useForm } from "react-hook-form";
import { CourseType } from "@/schemas/Course";
import { zodResolver } from "@hookform/resolvers/zod";
import FormButton from "./components/FormButton";
import ApiClient from "@/services/ApiClient";
import CreateCourse, { CreateCourseType } from "@/schemas/CreateCourse";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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
      .post(data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error: AxiosError) =>
        toast.error((error.response?.data as { message: string }).message)
      )
      .finally(() => setIsLoading(false));
  };
  return (
    <FormContainer>
      <Text className="text-lg md:text-2xl text-right" dir="rtl">
        {"ایجاد دوره"}
      </Text>
      <FormInput dir="rtl" label="عنوان:" register={register("title")} />
      <FormInput
        dir="rtl"
        label="توضیحات:"
        register={register("description")}
      />
      <FormInput
        dir="ltr"
        label="قیمت:"
        register={register("price", { valueAsNumber: true })}
        number
        placeholder="3000000"
      />
      <FormInput dir="ltr" label="تصویر (base64):" register={register("img")} />
      <FormInput dir="ltr" label="لینک دوره:" register={register("link")} />
      <FormButton
        onClick={handleSubmit(onSubmit)}
        isLoading={isLoading}
        text="ذخیره"
      />
    </FormContainer>
  );
}

export default AdminForm;
