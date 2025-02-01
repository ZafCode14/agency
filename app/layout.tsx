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
  description: "Etavelle offers expert web development services, specializing in high-performance, SEO-optimized websites tailored to elevate your business presence online. From stunning designs to powerful functionalities, we create impactful digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>

        <meta property="og:title" content="Etavelle" />
        <meta property="og:description" content="Etavelle offers expert web development services, specializing in high-performance, SEO-optimized websites tailored to elevate your business presence online. From stunning designs to powerful functionalities, we create impactful digital experiences." />
        <meta property="og:image" content="https://i.ibb.co/Hmp69hV/logo.png"/>
        <meta property="og:url" content="https://etavelle.com" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
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