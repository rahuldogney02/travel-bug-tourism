import Image from "next/image";
import HeroSection from "./components/layout/Sections/HeroSection";
import BrandsSection from "./components/common-component/BrandsSection";
import About from "./components/About";
import Explore from "./components/Explore";
import CommonHassleFree from "./components/common-component/CommonHassleFree";
import DestinationsSection from "./components/common-component/DestinationsSection";

// Metadata for the home page
export const metadata = {
  title: "Travel Bug Tourism - Best Travel Agency in Indore | Premium Tour Packages",
  description: "Discover amazing domestic and international tour packages with Travel Bug Tourism. Expert travel planning, competitive prices, and unforgettable experiences await you.",
  keywords: ["travel agency Indore", "tour packages", "domestic tours", "international tours", "travel bug tourism", "holiday packages"],
  openGraph: {
    title: "Travel Bug Tourism - Best Travel Agency in Indore",
    description: "Discover amazing domestic and international tour packages with Travel Bug Tourism.",
    url: "https://travelbugtourism.in",
    siteName: "Travel Bug Tourism",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Bug Tourism - Best Travel Agency in Indore",
    description: "Discover amazing domestic and international tour packages with Travel Bug Tourism.",
  }
};

export default function Home() {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Travel Bug Tourism",
    "description": "Best Travel Agency in Indore offering domestic and international tour packages",
    "url": "https://travelbugtourism.in",
    "telephone": "+91-8977008007",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "addressCountry": "IN"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 22.7196,
        "longitude": 75.8577
      }
    },
    "services": [
      "Domestic Tour Packages",
      "International Tour Packages", 
      "Honeymoon Packages",
      "Corporate Tours",
      "Weekend Trips"
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <main id="main-content" className="main_wrapper min-h-screen" role="main">
        {/* Hero Section - Above the fold content */}
        <HeroSection page="home" />

        {/* Main Content Area */}
        <div className="main-content bg-gradient-to-b from-gray-50 to-white">
          {/* About Section */}
          <About />

          {/* Explore Section */}
          <Explore />

        {/* Domestic Destinations */}
        <DestinationsSection
          category="domestic"
          title="Explore"
          highlightText="Domestic"
          titleSuffix="Destinations"
          description="Discover the incredible beauty and rich heritage of India with our carefully curated domestic tour packages"
          className="destinations-domestic py-6 lg:py-6 bg-white"
        />

        {/* Trusted Brands Section */}
        <BrandsSection />

        {/* International Destinations */}
        <DestinationsSection
          category="international"
          title="Explore"
          highlightText="International"
          titleSuffix="Destinations"
          description="Journey beyond borders with our premium international tour packages to exotic destinations worldwide"
          className="destinations-international py-6 lg:py-6 bg-white"
        />

          {/* FAQ / Hassle-Free Section */}
          <CommonHassleFree showImage={false} />
      </div>
    </main>
    </>
  );
}
