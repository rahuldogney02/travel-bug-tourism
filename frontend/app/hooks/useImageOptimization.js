"use client";

/**
 * Client-side Image Optimization Hooks
 * React hooks for image optimization (client components only)
 */

import { useState, useEffect, useRef, useCallback } from 'react';

// Enhanced intersection observer hook with better performance
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '100px', // Start loading earlier
      ...options,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasIntersected, options]);

  return [ref, isIntersecting, hasIntersected];
};

// Image fallback utility hook
export const useImageFallback = (candidates = [], fallback = '/hero.png') => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const currentSrc = candidates[currentIndex] || fallback;

  return {
    currentSrc,
    isLoading,
    hasError,
    handleImageError,
    handleImageLoad,
    resetError: () => {
      setCurrentIndex(0);
      setIsLoading(true);
      setHasError(false);
    }
  };
};

// Performance monitoring hook for images
export const useImagePerformance = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    size: 0,
    format: '',
  });

  const measureImageLoad = (src) => {
    const startTime = performance.now();
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        const loadTime = performance.now() - startTime;
        setMetrics({
          loadTime,
          size: img.naturalWidth * img.naturalHeight,
          format: src.split('.').pop() || 'unknown',
        });
        resolve(img);
      };
      
      img.onerror = reject;
      img.src = src;
    });
  };

  return { metrics, measureImageLoad };
};

// Image preloader hook
export const useImagePreloader = (sources = []) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const preloadImages = useCallback(async () => {
    setIsLoading(true);
    const promises = sources.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(src));
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      });
    });

    try {
      await Promise.all(promises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    } finally {
      setIsLoading(false);
    }
  }, [sources]);

  useEffect(() => {
    if (sources.length > 0) {
      preloadImages();
    }
  }, [sources.length, preloadImages]);

  return { loadedImages, isLoading, preloadImages };
};