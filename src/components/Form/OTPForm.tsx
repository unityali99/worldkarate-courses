import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import OTP, { OTPType } from "@/schemas/auth/OTP";
import ApiClient from "@/services/ApiClient";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import FormContainer from "@/layouts/FormContainer";
import { Alert, Text } from "@chakra-ui/react";
import FormInput from "./components/FormInput";
import FormButton from "./components/FormButton";

function OTPForm({
  setIsOtpValid,
  email,
}: {
  setIsOtpValid: (isValid: boolean) => void;
  email: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OTPType>({ resolver: zodResolver(OTP) });

  const apiClient = new ApiClient<OTPType>("/validate-otp");
  const [isLoading, setIsLoading] = useState(false);

  setValue("email", email);

  const onSubmit = (data: OTPType) => {
    setIsLoading(true);
    apiClient
      .post(data)
      .then((res) => {
        toast.success(res.data.message);
        setIsOtpValid(true);
      })
      .catch((error: AxiosError) =>
        toast.error((error.response?.data as { message: string })?.message)
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <FormContainer>
      <Text className="font-bold text-xl my-5">
        {"لطفا کد ارسال شده را وارد نمایید"}
      </Text>
      <FormInput
        className="text-center"
        number
        dir="ltr"
        register={register("OTP", { valueAsNumber: true })}
        label="کد یکبار مصرف:"
      />
      {errors.OTP && (
        <Alert
          className="rounded-md text-sm"
          textColor={"red"}
          colorScheme="red"
        >
          {errors.OTP.message}
        </Alert>
      )}
      <FormButton
        onClick={handleSubmit(onSubmit)}
        text="تایید"
        isLoading={isLoading}
      />
    </FormContainer>
  );
}

export default OTPForm;
