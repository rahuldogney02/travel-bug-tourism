"use client";

import { useState, useEffect } from 'react';

// Custom hook to detect viewport size, orientation, and determine navigation layout
const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    isLandscape: false,
    showDesktopNav: false,
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;
      
      // Device type detection
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      
      // Show desktop navigation if:
      // 1. Width is >= 1024px (desktop)
      // 2. OR device is in landscape mode with width >= 667px (mobile landscape)
      // 3. OR tablet in landscape mode
      const showDesktopNav = 
        width >= 1024 || 
        (isLandscape && width >= 667) ||
        (isTablet && isLandscape);
      
      setViewport({
        width,
        height,
        isLandscape,
        showDesktopNav,
        isMobile,
        isTablet,
        isDesktop
      });
    };

    // Initial call
    updateViewport();

    // Event listeners
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure orientation change is complete
      setTimeout(updateViewport, 100);
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return viewport;
};

export default useViewport;