import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/layouts/Providers";
import { iranSans, lalezar } from "@/app/fonts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { getLocaleConfig } from "@/lib/i18n/config";
import { getServerLocale } from "@/lib/i18n/serverLocale";
import { buildRootMetadata } from "@/lib/seo/metadata";

/**
 * Locale-agnostic layout for the interactive app area (auth, payment, profile).
 *
 * These pages are a SINGLE source of truth: they are NOT duplicated per locale.
 * Because the URL carries no locale here, the active locale is read from the
 * SSR-readable language cookie (`getServerLocale`), so `<html lang/dir>` and the
 * seeded store follow the user's chosen language instead of a hardcoded default.
 * `Providers` receives that locale to pin the store for SSR/hydration, while the
 * shared client components (`Navbar`/`Footer`/`MobileBottomNav`) are rendered with
 * no `locale` prop and therefore stay store-driven for live toggling.
 * These pages are `noindex` (gated app area).
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    // Site-wide defaults (metadataBase, title template, description, keywords)
    // from the same builder the content layouts use — but no canonical/hreflang:
    // this area has no locale in the URL and must stay out of the index entirely.
    ...buildRootMetadata(locale),
    robots: { index: false, follow: false },
  };
}

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  const cfg = getLocaleConfig(locale);
  const isRtl = cfg.dir === "rtl";

  return (
    <html lang={cfg.hreflang} dir={cfg.dir} className="dark">
      <body
        className={`${iranSans.variable} ${lalezar.variable} font-sans min-h-screen flex flex-col bg-[#070c0e] text-white selection:bg-red-500 selection:text-white`}
      >
        <Providers locale={locale}>
          <Navbar />
          <main className="flex-1 w-full flex flex-col pb-24 md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileBottomNav />
          <ToastContainer
            className={isRtl ? "text-right font-bold" : "text-left font-sans"}
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={isRtl}
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
