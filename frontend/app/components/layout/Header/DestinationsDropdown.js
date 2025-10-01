"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getOptimizedImageProps } from '../../../utils/imageOptimization';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import destinationsMenu from '../../../data/destinations-menu.json';

const DestinationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('domestic');

  return (
    <div 
      className="relative dropdown-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
      >
        Destinations <FiChevronDown />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-[40rem] dropdown-menu origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="flex">
              {/* Vertical Tabs */}
              <div className="w-1/4 border-r border-slate-200 p-2">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab('domestic')}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'domestic' ? 'bg-slate-100 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      Domestic
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('international')}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'international' ? 'bg-slate-100 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      International
                    </button>
                  </li>
                </ul>
              </div>

              {/* Tab Content */}
              <div className="w-3/4 p-4">
                {activeTab === 'domestic' && (
                  <div className="flex gap-4">
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-1 w-2/3">
                      {destinationsMenu.domestic.destinations.map((dest) => (
                        <li key={dest.title}>
                          <Link href={dest.href} className="block py-1 text-sm text-slate-600 hover:text-indigo-600">{dest.title}</Link>
                        </li>
                      ))}
                    </ul>
                    <div className="w-1/3">
                       <Image 
                         src="/image/city.jpeg"
                         alt="Domestic Destination"
                         width={200}
                         height={150}
                         className="rounded-lg object-cover"
                         quality={75}
                         sizes="200px"
                       />
                    </div>
                  </div>
                )}
                {activeTab === 'international' && (
                   <div className="flex gap-4">
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-1 w-2/3">
                      {destinationsMenu.international.destinations.map((dest) => (
                        <li key={dest.title}>
                          <Link href={dest.href} className="block py-1 text-sm text-slate-600 hover:text-indigo-600">{dest.title}</Link>
                        </li>
                      ))}
                    </ul>
                    <div className="w-1/3">
                       <Image 
                         src="/image/city.jpeg"
                         alt="International Destination"
                         width={200}
                         height={150}
                         className="rounded-lg object-cover"
                         quality={75}
                         sizes="200px"
                       />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationsDropdown;
