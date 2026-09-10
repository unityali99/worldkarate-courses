"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PanelContainer from "@/layouts/PanelContainer";
import BackgroundImage from "@/layouts/BackgroundImage";
import { Button } from "@/components/ui/button";
import httpService from "@/services/httpService";
import { toast } from "react-toastify";
import PaidOrder from "@/components/Form/PaidOrder";
import { ResponseData } from "@/layouts/CheckoutLogic";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { LuRefreshCw } from "react-icons/lu";

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
      setError("پرداخت توسط کاربر لغو شد یا ناموفق بود.");
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
      .catch((error) => {
        const errorMessage = getErrorMessage(error, "خطا در تایید پرداخت");
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => setVerifying(false));
  }, [authority, status]);

  if (!hydrated || verifying) {
    return (
      <PanelContainer>
        <div className="flex flex-col justify-center items-center min-h-[350px] space-y-4 text-white" dir="rtl">
          <div className="w-12 h-12 rounded-full border-4 border-teal-400 border-t-transparent animate-spin" />
          <p className="text-base sm:text-lg font-medium text-slate-300">
            در حال تایید پرداخت و صدور دسترسی دوره‌ها...
          </p>
        </div>
      </PanelContainer>
    );
  }

  if (error) {
    return (
      <PanelContainer>
        <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-slate-950/80 border border-white/15 backdrop-blur-xl shadow-glass text-center space-y-6 text-white" dir="rtl">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-red-500/15 text-red-400 border border-red-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <LuRefreshCw className="w-7 h-7" />
          </div>
          <h3 className="font-lalezar text-2xl text-white font-normal">خطا در پرداخت</h3>
          <p className="text-sm text-slate-300">{error}</p>
          <Link href="/profile" className="block w-full">
            <Button variant="teal" size="lg" className="w-full font-bold">
              رفتن به دوره‌های خریداری شده
            </Button>
          </Link>
        </div>
      </PanelContainer>
    );
  }

  if (order) {
    return <PaidOrder order={order} hydrated={hydrated} />;
  }

  return null;
}

export default function VerifyPage() {
  return (
    <BackgroundImage image="/kyuna.webp">
      <div className="min-h-screen px-4 sm:px-6 pt-36 md:pt-48 pb-24">
        <Suspense
          fallback={
            <PanelContainer>
              <div className="flex justify-center items-center min-h-[350px]">
                <div className="w-12 h-12 rounded-full border-4 border-teal-400 border-t-transparent animate-spin" />
              </div>
            </PanelContainer>
          }
        >
          <VerifyContent />
        </Suspense>
      </div>
    </BackgroundImage>
  );
}

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
