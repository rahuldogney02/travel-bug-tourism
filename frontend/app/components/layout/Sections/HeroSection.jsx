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
        className="relative z-10 w-full px-[6%] py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* New layout: image block + separated textual content below (stack) / side (large) */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Text Block */}
          <motion.div className="w-full lg:w-1/2 space-y-5 text-center lg:text-left" variants={itemVariants}>
            <motion.h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand leading-tight" variants={itemVariants}>
              {content.title}
            </motion.h1>
            <motion.h2 className="text-base sm:text-lg lg:text-xl text-brand/90 font-medium" variants={itemVariants}>
              {content.subtitle}
            </motion.h2>
            <motion.p className="text-sm sm:text-base lg:text-lg text-brand/80 max-w-xl mx-auto lg:mx-0" variants={itemVariants}>
              {content.description}
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4 justify-center lg:justify-start" variants={itemVariants}>
              <motion.button
                className="btn-pill-gradient px-6 py-3 text-sm sm:text-base font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {content.primaryButton}
              </motion.button>
              <motion.button
                className="px-6 py-3 text-sm sm:text-base font-semibold rounded-full border border-brand/40 text-brand hover:bg-brand hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {content.secondaryButton}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Block (was previously overlaid) */}
            <motion.div
              className="relative w-full lg:w-1/2 max-w-lg sm:max-w-xl lg:max-w-none"
              variants={svgVariants}
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-10 md:p-12 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src={content.svg}
                  alt={`${page} illustration`}
                  width={640}
                  height={480}
                  className="w-full h-auto"
                  priority={page === 'home'}
                />
                <motion.div
                  className="absolute -top-6 -right-6 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >✈️</motion.div>
                <motion.div
                  className="absolute -bottom-6 -left-6 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-base"
                  animate={{ y: [10, -10, 10], x: [-5, 5, -5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >🏖️</motion.div>
              </div>
            </motion.div>
        </div>
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
