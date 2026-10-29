import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import JsonLd from "@/components/seo/JsonLd";
import { personSchema } from "@/lib/seo/schema";
import { buildHomeMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildHomeMetadata("en");

export default function EnglishHomePage() {
  return (
    <>
      <JsonLd data={personSchema("en")} />
      <LandingPage locale="en" />
    </>
  );
}
