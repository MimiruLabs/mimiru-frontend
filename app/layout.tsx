import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ROUTES, ROUTE_METADATA } from "@/constants";
import { LoadingIndicator } from "@/components/LoadingIndicator";

const mPlusRounded = M_PLUS_Rounded_1c({
  variable: "--font-m-plus-rounded",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: ROUTE_METADATA[ROUTES.ROOT].title,
  description: ROUTE_METADATA[ROUTES.ROOT].description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mPlusRounded.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        <Suspense fallback={null}>
          <LoadingIndicator />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
