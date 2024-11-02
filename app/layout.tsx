"use client";
import NavBar from "@/components/Navbar";
import PageMetadata from "@/components/PageMetaData";
import Providers from "@/components/Providers";
import store from "@/store/store";
import localFont from "next/font/local";
import { Provider } from "react-redux";
import "./globals.css";

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
        <Provider store={store}>
          <Providers>
            <PageMetadata />
            <NavBar />
            {children}
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
