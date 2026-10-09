import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LeadsFlow180",
  description:
    "FLOW is your AI team and workspace in one. Talk to your specialists; use the tools that take your business to its goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className="min-h-screen bg-canvas font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
