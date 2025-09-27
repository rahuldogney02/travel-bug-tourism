"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection = ({ page = "home" }) => {
  // Define content based on page
  const pageContent = {
    home: {
      svg: "/image/hero-sections/home.svg",
      title: "Discover Your Next Adventure",
      subtitle: "Explore breathtaking destinations with Travel Bug Tourism",
      description: "From exotic beaches to mountain retreats, we curate unforgettable experiences tailored just for you.",
      primaryButton: "Explore Destinations",
      secondaryButton: "View Packages"
    },
    about: {
      svg: "/image/hero-sections/about.svg",
      title: "About Travel Bug Tourism",
      subtitle: "Your trusted partner in creating memories",
      description: "With over a decade of experience, we specialize in crafting personalized travel experiences that exceed expectations.",
      primaryButton: "Our Story",
      secondaryButton: "Meet Our Team"
    },
    contactUs: {
      svg: "/image/hero-sections/contactUs.svg",
      title: "Get In Touch",
      subtitle: "Let's plan your perfect getaway",
      description: "Ready to embark on your next adventure? Our travel experts are here to make your dream vacation a reality.",
      primaryButton: "Contact Us",
      secondaryButton: "Request Quote"
    }
  };

  const content = pageContent[page] || pageContent.home;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const svgVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  return (
    <section className="hero-section relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-transparent"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(200, 147, 100, 0.1) 2%, transparent 0%)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <motion.div
        className="relative z-10 w-full px-[10%] py-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* SVG Background with Text Overlay - Reduced Mobile Size */}
        <motion.div
          className="relative flex justify-center items-center min-h-[35vh] sm:min-h-[31vh] md:min-h-[56vh] lg:min-h-[4vh] xl:min-h-screen pt-1 sm:pt-2 md:pt-4 lg:pt-6 xl:pt-8"
          variants={svgVariants}
        >
          <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            {/* Background glow effect */}
            <div className="absolute inset-0 rounded-full blur-3xl opacity-30 transform scale-110"></div>

            {/* SVG Container - Reduced Padding */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 transform rotate-3 hover:rotate-0 transition-transform duration-500 mx-auto"
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <Image
                src={content.svg}
                alt={`${page} illustration`}
                width={400}
                height={300}
                className="w-full h-auto max-w-3xl lg:max-w-4xl"
                priority={page === "home"}
              />

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✈️
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-base"
                animate={{
                  y: [10, -10, 10],
                  x: [-5, 5, -5]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🏖️
              </motion.div>
            </motion.div>

            {/* Text Content Overlay - Mobile Optimized */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 sm:p-8 md:p-12 lg:p-20 xl:p-28"
              variants={itemVariants}
            >
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <motion.h1
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-brand leading-tight"
                  variants={itemVariants}
                >
                  {content.title}
                </motion.h1>

                <motion.h2
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-brand font-medium"
                  variants={itemVariants}
                >
                  {content.subtitle}
                </motion.h2>

                <motion.p
                  className="text-xs sm:text-sm md:text-base text-brand leading-relaxed max-w-xs sm:max-w-sm md:max-w-2xl"
                  variants={itemVariants}
                >
                  {content.description}
                </motion.p>

                {/* Action Buttons - Mobile Optimized */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4 sm:pt-6"
                  variants={itemVariants}
                >
                  <motion.button
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {content.primaryButton}
                  </motion.button>

                  <motion.button
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-orange-300 text-white hover:bg-white hover:text-orange-600 font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {content.secondaryButton}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-20 lg:h-32 fill-current text-white"
          preserveAspectRatio="none"
        >
          <path d="M0,64 C360,96 720,32 1440,64 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
