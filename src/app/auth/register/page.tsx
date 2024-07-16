import FormButton from "@/components/Form/FormButton";
import FormFooter from "@/components/Form/FormFooter";
import FormInput from "@/components/Form/FormInput";
import FormContainer from "@/layouts/FormContainer";
import { Text } from "@chakra-ui/react";
import React from "react";

function page() {
  return (
    <FormContainer>
      <Text className="font-bold text-xl my-5">ورود به پنل کاربری</Text>
      <FormInput label="نام" placeholder="" />
      <FormInput label="نام خانوادگی" placeholder="" />
      <FormInput label="ایمیل" placeholder="Example@gmail.com" />
      <FormInput label="رمز عبور" placeholder="Password" />
      <FormButton text="ثبت نام" />
      <FormFooter
        text="ثبت نام کرده اید؟"
        linkText="ورود"
        href="/auth/forget-password"
      />
    </FormContainer>
  );
}

export default page;
