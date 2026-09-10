"use client";

import React, { useState } from "react";
import PanelContainer from "@/layouts/PanelContainer";
import PanelTableContainer from "@/layouts/PanelTableContainer";
import useCart from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import Placeholder from "./Placeholder";
import ApiClient from "@/services/ApiClient";
import useLanguageStore from "@/stores/languageStore";
import { PaymentType } from "@/schemas/Payment";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { LuCreditCard } from "react-icons/lu";

export default function Checkout({ hydrated }: { hydrated: boolean }) {
  const { courses } = useCart();
  const { t, currentLanguage } = useLanguageStore();
  const isRtl = currentLanguage === "fa";
  const [isLoading, setIsLoading] = useState(false);

  const apiClient = new ApiClient<PaymentType>("/payment/checkout");

  const totalPrice = courses.reduce(
    (accumulator, currentVal) => accumulator + currentVal.price,
    0
  );

  const onClick = () => {
    setIsLoading(true);
    const courseIds = courses.map((c) => c.id.toString());
    apiClient
      .post({ courseIds })
      .then((res) => {
        toast.success(res.data.message);
        window.location.href = res.data.paymentUrl;
      })
      .catch((error) =>
        toast.error(getErrorMessage(error, "خطا در شروع پرداخت"))
      )
      .finally(() => setIsLoading(false));
  };

  if (hydrated && courses.length === 0) {
    return (
      <div className="w-11/12 sm:w-8/12 md:w-6/12 mx-auto text-center" dir={isRtl ? "rtl" : "ltr"}>
        <div className="p-8 rounded-3xl bg-slate-950/80 border border-white/15 backdrop-blur-xl text-slate-300">
          <p className="text-base font-semibold">{t.ui.noCoursesInCart}</p>
        </div>
      </div>
    );
  }

  return (
    <PanelContainer>
      <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
        <h2 className="font-lalezar text-3xl text-white font-normal">
          {t.ui.checkout}
        </h2>

        <PanelTableContainer>
          <table className={`w-full ${isRtl ? "text-right" : "text-left"} border-collapse`}>
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xs sm:text-sm">
                <th className="py-3 px-4 font-semibold">{t.ui.courseTitle}</th>
                <th className="py-3 px-4 font-semibold text-center">{t.ui.coursePrice}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {hydrated
                ? courses.map((c, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-medium text-slate-100">{c.title}</td>
                      <td className="py-4 px-4 text-center font-bold text-slate-200">
                        {c.price.toLocaleString(isRtl ? "fa-IR" : "en-US")}
                      </td>
                    </tr>
                  ))
                : [0, 1].map((v, i) => (
                    <tr key={i}>
                      <td className="py-4 px-4">
                        <Placeholder />
                      </td>
                      <td className="py-4 px-4">
                        <Placeholder />
                      </td>
                    </tr>
                  ))}
              <tr className="bg-white/5 font-bold text-base">
                <td className="py-4 px-4 text-white">{t.ui.totalPayable}</td>
                <td className="py-4 px-4 text-center text-emerald-400 font-extrabold text-lg">
                  {hydrated ? `${totalPrice.toLocaleString(isRtl ? "fa-IR" : "en-US")}${t.ui.currency}` : <Placeholder />}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="pt-8 text-center">
            <Button
              variant="teal"
              size="lg"
              className="w-full sm:w-7/12 mx-auto gap-2 font-bold shadow-lg"
              isLoading={isLoading}
              onClick={onClick}
            >
              <LuCreditCard className="w-5 h-5 ml-1" />
              <span>{t.ui.checkoutOnline}</span>
            </Button>
          </div>
        </PanelTableContainer>
      </div>
    </PanelContainer>
  );
}
