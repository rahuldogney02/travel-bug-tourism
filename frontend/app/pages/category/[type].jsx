import React from 'react';
import { notFound } from 'next/navigation';
import CommonHassleFree from '../../components/CommonHassleFree';
import CategoryHeroSection from '../../components/common-component/CategoryHeroSection';
// Generate static params (App Router equivalent of getStaticPaths)
export async function generateStaticParams() {
  return [
    { slug: 'domestic' },
    { slug: 'international' },
  ];
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Tour Packages | Travel Bug Tourism`,
    description: `Explore amazing ${slug} tour packages with Travel Bug Tourism. Discover the best destinations and deals.`,
  };
}

const CategoryPage = async ({ params }) => {
  const { slug } = await params;
  
  // Validate the slug
  if (!['domestic', 'international'].includes(slug)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Dynamic Hero Section */}
      <CategoryHeroSection type={slug} />
      
      {/* FAQ Section */}
      <CommonHassleFree showImage={false} />

      {/* CTA Section */}
      {/* <div className="bg-emerald-50 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Start Your Adventure?
        </h3>
        <p className="text-gray-600 mb-6">
          Get in touch with our travel experts to plan your perfect {slug} getaway
        </p>
        <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
          Contact Us Today
        </button>
      </div> */}
    </main>
  );
};

export default CategoryPage;