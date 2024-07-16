import FormButton from "@/components/Form/FormButton";
import FormFooter from "@/components/Form/FormFooter";
import FormInput from "@/components/Form/FormInput";
import FormContainer from "@/layouts/FormContainer";
import { Text } from "@chakra-ui/react";
import React from "react";

function ForgetPasswordPage() {
  return (
    <FormContainer>
      <Text className="font-bold text-xl my-5">ریست رمز عبور</Text>
      <FormInput label="ایمیل:" placeholder="Email@example.com" />
      <FormButton text="ارسال" />
      <FormFooter
        text="ثبت نام نکرده اید؟"
        linkText="ثبت نام"
        href="/aut/register"
      />
    </FormContainer>
  );
}

export default ForgetPasswordPage;
