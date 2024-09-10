"use client";
import localFont from "next/font/local";
import "./globals.css";

import NavBar from "../components/navBar";
import Layoutstyles from "../styles/Layout.module.scss";
import Homestyles from "../styles/Home.module.scss";
import { usePathname } from "next/navigation";

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

const paperSign = localFont({
  src: "./fonts/PaperSign.woff",
  variable: "--font-paper-sign",
  weight: "500",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${paperSign.variable}`}
      >
        {pathname === "/" ? (
          <div className={Layoutstyles.Wrapper}>
            <NavBar />
          </div>
        ) : (
          <div className={Homestyles.Container}>
            <nav className={Homestyles.Container_Nav}>
              <div className={Homestyles.Container_Nav_Wrapper}>
                <NavBar />
              </div>
            </nav>
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
