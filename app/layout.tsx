import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/general/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App™ | Sharlene Pillay",
  description:
    "Generated by create next app. All content © Sharlene Pillay. Trademark™.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <div className="text-xs text-center text-gray-400 mt-8 mb-2">
          © {new Date().getFullYear()} Sharlene Pillay. All rights reserved.
          Trademark™.
        </div>
      </body>
    </html>
  );
}
