"use client";

import React, { useState } from "react";
import FormContainer from "@/layouts/FormContainer";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  default as SearchUser,
  ForgetPasswordType as SearchUserType,
} from "@/schemas/auth/ForgetPassword";
import UserCourses from "../UserCourses";

export default function UserSeachForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchUserType>({
    resolver: zodResolver(SearchUser),
  });

  const [email, setEmail] = useState("");

  const onSubmit = ({ email }: SearchUserType) => setEmail(email);
  return (
    <div className="space-y-10">
      <FormContainer>
        <h2 className="font-lalezar text-2xl sm:text-3xl text-white font-normal text-center mb-6">
          جستجوی دوره‌های کاربر
        </h2>
        <div className="space-y-4">
          <div>
            <FormInput
              dir="ltr"
              register={register("email")}
              label="ایمیل کاربر:"
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400 font-medium text-right">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="pt-2">
          <FormButton
            onClick={handleSubmit(onSubmit)}
            isLoading={false}
            text="جستجو"
          />
        </div>
      </FormContainer>
      {email && <UserCourses email={email} />}
    </div>
  );
}
