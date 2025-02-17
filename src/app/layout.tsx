import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/layouts/Providers";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { keywords } from "@/utils/keywords";

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
});

export const metadata: Metadata = {
  title: "آکادمی کاراته سنسی یاری",
  description: "جامع ترین پلتفرم آموزش کاراته در کشور",
  keywords: keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={iranSans.className}>
        <Providers>
          <Navbar />
          {children}
          <ToastContainer
            className={"text-right font-bold"}
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
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
