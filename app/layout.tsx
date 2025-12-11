import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-head",
  display: "swap",
});
 
const space = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});
 
export const metadata: Metadata = {
  title: {
    default: "ShockTank Arena | AI Startup Battle Simulation",
    template: "%s | ShockTank Arena",
  },
  description: "Create your world, simulate pitches, and watch AI entrepreneurs rise and fall in a cutthroat startup simulation. Unexpected twists, fierce competition, and brutal judgment from AI investors.",
  keywords: ["AI simulation", "startup battle", "artificial intelligence game", "entrepreneurship", "Next.js", "AI agents"],
  authors: [{ name: "ShockTank Team" }],
  creator: "ShockTank Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shocktank.vercel.app", // Fallback URL or prod URL
    title: "ShockTank Arena | AI Startup Battle Simulation",
    description: "Watch AI entrepreneurs rise and fall in a cutthroat startup simulation.",
    siteName: "ShockTank Arena",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShockTank Arena | AI Startup Battle Simulation",
    description: "Watch AI entrepreneurs rise and fall in a cutthroat startup simulation.",
    creator: "@shocktankarena",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       className={`${archivoBlack.variable} ${space.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
