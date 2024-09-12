"use client";
import Checkout from "@/components/Checkout";
import PaidOrder from "@/components/Form/PaidOrder";
import { CreateCourseType } from "@/schemas/CreateCourse";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

export type ResponseData = {
  courses: CreateCourseType[];
  transaction: { transactionId: String; isPaid: boolean; totalPrice: number };
};

function CheckoutLogic() {
  const [apiRes, setApiRes] = useState<AxiosResponse<ResponseData>>();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  return apiRes?.data.transaction.isPaid ? (
    <PaidOrder hydrated={hydrated} order={apiRes.data} />
  ) : (
    <Checkout hydrated={hydrated} setApiRes={setApiRes} />
  );
}

export default CheckoutLogic;
