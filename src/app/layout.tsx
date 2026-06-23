import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/layouts/Providers";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { keywords } from "@/utils/keywords";
import { lang } from "@/lang";
import { Box } from "@chakra-ui/react";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { headers } from "next/headers";

const lalezar = localFont({
  src: [
    {
      path: "./fonts/Lalezar-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-lalezar",
});

const iranSans = localFont({
  src: [
    {
      path: "./fonts/IRANSans-Medium-web.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/IRANSans-Light-web.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/IRANSans-Bold-web.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/IRANSans-UltraLight-web.woff2",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-iran-sans",
});

export const metadata: Metadata = {
  title: lang.fa.metadata.title,
  description: lang.fa.metadata.description,
  keywords: lang.fa.metadata.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className={`${iranSans.variable} ${lalezar.variable} font-sans`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer
            className={"text-right font-bold"}
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Providers>
      </body>
    </html>
  );
}
