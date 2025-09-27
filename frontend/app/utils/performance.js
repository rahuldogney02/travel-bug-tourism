// Performance monitoring utilities for production
export class PerformanceMonitor {
  static measurePageLoad() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        console.log('Page Load Performance:', {
          loadTime: `${loadTime.toFixed(2)}ms`,
          domContentLoaded: `${(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart).toFixed(2)}ms`,
          firstContentfulPaint: this.getFCP(),
          largestContentfulPaint: this.getLCP(),
        });
      });
    }
  }

  static getFCP() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              resolve(`${entry.startTime.toFixed(2)}ms`);
              observer.disconnect();
            }
          }
        });
        observer.observe({ entryTypes: ['paint'] });
      });
    }
    return Promise.resolve('N/A');
  }

  static getLCP() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(`${lastEntry.startTime.toFixed(2)}ms`);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Fallback timeout
        setTimeout(() => {
          observer.disconnect();
          resolve('N/A');
        }, 5000);
      });
    }
    return Promise.resolve('N/A');
  }

  static logError(error, errorInfo) {
    // In production, send to error tracking service
    console.error('Application Error:', error, errorInfo);
    
    // Example: Send to error tracking service
    // if (process.env.NODE_ENV === 'production') {
    //   errorTrackingService.captureException(error, {
    //     extra: errorInfo,
    //     tags: { component: 'ErrorBoundary' }
    //   });
    // }
  }
}

// Initialize performance monitoring in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  PerformanceMonitor.measurePageLoad();
}