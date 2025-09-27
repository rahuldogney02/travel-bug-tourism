"use client";
import React, { useState } from 'react';

const FaqAccordion = ({ faqs }) => {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
  <div className="max-w-fit mx-auto">
      {faqs.map((faq, index) => (
        <div key={faq.id || index} className="border-b border-gray-200">
          <button
            className={`w-full text-left py-4 px-4 font-semibold text-lg flex justify-between items-center focus:outline-none transition-colors ${
              openId === index ? 'bg-emerald-50' : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => toggleAccordion(index)}
            aria-expanded={openId === index}
            aria-controls={`accordion-${index}`}
          >
            {faq.question}
            <span className={`ml-2 transition-transform duration-300 ${openId === index ? 'rotate-180' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <div
            id={`accordion-${index}`}
            className={`overflow-hidden transition-all duration-300 ${
              openId === index ? 'max-h-96 py-4 px-4' : 'max-h-0'
            }`}
          >
            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;