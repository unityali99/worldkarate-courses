"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/stores/cartStore";
import useLanguageStore from "@/stores/languageStore";
import { Button } from "@/components/ui/button";
import { FaShoppingBasket } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { push } = useRouter();
  const { courses, remove, clear, hydrated, setHydrated } = useCart();
  const { t } = useLanguageStore();

  useEffect(() => {
    setHydrated();
  }, [setHydrated]);

  if (!hydrated) {
    return (
      <button
        disabled
        aria-label="Cart"
        className="w-10 h-10 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center opacity-50 cursor-not-allowed"
      >
        <FaShoppingBasket size={18} />
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Cart"
        className="relative w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:border-red-400 hover:bg-white/15 hover:shadow-glow-crimson"
      >
        <FaShoppingBasket size={18} />
        {courses.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center shadow-md">
            {courses.length}
          </span>
        )}
      </button>

      {/* Cart Drawer Backdrop & Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-[1100] flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Content */}
          <div
            dir="rtl"
            className="relative z-10 w-full max-w-md h-full bg-slate-950/95 border-r border-white/15 shadow-2xl backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto text-white animate-in slide-in-from-right duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FaShoppingBasket className="text-red-500 w-5 h-5" />
                <h3 className="font-lalezar text-2xl text-white font-normal">
                  سبد خرید شما
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <MdClose size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 py-6 space-y-4 overflow-y-auto">
              {courses.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-900/60 border border-white/10 mt-10">
                  <p className="text-slate-400 text-sm font-medium">
                    سبد خرید شما در حال حاضر خالی است.
                  </p>
                </div>
              ) : (
                courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <span className="text-sm font-semibold text-slate-100 line-clamp-1">
                      {course.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(String(course.id))}
                      className="text-slate-400 hover:text-red-400 p-1 transition-colors"
                      title="حذف از سبد"
                    >
                      <MdClose size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <Button
                variant="teal"
                size="lg"
                className="w-full font-bold"
                disabled={courses.length === 0}
                onClick={() => {
                  if (courses.length === 0) return toast.error(t.ui.emptyCart);
                  push("/payment/checkout");
                  setIsOpen(false);
                }}
              >
                {t.ui.payment}
              </Button>
              <Button
                variant="danger"
                size="default"
                className="w-full text-xs"
                disabled={courses.length === 0}
                onClick={clear}
              >
                {t.ui.clear}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
