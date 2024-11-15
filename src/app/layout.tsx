import "@fontsource/comic-mono"; // Defaults to weight 400
import { AnimatePresence } from "framer-motion";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "fibonacid.net",
  description: "/var/www/fibonacid.net/index.html",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-neutral-900 text-neutral-50 h-full">
      <body className="h-full">
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </body>
    </html>
  );
}
