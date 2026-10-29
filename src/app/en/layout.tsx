import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/layouts/Providers";
import { iranSans, lalezar } from "@/app/fonts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import SiteSchema from "@/components/seo/SiteSchema";
import { buildRootMetadata } from "@/lib/seo/metadata";

// Site-wide defaults only (metadataBase, title template, fallback description).
// Canonical / hreflang / OpenGraph URL are per-page facts and come from
// `buildMetadata` in each page, never from this layout.
export const metadata: Metadata = buildRootMetadata("en");

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <body
        className={`${iranSans.variable} ${lalezar.variable} font-sans min-h-screen flex flex-col bg-[#070c0e] text-white selection:bg-red-500 selection:text-white`}
      >
        <SiteSchema locale="en" />
        <Providers locale="en">
          <Navbar locale="en" />
          <main className="flex-1 w-full flex flex-col pb-24 md:pb-0">
            {children}
          </main>
          <Footer locale="en" />
          <MobileBottomNav locale="en" />
          <ToastContainer
            className="text-left font-sans"
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Providers>
      </body>
    </html>
  );
}
