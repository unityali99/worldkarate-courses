import React from "react";
import AdminForm from "@/components/Form/AdminForm";
import UserSeachForm from "@/components/Form/UserSeachForm";
import BackgroundImage from "@/layouts/BackgroundImage";

export default function AdminPage() {
  return (
    <BackgroundImage image="/kyuna.webp">
      <div className="min-h-screen px-4 sm:px-6 pt-36 md:pt-48 pb-24 space-y-12">
        <AdminForm />
        <UserSeachForm />
      </div>
    </BackgroundImage>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
