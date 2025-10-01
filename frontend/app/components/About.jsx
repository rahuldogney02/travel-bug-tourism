"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getOptimizedImageProps } from "../utils/imageOptimization";
import { useIntersectionObserver } from "../hooks/useImageOptimization";

const About = ({
  variant = "default",
  showAnimation = true,
  containerClass = "",
  imageFirst = false,
}) => {
  const [aboutImageError, setAboutImageError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver();

  useEffect(() => {
    setIsClient(true);
  }, []);
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Feature items data
  const features = [
    {
      icon: "/image/about/directions.png",
      title: "Exclusive Trip",
      description:
        "Tailored adventures with unique destinations, curated itineraries, and premium experiences-your dream journey starts here!",
    },
    {
      icon: "/image/about/map.png",
      title: "Professional Guide",
      description:
        "Travel worry-free with expert guides offering insider tips and local knowledge for a seamless adventure.",
    },
  ];

  const MotionWrapper = showAnimation ? motion.section : "section";
  const MotionDiv = showAnimation ? motion.div : "div";

  return (
    <MotionWrapper
      className={`about-section relative py-12 lg:py-16 bg-white overflow-hidden ${containerClass}`}
      {...(showAnimation && { "aria-labelledby": "about-heading" })}
      {...(showAnimation && {
        variants: containerVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
      })}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/image/about/pattern-bg.png')] opacity-5 bg-repeat"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-center ${
            imageFirst ? "xl:grid-flow-col-dense" : ""
          }`}
        >
          {/* Image Section */}
          <MotionDiv
            className={`xl:col-span-5 ${imageFirst ? "xl:col-start-8" : ""}`}
            {...(showAnimation && {
              variants: imageVariants,
            })}
            ref={ref}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#11664d]/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>

              {/* Main image container */}
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="aspect-square relative">
                  {/* Only render image when in view or has intersected */}
                  {(hasIntersected || isIntersecting) && (
                    <Image
                      {...getOptimizedImageProps({
                        src: "/image/about/about_us.png",
                        alt: "Travel Bug Tourism - Plan Your Trip With Us",
                        width: 500,
                        height: 500,
                        priority: false,
                        quality: 80,
                        sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw",
                        enableBlur: true,
                        blurColor: "#f8fafc"
                      })}
                      className="w-full h-full object-cover"
                      onError={() => setAboutImageError(true)}
                    />
                  )}
                  {/* Loading skeleton */}
                  {!hasIntersected && !isIntersecting && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11664d]/20 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </MotionDiv>

          {/* Content Section */}
          <MotionDiv
            className={`xl:col-span-7 ${
              imageFirst ? "xl:col-start-1 xl:row-start-1" : ""
            }`}
            {...(showAnimation && {
              variants: itemVariants,
            })}
          >
            <div className="space-y-6 lg:space-y-8">
              {/* Badge */}
              <MotionDiv
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#11664d] to-[#0d5a41] text-white text-sm font-medium rounded-full shadow-lg"
                {...(showAnimation && {
                  variants: itemVariants,
                })}
              >
                <span className="mr-2">✈️</span>
                Let's Go Together
              </MotionDiv>

              {/* Title Section */}
              <MotionDiv
                className="space-y-4"
                {...(showAnimation && {
                  variants: itemVariants,
                })}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Plan Your Trip{" "}
                  <span className="bg-gradient-to-r from-[#11664d] to-[#0d5a41] bg-clip-text text-transparent">
                    With Us
                  </span>
                </h2>

                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Explore the world your way! With personalized plans, expert
                  advice, and unbeatable deals, we're here to make your trip
                  memorable and stress-free. Let's begin your journey now!
                </p>
              </MotionDiv>

              {/* Features List */}
              <MotionDiv
                className="space-y-6 lg:space-y-8"
                {...(showAnimation && {
                  variants: itemVariants,
                })}
              >
                {features.map((feature, index) => (
                  <MotionDiv
                    key={index}
                    className="flex items-start space-x-4 group"
                    {...(showAnimation && {
                      variants: itemVariants,
                      transition: { delay: index * 0.1 },
                    })}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#11664d] to-[#0d5a41] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={feature.icon}
                          width={24}
                          height={24}
                          className="w-6 h-6 lg:w-7 lg:h-7 object-contain filter brightness-0 invert"
                          loading="lazy"
                          alt={`${feature.title} icon`}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2 group-hover:text-[#11664d] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </MotionDiv>
                ))}
              </MotionDiv>
            </div>
          </MotionDiv>
        </div>
      </div>
    </MotionWrapper>
  );
};

export default About;
