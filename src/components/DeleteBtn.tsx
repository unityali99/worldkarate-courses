"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ApiClient from "@/services/ApiClient";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { LuTrash2 } from "react-icons/lu";

export default function DeleteBtn({
  text,
  courseId,
}: {
  text: string;
  courseId: string;
}) {
  const courseDeletionApi = new ApiClient(`/delete-course/${courseId}`);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { replace } = useRouter();

  const onClick = () => {
    setIsDeleting(true);
    courseDeletionApi
      .delete()
      .then((res) => {
        toast.success(res.data.message);
        setIsOpen(false);
        replace("/");
      })
      .catch((error) =>
        toast.error(getErrorMessage(error, "خطا در حذف دوره"))
      )
      .finally(() => setIsDeleting(false));
  };

  return (
    <>
      <Button
        variant="danger"
        size="lg"
        onClick={() => setIsOpen(true)}
        className="w-full gap-2 font-bold"
      >
        <LuTrash2 className="w-5 h-5 ml-1" />
        <span>{text}</span>
      </Button>

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => !isDeleting && setIsOpen(false)}
          />
          <div
            dir="rtl"
            className="relative z-10 w-full max-w-md p-6 rounded-3xl bg-slate-950 border border-white/20 shadow-2xl backdrop-blur-2xl text-white space-y-5 animate-in fade-in zoom-in-95 duration-200"
          >
            <h3 className="font-lalezar text-2xl text-white font-normal">
              {text}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              آیا از حذف دائمی این مورد اطمینان دارید؟ این عملیات غیرقابل بازگشت است.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="default"
                disabled={isDeleting}
                onClick={() => setIsOpen(false)}
              >
                انصراف
              </Button>
              <Button
                variant="danger"
                size="default"
                isLoading={isDeleting}
                onClick={onClick}
              >
                حذف قطعی
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
