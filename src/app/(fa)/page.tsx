import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import JsonLd from "@/components/seo/JsonLd";
import { personSchema } from "@/lib/seo/schema";
import { buildHomeMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildHomeMetadata("fa");

export default function PersianHomePage() {
  return (
    <>
      <JsonLd data={personSchema("fa")} />
      <LandingPage locale="fa" />
    </>
  );
}
