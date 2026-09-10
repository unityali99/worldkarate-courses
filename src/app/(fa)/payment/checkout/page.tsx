import React from "react";
import CheckoutLogic from "@/layouts/CheckoutLogic";
import BackgroundImage from "@/layouts/BackgroundImage";

function CheckoutPage() {
  return (
    <BackgroundImage image="/kyuna.webp">
      <div className="min-h-screen px-4 sm:px-6 pt-36 md:pt-48 pb-24">
        <CheckoutLogic />
      </div>
    </BackgroundImage>
  );
}

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export default CheckoutPage;
