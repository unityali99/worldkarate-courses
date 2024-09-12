"use client";
import FormContainer from "@/layouts/FormContainer";
import React, { useState } from "react";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  default as SearchUser,
  ForgetPasswordType as SearchUserType,
} from "@/schemas/auth/ForgetPassword";
import ApiClient from "@/services/ApiClient";
import { CreateCourseType } from "@/schemas/CreateCourse";
import { Box } from "@chakra-ui/react";
import UserCourses from "../UserCourses";

const apiClient = new ApiClient<CreateCourseType>("");

function UserSeachForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<SearchUserType>({
    resolver: zodResolver(SearchUser),
  });

  const [email, setEmail] = useState("");

  const onSubmit = ({ email }: SearchUserType) => setEmail(email);
  return (
    <Box className="space-y-10">
      <FormContainer>
        <FormInput
          dir="ltr"
          register={register("email")}
          label="ایمیل"
          placeholder="example@email.com"
        />
        <FormButton
          onClick={handleSubmit(onSubmit)}
          isLoading={false}
          text="جستجو"
        />
      </FormContainer>
      {email && <UserCourses email={email} />}
    </Box>
  );
}

export default UserSeachForm;
