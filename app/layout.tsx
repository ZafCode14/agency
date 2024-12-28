import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import Chat from "@/components/ChatBot";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Specify the weights you need
});

export const metadata: Metadata = {
  title: "Web Creator",
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className={`${mulish.className} relative`} suppressHydrationWarning={true}>
        <Header />
        {children}
        <Footer />
        <Chat/>
      </body>
    </html>
  );
}