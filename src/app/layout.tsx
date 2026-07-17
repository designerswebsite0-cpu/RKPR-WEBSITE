import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | RKPR Resort",
    default: "RKPR Resort | Luxury 5-Star Resort near BR Hills, India"
  },
  description: "Official website of RKPR Resort, a premium five-star sanctuary near Biligiriranga Hills, Karnataka, India. Experience luxury pool villas, fine dining at Azure Terrace, and wellness rituals at Aranya Spa.",
  keywords: ["RKPR Resort", "Luxury resort Karnataka", "5 star resort BR Hills", "Aranya Wellness Spa", "Chamarajanagar luxury stay"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "RKPR Resort",
    title: "RKPR Resort | Luxury 5-Star Resort near BR Hills, India",
    description: "Nestled in the lush hills of Karnataka, RKPR Resort offers private pool villas, authentic regional dining, and holistic Ayurvedic wellness.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal font-sans selection:bg-accent selection:text-white">
        <SmoothScroll>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
