import type { Metadata } from "next";
import { satoshi } from "../fonts/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "nimble",
  description: "A very, very simple todo application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
