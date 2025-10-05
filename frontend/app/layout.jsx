import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../lib/fontawesome"; // Import FontAwesome configuration
import Topbar from "./components/layout/Topbar";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header/Header";
import { ImagePerformanceMonitor } from "./utils/imagePerformanceMonitor";

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
  icons: {
    icon: '/favicon.ico',
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
  const isProduction = process.env.NODE_ENV === 'production';
  
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#C89364" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Conditional CSS loading for production obfuscation */}
        {isProduction && (
          <link rel="stylesheet" href="/obfuscated.css" />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Topbar />
        <Header />
        <main role="main">
          {children}
        </main>
        <Footer />
        
        {/* Image Performance Monitor (Development Only) */}
        <ImagePerformanceMonitor />
        
        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('performance' in window) {
                window.addEventListener('load', function() {
                  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                  console.log('Page load time:', loadTime + 'ms');
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
