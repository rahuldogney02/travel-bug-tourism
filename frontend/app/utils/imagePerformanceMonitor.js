/**
 * Performance Monitoring Component for Image Loading
 * Tracks and reports image loading performance across the app
 */
"use client";

import { useEffect, useState } from 'react';

// Performance metrics store
let performanceMetrics = {
  imageLoads: [],
  totalImages: 0,
  averageLoadTime: 0,
  slowestImage: null,
  fastestImage: null,
};

// Image performance tracker HOC
export const withImagePerformance = (WrappedComponent) => {
  return function ImagePerformanceTracker(props) {
    useEffect(() => {
      // Track image performance when component mounts
      const images = document.querySelectorAll('img[data-nimg]');
      
      images.forEach((img) => {
        if (!img.dataset.tracked) {
          img.dataset.tracked = 'true';
          
          const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              if (entry.name === img.src) {
                const loadTime = entry.loadTime || entry.duration;
                recordImagePerformance(img.src, loadTime, img.naturalWidth, img.naturalHeight);
              }
            });
          });
          
          observer.observe({ entryTypes: ['resource'] });
        }
      });
    }, []);

    return <WrappedComponent {...props} />;
  };
};

// Record image performance metrics
export const recordImagePerformance = (src, loadTime, width, height) => {
  const metric = {
    src,
    loadTime,
    size: width * height,
    timestamp: Date.now(),
    sizeCategory: width * height > 500000 ? 'large' : width * height > 100000 ? 'medium' : 'small'
  };

  performanceMetrics.imageLoads.push(metric);
  performanceMetrics.totalImages++;
  
  // Update averages
  performanceMetrics.averageLoadTime = 
    performanceMetrics.imageLoads.reduce((sum, m) => sum + m.loadTime, 0) / 
    performanceMetrics.imageLoads.length;
  
  // Update extremes
  if (!performanceMetrics.slowestImage || loadTime > performanceMetrics.slowestImage.loadTime) {
    performanceMetrics.slowestImage = metric;
  }
  
  if (!performanceMetrics.fastestImage || loadTime < performanceMetrics.fastestImage.loadTime) {
    performanceMetrics.fastestImage = metric;
  }

  // Log slow images in development
  if (process.env.NODE_ENV === 'development' && loadTime > 1000) {
    console.warn(`⚠️ Slow image loading detected:`, {
      src: src.split('/').pop(),
      loadTime: `${loadTime.toFixed(0)}ms`,
      size: `${width}×${height}`,
      recommendation: getSizeRecommendation(width, height, loadTime)
    });
  }
};

// Get performance recommendations
const getSizeRecommendation = (width, height, loadTime) => {
  const pixelCount = width * height;
  
  if (pixelCount > 2000000 && loadTime > 1500) {
    return 'Consider reducing image dimensions or using WebP/AVIF format';
  }
  
  if (loadTime > 2000) {
    return 'Image is loading very slowly - check compression and format';
  }
  
  if (pixelCount > 1000000) {
    return 'Large image detected - consider lazy loading';
  }
  
  return 'Performance is acceptable';
};

// Performance monitoring component for development
export const ImagePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState(performanceMetrics);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const interval = setInterval(() => {
      setMetrics({ ...performanceMetrics });
    }, 2000);

    // Keyboard shortcut to toggle monitor (Ctrl/Cmd + Shift + I)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        setIsVisible(!isVisible);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  if (process.env.NODE_ENV !== 'development' || !isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg max-w-sm text-xs z-[9999] font-mono">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">📊 Image Performance</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white">×</button>
      </div>
      
      <div className="space-y-1">
        <div>Images loaded: {metrics.totalImages}</div>
        <div>Avg load time: {metrics.averageLoadTime.toFixed(0)}ms</div>
        
        {metrics.slowestImage && (
          <div className="text-red-400">
            Slowest: {metrics.slowestImage.src.split('/').pop()} 
            ({metrics.slowestImage.loadTime.toFixed(0)}ms)
          </div>
        )}
        
        {metrics.fastestImage && (
          <div className="text-green-400">
            Fastest: {metrics.fastestImage.src.split('/').pop()} 
            ({metrics.fastestImage.loadTime.toFixed(0)}ms)
          </div>
        )}
      </div>
      
      <div className="mt-2 text-gray-400 text-xs">
        Press Ctrl+Shift+I to toggle
      </div>
    </div>
  );
};

// Get current performance metrics
export const getImagePerformanceMetrics = () => performanceMetrics;

// Reset metrics (useful for testing)
export const resetImagePerformanceMetrics = () => {
  performanceMetrics = {
    imageLoads: [],
    totalImages: 0,
    averageLoadTime: 0,
    slowestImage: null,
    fastestImage: null,
  };
};

// Performance optimization suggestions
export const getPerformanceRecommendations = () => {
  const metrics = performanceMetrics.imageLoads;
  const recommendations = [];

  // Check for slow images
  const slowImages = metrics.filter(m => m.loadTime > 1000);
  if (slowImages.length > 0) {
    recommendations.push({
      type: 'warning',
      title: 'Slow Loading Images',
      description: `${slowImages.length} images are loading slower than 1 second`,
      action: 'Consider image optimization or compression'
    });
  }

  // Check for large images
  const largeImages = metrics.filter(m => m.size > 1000000);
  if (largeImages.length > 0) {
    recommendations.push({
      type: 'info',
      title: 'Large Images Detected',
      description: `${largeImages.length} images are larger than 1MP`,
      action: 'Consider implementing progressive loading'
    });
  }

  // Check average performance
  if (performanceMetrics.averageLoadTime > 800) {
    recommendations.push({
      type: 'warning',
      title: 'Overall Performance',
      description: 'Average image load time is higher than recommended',
      action: 'Review image formats and sizes across the site'
    });
  }

  return recommendations;
};