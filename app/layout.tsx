import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Mono } from "next/font/google";
import { EB_Garamond } from "next/font/google";
import { Zhi_Mang_Xing } from "next/font/google";
import { ReactNode } from "react";
import Header from "./components/header";
import "./globals.css";
import SmoothScroll from "./components/ScrollSmooth";

export const metadata: Metadata = {
  title: "Helen Huang",
  description: "Helen Huang's Portfolio",
};

const ebGaramond = EB_Garamond({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});

const zhiMangXing = Zhi_Mang_Xing({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-zhi-mang-xing",
});

const retrogression = localFont({
  src: "./fonts/Retrogression-Regular.ttf",
  variable: "--font-retrogression",
});

const alteHaasGrotesk = localFont({
  src: [
    {
      path: "./fonts/AlteHaasGroteskRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/AlteHaasGroteskBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-Alte-Haas-Grotesk",
});

const adobeCaslonPro = localFont({
  src: "./fonts/adobe-caslon-pro-italic.ttf",
  variable: "--font-Adobe-Caslon-Pro",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html style={{ height: "100%" }}>
      <body
        className={`${retrogression.variable} ${ebGaramond.variable} ${alteHaasGrotesk.variable} ${adobeCaslonPro.variable} ${zhiMangXing.variable} ${dmMono.variable}`}
        style={{ margin: 0, height: "100%" }}
      >
        <SmoothScroll />
        <div
          id="smooth-wrapper"
          style={{
            overflow: "hidden",
            position: "fixed",
            height: "100%",
            width: "100%",
            top: 0,
            left: 0,
          }}
        >
          <div id="smooth-content">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
