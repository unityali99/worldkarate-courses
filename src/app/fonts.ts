import localFont from "next/font/local";

export const lalezar = localFont({
  src: [
    {
      path: "./fonts/Lalezar-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-lalezar",
});

export const iranSans = localFont({
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
