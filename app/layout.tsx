import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import Chat from "@/components/ChatBot";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Etavelle",
  description: "Create Amazing Websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo2.svg" />
      </head>
      <body className={`${mulish.className}`} suppressHydrationWarning={true}>
        <Header />
        {children}
        <Footer />
        <Chat/>
      </body>
    </html>
  );
}