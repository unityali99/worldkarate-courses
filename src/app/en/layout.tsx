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
    default: lang.en.metadata.title,
    template: `%s | ${lang.en.metadata.title}`,
  },
  description: lang.en.metadata.description,
  keywords: lang.en.metadata.keywords,
  alternates: {
    canonical: "/en",
    languages: {
      fa: "/",
      "x-default": "/",
      en: "/en",
    },
  },
  openGraph: {
    title: lang.en.metadata.title,
    description: lang.en.metadata.description,
    url: "/en",
    siteName: "Sensei Amir Yari Karate Academy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.webp",
        width: 800,
        height: 800,
        alt: lang.en.metadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: lang.en.metadata.title,
    description: lang.en.metadata.description,
    images: ["/logo.webp"],
  },
};

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
