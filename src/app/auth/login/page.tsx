import FormButton from "@/components/Form/FormButton";
import FormFooter from "@/components/Form/FormFooter";
import FormInput from "@/components/Form/FormInput";
import FormContainer from "@/layouts/FormContainer";
import { Text } from "@chakra-ui/react";
import React from "react";

function LoginPage() {
  return (
    <FormContainer>
      <Text className="font-bold text-xl my-5">ورود به پنل کاربری</Text>
      <FormInput label="ایمیل:" placeholder="Email@example.com" />
      <FormInput label="رمز عبور:" placeholder="Password" />
      <FormButton text="ورود" />
      <FormFooter
        text="رمز خود را فراموش کرده اید؟"
        linkText="ریست رمز"
        href="/forget-password"
      />
    </FormContainer>
  );
}

export default LoginPage;
