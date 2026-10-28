"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateCourse, { CreateCourseType } from "@/schemas/CreateCourse";
import ApiClient from "@/services/ApiClient";
import useLanguageStore from "@/stores/languageStore";
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
    reset,
    formState: { errors },
  } = useForm<CreateCourseType>({
    resolver: zodResolver(CreateCourse),
  });
  const { t } = useLanguageStore();
  const ac = t.ui.adminCourse;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: CreateCourseType) => {
    setIsLoading(true);
    courseCreationApi
      .post({ ...data, link: getExternalUrl(data.link) })
      .then((res) => {
        toast.success(res.data.message || ac.createSuccess);
        reset();
      })
      .catch((error) => {
        toast.error(getErrorMessage(error, ac.createError));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <FormContainer className="my-8">
      <h2 className="font-lalezar text-3xl sm:text-4xl text-white font-normal text-center mb-6">
        {t.ui.createCourse}
      </h2>

      <div className="space-y-4 text-start">
        <div>
          <FormInput
            label={ac.titleLabel}
            register={register("title")}
            placeholder={ac.titlePlaceholder}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-400 font-medium text-start">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            label={ac.descLabel}
            register={register("description")}
            placeholder={ac.descPlaceholder}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-400 font-medium text-start">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            dir="ltr"
            label={t.ui.coursePrice + ":"}
            register={register("price", { valueAsNumber: true })}
            number
            placeholder="3000000"
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-400 font-medium text-start">
              {errors.price.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            dir="ltr"
            label={ac.imgLabel}
            register={register("img")}
            placeholder="data:image/jpeg;base64,..."
          />
          {errors.img && (
            <p className="mt-1 text-xs text-red-400 font-medium text-start">
              {errors.img.message}
            </p>
          )}
        </div>

        <div>
          <FormInput
            dir="ltr"
            label={ac.linkLabel}
            placeholder="https://example.com/course-video.mp4"
            register={register("link")}
          />
          {errors.link && (
            <p className="mt-1 text-xs text-red-400 font-medium text-start">
              {errors.link.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <FormButton
          onClick={handleSubmit(onSubmit)}
          isLoading={isLoading}
          text={ac.submit}
        />
      </div>
    </FormContainer>
  );
}
