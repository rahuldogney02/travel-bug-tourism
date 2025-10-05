const crypto = require('crypto');

/**
 * Utility function for conditional class names based on environment
 * In development: returns readable Tailwind classes
 * In production: returns obfuscated class names
 */
export const getClasses = (devClasses, prodClasses = null) => {
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    return devClasses;
  }
  
  // In production, use provided obfuscated classes or generate them
  if (prodClasses) {
    return prodClasses;
  }
  
  // Generate obfuscated class names
  return devClasses.split(' ').map(cls => {
    const hash = crypto.createHash('md5')
      .update(cls + 'salt' + process.env.NODE_ENV)
      .digest('hex')
      .substring(0, 7);
    return `c${hash}`;
  }).join(' ');
};

/**
 * Environment-based content rendering
 * In development: shows full content
 * In production: shows simplified/obfuscated content
 */
export const getContent = (devContent, prodContent = null) => {
  const isDev = process.env.NODE_ENV === 'development';
  return isDev ? devContent : (prodContent || devContent);
};

/**
 * Check if current environment is development
 */
export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

/**
 * Check if current environment is production
 */
export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

/**
 * Get environment-specific configuration
 */
export const getEnvConfig = () => {
  return {
    isDev: isDevelopment(),
    isProd: isProduction(),
    obfuscate: process.env.NEXT_PUBLIC_OBFUSCATE === 'true',
    env: process.env.NODE_ENV,
  };
};