import React from "react";
import Link from "next/link";
import { ResponseData } from "@/layouts/CheckoutLogic";
import PanelContainer from "@/layouts/PanelContainer";
import PanelTableContainer from "@/layouts/PanelTableContainer";
import { getExternalUrl } from "@/utils/externalUrl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Placeholder from "../Placeholder";
import { LuDownload, LuArrowLeft } from "react-icons/lu";
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5";

export default function PaidOrder({
  order,
  hydrated,
}: {
  order: ResponseData;
  hydrated: boolean;
}) {
  return (
    <PanelContainer>
      <div className="space-y-6" dir="rtl">
        <div className="flex items-center justify-between pb-2">
          <h3 className="font-lalezar text-2xl text-white font-normal">
            {`شماره سفارش: #${order.transaction.transactionId}`}
          </h3>
          {order.transaction.isPaid ? (
            <Badge variant="teal" className="gap-1.5 py-1.5 px-3.5 text-xs font-bold">
              <IoCheckmarkCircleOutline className="w-4 h-4" />
              <span>پرداخت موفق</span>
            </Badge>
          ) : (
            <Badge variant="crimson" className="gap-1.5 py-1.5 px-3.5 text-xs font-bold">
              <IoCloseCircleOutline className="w-4 h-4" />
              <span>پرداخت ناموفق</span>
            </Badge>
          )}
        </div>

        <PanelTableContainer>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-xs sm:text-sm">
                <th className="py-3 px-4 font-semibold">عنوان دوره</th>
                <th className="py-3 px-4 font-semibold text-center">لینک دسترسی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {hydrated ? (
                order.courses.map((c, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-medium text-slate-100">{c.title}</td>
                    <td className="py-4 px-4 text-center">
                      {getExternalUrl(c.link) ? (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={getExternalUrl(c.link)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30 text-xs font-bold transition-all"
                        >
                          <LuDownload className="w-3.5 h-3.5" />
                          <span>دانلود ویدیو</span>
                        </a>
                      ) : (
                        <span className="text-xs text-slate-500">لینک موجود نیست</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                [0, 1].map((v, i) => (
                  <tr key={i}>
                    <td className="py-4 px-4">
                      <Placeholder />
                    </td>
                    <td className="py-4 px-4">
                      <Placeholder />
                    </td>
                  </tr>
                ))
              )}
              <tr className="bg-white/5 font-bold">
                <td className="py-4 px-4 text-slate-200">مجموع پرداختی:</td>
                <td className="py-4 px-4 text-center text-emerald-400">
                  {order.transaction.totalPrice.toLocaleString("fa-IR")} تومان
                </td>
              </tr>
            </tbody>
          </table>

          <div className="pt-6 text-center">
            <Link href="/" className="inline-block">
              <Button variant="outline" size="lg" className="gap-2">
                <span>بازگشت به صفحه اصلی</span>
                <LuArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </PanelTableContainer>
      </div>
    </PanelContainer>
  );
}
