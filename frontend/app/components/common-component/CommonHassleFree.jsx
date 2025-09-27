import React from 'react';
import Image from 'next/image';
import FaqAccordion from './FaqAccordion';
import faqData from '../../data/faq.json';

const CommonHassleFree = ({ showImage = true, title = "Your Guide to Hassle-Free Adventures", subtitle = "Find quick answers to make your travel experience seamless" }) => {
  return (
    <section className="faq-section py-6 lg:py-6 bg-gradient-to-r from-gray-50 to-gray-100" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 ${showImage ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-8`}>
          {showImage && (
            <div className="lg:col-span-1 flex flex-col items-center">
              <span className="text-emerald-600 font-semibold mb-2 text-center">
                {subtitle}
              </span>
              <h2 className="text-2xl font-bold mb-4 text-center">
                {title}
              </h2>
              <Image
                src="/image/news.png"
                width={400}
                height={200}
                alt="news"
                className="rounded-xl shadow"
              />
            </div>
          )}
          <div className={showImage ? 'lg:col-span-2' : 'lg:col-span-1'}>
            {!showImage && (
              <div className="text-center mb-6">
                <span className="text-emerald-600 font-semibold mb-2 block">
                  {subtitle}
                </span>
                <h2 className="text-2xl font-bold mb-6">
                  {title}
                </h2>
              </div>
            )}
            <FaqAccordion faqs={faqData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonHassleFree;