import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/layouts/Providers";
import { iranSans, lalezar } from "@/app/fonts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lang } from "@/lang";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://worldkarate.ir"
  ),
  title: {
    default: lang.fa.metadata.title,
    template: `%s | ${lang.fa.metadata.title}`,
  },
  description: lang.fa.metadata.description,
  keywords: lang.fa.metadata.keywords,
  alternates: {
    canonical: "/",
    languages: {
      fa: "/",
      "x-default": "/",
      en: "/en",
    },
  },
  openGraph: {
    title: lang.fa.metadata.title,
    description: lang.fa.metadata.description,
    url: "/",
    siteName: "آکادمی کاراته سنسی امیر یاری",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/logo.webp",
        width: 800,
        height: 800,
        alt: lang.fa.metadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: lang.fa.metadata.title,
    description: lang.fa.metadata.description,
    images: ["/logo.webp"],
  },
};

export default function PersianLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <body
        className={`${iranSans.variable} ${lalezar.variable} font-sans min-h-screen flex flex-col bg-[#070c0e] text-white selection:bg-red-500 selection:text-white`}
      >
        <Providers locale="fa">
          <Navbar locale="fa" />
          <main className="flex-1 w-full flex flex-col pb-24 md:pb-0">
            {children}
          </main>
          <Footer locale="fa" />
          <MobileBottomNav locale="fa" />
          <ToastContainer
            className="text-right font-bold"
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
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
