/**
 * Image Optimization Utilities for Travel Bug Tourism
 * Server-safe image optimization utilities
 */

// Generate optimized blur data URL for better placeholder
export const generateBlurDataURL = (width = 100, height = 100, color = '#eeeeee') => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${color}"/></svg>`;
  
  // Use consistent encoding for both server and client to avoid hydration mismatch
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// Smart image props generator for consistent optimization
export const getOptimizedImageProps = ({
  src,
  alt = '',
  width,
  height,
  priority = false,
  quality = 75,
  sizes = '100vw',
  className = '',
  enableBlur = true,
  blurColor = '#eeeeee'
}) => {
  const props = {
    src,
    alt,
    className,
    loading: priority ? 'eager' : 'lazy',
    fetchPriority: priority ? 'high' : 'low',
    quality,
    sizes,
  };

  // Add dimensions if provided
  if (width) props.width = width;
  if (height) props.height = height;

  // Add blur placeholder if enabled
  if (enableBlur) {
    props.placeholder = 'blur';
    props.blurDataURL = generateBlurDataURL(width || 100, height || 100, blurColor);
  }

  // Add priority for critical images
  if (priority) {
    props.priority = true;
  }

  return props;
};

// Image format detection and optimization
export const getOptimalImageFormat = (src) => {
  if (!src) return src;
  
  // Check if browser supports WebP/AVIF (client-side only)
  if (typeof window !== 'undefined') {
    const supportsWebP = (() => {
      try {
        return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
      } catch {
        return false;
      }
    })();

    const supportsAVIF = (() => {
      try {
        return document.createElement('canvas').toDataURL('image/avif').indexOf('data:image/avif') === 0;
      } catch {
        return false;
      }
    })();

    // Return optimized format if supported
    if (supportsAVIF && src.includes('.')) {
      return src.replace(/\.(jpg|jpeg|png)$/i, '.avif');
    } else if (supportsWebP && src.includes('.')) {
      return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
  }
  
  return src;
};

// Responsive sizes generator
export const generateResponsiveSizes = (breakpoints = {}) => {
  const defaultBreakpoints = {
    mobile: { maxWidth: 640, size: '100vw' },
    tablet: { maxWidth: 1024, size: '50vw' },
    desktop: { maxWidth: 1920, size: '33vw' },
    ...breakpoints
  };

  return Object.entries(defaultBreakpoints)
    .sort(([,a], [,b]) => a.maxWidth - b.maxWidth)
    .map(([name, { maxWidth, size }]) => `(max-width: ${maxWidth}px) ${size}`)
    .join(', ');
};

// Image preloader utility (server-safe)
export const preloadImage = (src) => {
  if (typeof window === 'undefined') return Promise.resolve();
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};