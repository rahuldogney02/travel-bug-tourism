'use client';

import { useEffect } from 'react';
import { isProduction } from '../utils/environmentUtils';

const ConditionalCSS = () => {
  useEffect(() => {
    if (isProduction()) {
      // Create and append the obfuscated CSS link
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/obfuscated.css';
      link.id = 'obfuscated-css';
      document.head.appendChild(link);

      return () => {
        // Cleanup on unmount
        const existingLink = document.getElementById('obfuscated-css');
        if (existingLink) {
          existingLink.remove();
        }
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default ConditionalCSS;