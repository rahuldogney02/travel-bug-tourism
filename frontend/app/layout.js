import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "./components/layout/Topbar";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://travelbugtourism.in'),
  title: "The Travel Bug Tourism - Best Travel Agency in Indore | Pithampur",
  description: "Discover the best travel packages with Travel Bug tourism. Explore domestic and international destinations, honeymoon packages, weekend trips, and corporate tours at affordable prices.",
  keywords: ["travel agency Indore", "tour packages", "domestic tours", "international tours", "honeymoon packages", "weekend trips", "corporate tours"],
  verification: {
    google: 'GOOGLE_VERIFICATION_CODE',
  },
  openGraph: {
    title: "Travel Bug tourism - Best Travel Agency in Indore | Pithampur",
    description: "Discover the best travel packages with Travel Bug tourism. Explore domestic and international destinations.",
    url: 'https://travelbugtourism.in',
    siteName: 'Travel Bug Tourism',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Travel Bug Tourism - Best Travel Agency in Indore | Pithampur",
    description: "Discover the best travel packages with Travel Bug Tourism.",
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Topbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
