"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import exploreData from '../data/explore.json';

// SVG Icon Components using actual files
const InternationalIcon = ({ className = "" }) => (
  <Image 
    src="/image/international.svg" 
    width={120} 
    height={120} 
    className={`${className} object-contain`}
    alt="International Travel"
    loading="lazy"
  />
);

const DomesticIcon = ({ className = "" }) => (
  <Image 
    src="/image/Domestic.svg" 
    width={170} 
    height={170} 
    className={`${className} object-contain`}
    alt="Domestic Travel"
    loading="lazy"
  />
);

const Explore = () => {
  // Mobile swiper state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Auto-rotate every 10 seconds on mobile
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % exploreData.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % exploreData.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000); // Resume auto-play after 5 seconds
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + exploreData.length) % exploreData.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    })
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="explore-section relative py-6 lg:py-6 bg-gradient-to-r from-secondary to-primary overflow-hidden" aria-labelledby="explore-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Title */}
          <motion.div 
            className="text-center mb-3 lg:mb-5"
            variants={titleVariants}
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-secondary text-dark text-sm font-medium rounded-full shadow-lg mb-6">
              <span className="mr-2">🌟</span>
              Premium Travel Experiences
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Give them <span className="bg-gradient-to-r from-[#11664d] to-[#0d5a41] bg-clip-text text-transparent">quality</span>
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto text-dark">
              That's the best kind of advertising - Discover amazing destinations with unbeatable deals
            </p>
          </motion.div>

          {/* Desktop Grid Layout - Hidden on Mobile */}
          <div className="hidden lg:grid grid-cols-2 gap-6 lg:gap-8">
            {exploreData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-primary border border-muted/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-secondary/20 -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-primary/15 translate-y-12 -translate-x-12"></div>
                  </div>

                  <div className="relative px-8 py-6 lg:px-10 lg:py-8 flex flex-col lg:flex-row items-center lg:items-start justify-between min-h-[280px]">
                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left lg:pr-8">
                      <h3 className="text-2xl lg:text-3xl font-bold text-dark mb-3 group-hover:scale-105 transition-transform duration-300">
                        {item.title}
                      </h3>
                      <p className="text-base lg:text-lg text-muted mb-2 leading-relaxed">
                        {item.subtitle}
                      </p>
                      
                      {/* CTA Button */}
                      <Link href={item.button_href}>
                        <motion.button
                          className="btn-pill-gradient"
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>{item.button_text}</span>
                          <svg className="ml-2 w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </motion.button>
                      </Link>
                    </div>

                    {/* Icon */}
                    <div className="flex-shrink-0 mt-6 lg:mt-0">
                      <motion.div
                        className="w-24 h-24 lg:w-32 lg:h-32 text-primary transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                        whileHover={{ rotate: 12 }}
                      >
                        {item.type === 'international' ? (
                          <InternationalIcon className="w-full h-full" />
                        ) : (
                          <DomesticIcon className="w-full h-full" />
                        )}
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Swiper Layout - Hidden on Desktop */}
          <div className="lg:hidden relative max-w-lg mx-auto">
            {/* Swiper Container */}
            <div 
              className="relative h-[420px] overflow-hidden rounded-3xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait" custom={currentSlide}>
                <motion.div
                  key={currentSlide}
                  custom={currentSlide}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 }
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-primary border border-muted/20 shadow-xl h-full group">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-secondary/20 -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-primary/15 translate-y-12 -translate-x-12"></div>
                      <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-primary/10 -translate-x-1/2 -translate-y-1/2"></div>
                    </div>

                    <div className="relative p-6 flex flex-col items-center justify-between h-full text-center">
                      {/* Badge */}
                      <div className="inline-flex items-center px-3 py-1 bg-primary/90 text-secondary text-xs font-medium rounded-full shadow-lg mb-4">
                        <span className="mr-1">{exploreData[currentSlide].type === 'international' ? '✈️' : '🚆'}</span>
                        {exploreData[currentSlide].type === 'international' ? 'International' : 'Domestic'}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-center">
                        <motion.h3 
                          className="text-2xl sm:text-3xl font-bold text-dark mb-4 leading-tight"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {exploreData[currentSlide].title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-base text-muted mb-6 leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {exploreData[currentSlide].subtitle}
                        </motion.p>

                        {/* Icon */}
                        <motion.div
                          className="w-24 h-24 mx-auto mb-6 text-primary"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                        >
                          {exploreData[currentSlide].type === 'international' ? (
                            <InternationalIcon className="w-full h-full drop-shadow-lg" />
                          ) : (
                            <DomesticIcon className="w-full h-full drop-shadow-lg" />
                          )}
                        </motion.div>
                        
                        {/* CTA Button */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Link href={exploreData[currentSlide].button_href}>
                            <motion.button
                              className="btn-pill-gradient"
                              whileTap={{ scale: 0.95 }}
                            >
                              <span>{exploreData[currentSlide].button_text}</span>
                              <svg className="ml-2 w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </motion.button>
                          </Link>
                        </motion.div>
                      </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-primary/30 pointer-events-none"></div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {exploreData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary w-6' 
                      : 'bg-secondary hover:bg-primary'
                  }`}
                />
              ))}
            </div>

            {/* Auto-play Progress Bar */}
            <div className="mt-3 w-full bg-secondary rounded-full h-1 overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: isAutoPlay ? "100%" : "0%" }}
                transition={{ 
                  duration: isAutoPlay ? 10 : 0,
                  ease: "linear",
                  repeat: isAutoPlay ? Infinity : 0
                }}
              />
            </div>

           
          </div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-5 lg:mt-5"
            variants={titleVariants}
          >
            <p className="text-muted mb-2">Can't decide? Let our experts help you choose the perfect destination</p>
            <Link href="/contact-us">
              <motion.button
                className="btn-pill-gradient"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Expert Advice</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Explore;