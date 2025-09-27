import React from 'react';
import { notFound } from 'next/navigation';
import CommonHassleFree from '../../components/common-component/CommonHassleFree';
import ContentTopSection from '../../components/common-component/ContentTopSection';
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
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Top content (h3 + p) from cardsection.json */}
        <ContentTopSection slug={slug} />

        {/* Hero Section */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 capitalize">
            {slug} Tour Packages
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {slug === 'domestic' 
              ? 'Discover the beauty of India with our curated domestic tour packages'
              : 'Explore the world with our premium international tour packages'
            }
          </p>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-12">
          <CommonHassleFree />
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;