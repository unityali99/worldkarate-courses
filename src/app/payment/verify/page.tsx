"use client";
import PanelContainer from "@/layouts/PanelContainer";
import { Alert, Box, Button, Spinner, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import httpService from "@/services/httpService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import PaidOrder from "@/components/Form/PaidOrder";
import { ResponseData } from "@/layouts/CheckoutLogic";

function VerifyContent() {
  const searchParams = useSearchParams();
  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  const [verifying, setVerifying] = useState(true);
  const [order, setOrder] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!authority || !status) {
      setError("پارامترهای لازم برای تایید پرداخت یافت نشد");
      setVerifying(false);
      return;
    }

    if (status !== "OK") {
      setError("پرداخت ناموفق بود");
      setVerifying(false);
      return;
    }

    // Send authority to backend for verification
    httpService
      .post("/payment/verify", { authority })
      .then((res) => {
        setOrder(res.data);
        toast.success(res.data.message || "پرداخت با موفقیت انجام شد");
      })
      .catch((error: AxiosError) => {
        const errorMessage =
          (error.response?.data as { message: string })?.message ||
          "خطا در تایید پرداخت";
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => setVerifying(false));
  }, [authority, status]);

  if (!hydrated) {
    return (
      <PanelContainer>
        <Box className="flex justify-center items-center min-h-[400px]">
          <Spinner size="xl" />
        </Box>
      </PanelContainer>
    );
  }

  if (verifying) {
    return (
      <PanelContainer>
        <Box className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
          <Spinner size="xl" />
          <Text className="text-lg" dir="rtl">
            در حال تایید پرداخت...
          </Text>
        </Box>
      </PanelContainer>
    );
  }

  if (error) {
    return (
      <PanelContainer>
        <Box className="w-10/12 md:w-6/12 mx-auto">
          <Alert colorScheme="red" className="rounded-lg mb-4">
            <Text mx="auto" className="text-center" dir="rtl">
              {error}
            </Text>
          </Alert>
          <Button
            colorScheme="blue"
            onClick={() => (window.location.href = "/profile")}
            className="w-full"
          >
            رفتن به دوره های خریداری شده
          </Button>
        </Box>
      </PanelContainer>
    );
  }

  if (order) {
    return <PaidOrder order={order} hydrated={hydrated} />;
  }

  return null;
}

function VerifyPage() {
  return (
    <Suspense
      fallback={
        <PanelContainer>
          <Box className="flex justify-center items-center min-h-[400px]">
            <Spinner size="xl" />
          </Box>
        </PanelContainer>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export default VerifyPage;
