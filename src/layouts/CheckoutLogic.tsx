"use client";
import Checkout from "@/components/Checkout";
import { CreateCourseType } from "@/schemas/CreateCourse";
import useAuth from "@/stores/authStore";
import React, { useEffect, useState } from "react";

export type ResponseData = {
  courses: CreateCourseType[];
  transaction: { transactionId: string; isPaid: boolean; totalPrice: number };
};

function CheckoutLogic() {
  const [hydrated, setHydrated] = useState(false);
  const { user } = useAuth();

  useEffect(() => setHydrated(true), []);
  return <Checkout hydrated={hydrated} />;
}

export default CheckoutLogic;
