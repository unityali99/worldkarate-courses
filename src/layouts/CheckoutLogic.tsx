"use client";
import Checkout from "@/components/Checkout";
import PaidOrder from "@/components/Form/PaidOrder";
import { CreateCourseType } from "@/schemas/CreateCourse";
import useAuth from "@/stores/authStore";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

export type ResponseData = {
  courses: CreateCourseType[];
  transaction: { transactionId: String; isPaid: boolean; totalPrice: number };
};

function CheckoutLogic() {
  const [apiRes, setApiRes] = useState<AxiosResponse<ResponseData>>();
  const [hydrated, setHydrated] = useState(false);
  const { user } = useAuth();

  useEffect(() => setHydrated(true), []);
  if (!user && hydrated) {
    window.location.replace("/auth/login");
    return;
  }
  return apiRes?.data.transaction.isPaid ? (
    <PaidOrder hydrated={hydrated} order={apiRes.data} />
  ) : (
    <Checkout hydrated={hydrated} setApiRes={setApiRes} />
  );
}

export default CheckoutLogic;
