"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateCourse, { CreateCourseType } from "@/schemas/CreateCourse";
import ApiClient from "@/services/ApiClient";
import { getExternalUrl } from "@/utils/externalUrl";
import { getErrorMessage } from "@/utils/getErrorMessage";
import FormContainer from "@/layouts/FormContainer";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";
import { toast } from "react-toastify";

const courseCreationApi = new ApiClient<CreateCourseType>("/create-course");

export default function AdminForm() {
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
      .catch((error) => {
        toast.error(getErrorMessage(error, "خطا در ایجاد دوره"));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <FormContainer className="my-8">
      <h2 className="font-lalezar text-3xl sm:text-4xl text-white font-normal text-center mb-6">
        ایجاد دوره جدید
      </h2>

      <div className="space-y-4 text-right">
        <div>
          <FormInput dir="rtl" label="عنوان دوره:" register={register("title")} placeholder="مثال: آموزش کاتا کانکودای" />
          {errors.title && (
            <p className="mt-1 text-xs text-red-400 font-medium text-right">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            dir="rtl"
            label="توضیحات دوره:"
            register={register("description")}
            placeholder="توضیحات جامع و سرفصل‌ها..."
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-400 font-medium text-right">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            dir="ltr"
            label="قیمت (تومان):"
            register={register("price", { valueAsNumber: true })}
            number
            placeholder="3000000"
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-400 font-medium text-right">
              {errors.price.message}
            </p>
          )}
        </div>

        <div>
          <FormInput dir="ltr" label="تصویر (base64 یا URL):" register={register("img")} placeholder="data:image/jpeg;base64,..." />
          {errors.img && (
            <p className="mt-1 text-xs text-red-400 font-medium text-right">
              {errors.img.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            dir="ltr"
            label="لینک دانلود ویدیو دوره:"
            placeholder="https://example.com/course-video.mp4"
            register={register("link")}
          />
          {errors.link && (
            <p className="mt-1 text-xs text-red-400 font-medium text-right">
              {errors.link.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <FormButton
          onClick={handleSubmit(onSubmit)}
          isLoading={isLoading}
          text="ذخیره و انتشار دوره"
        />
      </div>
    </FormContainer>
  );
}
