import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientAuthProvider from "@/lib/auth-proxy";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Auto Image Upscaler",
  description: "Enhance Images using the power of AI",
};

export default function RootLayout({children}: {children: React.ReactNode}){
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

      <ClientAuthProvider>
        {children}
      </ClientAuthProvider>
    </body>
    </html>
  );
}
