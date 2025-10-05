import React from 'react';
import { notFound } from 'next/navigation';
import CommonHassleFree from '../../components/common-component/CommonHassleFree';
import ContentTopSection from '../../components/common-component/ContentTopSection';
import ContactForm from '/app/components/common-component/ContactForm';
import { getClasses, getContent, isDevelopment } from '../../utils/environmentUtils';

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
  const isDev = isDevelopment();
  
  // Validate the slug
  if (!['domestic', 'international'].includes(slug)) {
    notFound();
  }

  return (
    <main className={getClasses("min-h-screen bg-gray-50 py-8")}>
      <div className={getClasses("container mx-auto px-4")}>
        {/* Top content (h3 + p) from cardsection.json */}
        <ContentTopSection slug={slug} />
        
        {/* Hero Section */}
        <div className={getClasses("text-center mb-6")}>
          <h1 className={getClasses("text-4xl font-bold text-gray-900 mb-4 capitalize")}>
            {isDev ? `${slug} Tour Packages` : 'Tour Packages'}
          </h1>
          <p className={getClasses("text-xl text-gray-600 max-w-2xl mx-auto")}>
            {slug === 'domestic' 
              ? (isDev 
                  ? 'Discover the beauty of India with our curated domestic tour packages'
                  : 'Discover beautiful destinations with our curated tour packages')
              : (isDev
                  ? 'Explore the world with our premium international tour packages'
                  : 'Explore amazing destinations with our premium tour packages')
            }
          </p>
        </div>
        
        {/* FAQ Section */}
        <div className={getClasses("mb-12")}>
          <CommonHassleFree />
        </div>
      </div>

      <ContactForm/>
    </main>
  );
};

export default CategoryPage;