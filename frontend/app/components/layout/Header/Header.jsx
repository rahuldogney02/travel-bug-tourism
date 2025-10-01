"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getOptimizedImageProps } from '../../../utils/imageOptimization';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiMapPin } from 'react-icons/fi';
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';
import DestinationsDropdown from './DestinationsDropdown';
import TripsAndToursDropdown from './TripsAndToursDropdown';
import SpecialOffersDropdown from './SpecialOffersDropdown';
import useViewport from '../../../hooks/useViewport';
import mobileMenu from '../../../data/mobile-menu.json';

// Accordion for the main off-canvas menu (for all screen sizes)
const OffcanvasAccordionItem = ({ item, onLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubMenu = item.sub_menu && (item.sub_menu.domestic || item.sub_menu.international);
  const hasLinks = item.links && item.links.length > 0;

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 px-4 text-left text-base font-medium text-slate-800 hover:bg-slate-50"
      >
        <span>{item.title}</span>
        {(hasSubMenu || hasLinks) && (
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <FiChevronDown />
          </motion.div>
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-slate-50"
          >
            {hasLinks && (
              <div className="py-2 px-4">
                {item.links.map((link) => (
                  <Link key={link.href} href={link.href} onClick={onLinkClick} className="block py-2 px-4 text-sm text-slate-600 hover:text-indigo-600 rounded-md hover:bg-slate-100">
                    {link.title}
                  </Link>
                ))}
              </div>
            )}
            {hasSubMenu && <NestedAccordion subMenu={item.sub_menu} onLinkClick={onLinkClick} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Nested Accordion for "Domestic" and "International"
const NestedAccordion = ({ subMenu, onLinkClick }) => {
    const [openSub, setOpenSub] = useState(null);
    return (
        <div className="pl-4">
            {Object.entries(subMenu).map(([key, value]) => (
                <div key={key} className="border-t border-slate-200">
                    <button onClick={() => setOpenSub(openSub === key ? null : key)} className="w-full flex justify-between items-center py-3 px-4 text-left text-sm font-medium text-slate-700 hover:bg-slate-100">
                        <span className="capitalize">{key}</span>
                        <motion.div animate={{ rotate: openSub === key ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <FiChevronDown />
                        </motion.div>
                    </button>
                    <AnimatePresence>
                        {openSub === key && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden pl-4 bg-slate-100">
                                {value.links.map(link => (
                                    <Link key={link.href} href={link.href} onClick={onLinkClick} className="block py-2 px-4 text-xs text-slate-600 hover:text-indigo-600 rounded-md hover:bg-slate-200">
                                        {link.title}
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

// Main Header Component
const Header = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const { showDesktopNav, isLandscape, width } = useViewport();

  const handleLinkClick = () => {
    setIsOffcanvasOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                {...getOptimizedImageProps({
                  src: "/image/travelbuglogo.png",
                  alt: "Travel Bug",
                  width: 150,
                  height: 50,
                  priority: true, // Logo should load immediately
                  quality: 90, // High quality for logo
                  sizes: "150px",
                  enableBlur: false // No blur for logo
                })}
                className="h-12 w-auto" 
              />
            </Link>
          </div>

          {/* Middle: Desktop Navigation - Now controlled by viewport hook */}
          {showDesktopNav && (
            <div className="flex items-center justify-center flex-1">
              <ul className="flex items-center space-x-8">
                <DestinationsDropdown />
                <TripsAndToursDropdown />
                <SpecialOffersDropdown />
              </ul>
            </div>
          )}

          {/* Right: Desktop Off-canvas Toggler & Mobile Toggler */}
          <div className="flex items-center gap-4">
             {/* Desktop toggler - only show on large screens */}
            {showDesktopNav && (
              <button
                className="flex flex-col space-y-1.5"
                aria-label="Open main menu"
                onClick={() => setIsOffcanvasOpen(true)}
              >
                <span className="block h-0.5 w-7 bg-black"></span>
                <span className="block h-0.5 w-5 bg-black"></span>
              </button>
            )}
            
            {/* Mobile hamburger - show when desktop nav is hidden */}
            {!showDesktopNav && (
              <motion.button
                className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
                aria-label="Open menu"
                onClick={() => setIsOffcanvasOpen(true)}
                whileTap={{ scale: 0.95 }}
              >
                <FiMenu size={24} />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Off-canvas Menu (for all screen sizes) */}
      <AnimatePresence>
        {isOffcanvasOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsOffcanvasOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-5 border-b">
                <h5 className="text-lg font-semibold">Main Menu</h5>
                <motion.button aria-label="Close menu" className="p-2" onClick={() => setIsOffcanvasOpen(false)} whileTap={{ scale: 0.95 }}>
                  <FiX size={24} />
                </motion.button>
              </div>
              
              <nav className="flex-1 overflow-y-auto">
                {/* Accordion for mobile devices (when desktop nav is not shown) */}
                {!showDesktopNav && (
                  <div>
                    {mobileMenu.map((item) => (
                      <OffcanvasAccordionItem key={item.title} item={item} onLinkClick={handleLinkClick} />
                    ))}
                  </div>
                )}
                
                {/* Simple links for desktop off-canvas */}
                <div className="py-4 px-4 border-t lg:border-t-0">
                    <Link href="/" onClick={handleLinkClick} className="block py-3 px-4 text-base font-medium text-slate-800 rounded-md hover:bg-slate-50">Home</Link>
                    <Link href="/about-us" onClick={handleLinkClick} className="block py-3 px-4 text-base font-medium text-slate-800 rounded-md hover:bg-slate-50">About Us</Link>
                    <Link href="/blogs" onClick={handleLinkClick} className="block py-3 px-4 text-base font-medium text-slate-800 rounded-md hover:bg-slate-50">News & Blogs</Link>
                    <Link href="/gallery" onClick={handleLinkClick} className="block py-3 px-4 text-base font-medium text-slate-800 rounded-md hover:bg-slate-50">Gallery</Link>
                    <Link href="/contact-us" onClick={handleLinkClick} className="block py-3 px-4 text-base font-medium text-slate-800 rounded-md hover:bg-slate-50">Contact Us</Link>
                    <Link href="/privacy-policy" onClick={handleLinkClick} className="block py-3 px-4 text-base font-medium text-slate-800 rounded-md hover:bg-slate-50">Privacy Policy</Link>
                </div>
              </nav>

              <div className="p-4 border-t mt-auto">
                <div className="mb-4">
                    <p className="text-sm text-slate-600">Speak to our expert Travel Guide</p>
                    <a href="tel:+918085864565" className="font-semibold text-indigo-600 hover:underline">+91 8085864565</a>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Follow Us:</p>
                    <div className="flex items-center space-x-4 text-slate-600">
                        <a href="#" target="_blank" className="hover:text-indigo-600"><FaFacebook size={20} /></a>
                        <a href="#" target="_blank" className="hover:text-indigo-600"><FaYoutube size={20} /></a>
                        <a href="#" target="_blank" className="hover:text-indigo-600"><FaInstagram size={20} /></a>
                        <a href="#" target="_blank" className="hover:text-indigo-600"><FiMapPin size={20} /></a>
                    </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
