const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Function to generate obfuscated class names
function generateObfuscatedClassName(originalName) {
  return 'c' + crypto.createHash('md5')
    .update(originalName + process.env.NODE_ENV + 'salt')
    .digest('hex')
    .substring(0, 7);
}

// Common Tailwind classes used in your project
const tailwindClasses = [
  'min-h-screen', 'bg-gray-50', 'py-8', 'container', 'mx-auto', 'px-4',
  'text-center', 'mb-6', 'text-4xl', 'font-bold', 'text-gray-900', 'mb-4',
  'capitalize', 'text-xl', 'text-gray-600', 'max-w-2xl', 'mb-12',
  'grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6',
  'rounded-lg', 'shadow-md', 'p-6', 'bg-white', 'hover:shadow-lg',
  'transition-shadow', 'duration-300', 'flex', 'items-center', 'justify-center',
  'space-y-4', 'space-x-4', 'w-full', 'h-full', 'relative', 'absolute',
  'top-0', 'bottom-0', 'left-0', 'right-0', 'z-10', 'z-20'
];

// Create mapping of original to obfuscated class names
const classMapping = {};
tailwindClasses.forEach(className => {
  classMapping[className] = generateObfuscatedClassName(className);
});

// Function to obfuscate HTML content
function obfuscateHTMLContent(content) {
  let obfuscatedContent = content;
  
  // Replace class names in class attributes
  obfuscatedContent = obfuscatedContent.replace(/class="([^"]+)"/g, (match, classes) => {
    const classArray = classes.split(' ');
    const obfuscatedClasses = classArray.map(className => {
      return classMapping[className] || className;
    });
    return `class="${obfuscatedClasses.join(' ')}"`;
  });

  // Replace class names in className attributes (for React)
  obfuscatedContent = obfuscatedContent.replace(/className="([^"]+)"/g, (match, classes) => {
    const classArray = classes.split(' ');
    const obfuscatedClasses = classArray.map(className => {
      return classMapping[className] || className;
    });
    return `className="${obfuscatedClasses.join(' ')}"`;
  });

  return obfuscatedContent;
}

// Function to create obfuscated CSS
function createObfuscatedCSS() {
  let css = '/* Obfuscated CSS for production */\n';
  
  Object.entries(classMapping).forEach(([original, obfuscated]) => {
    // Get Tailwind CSS equivalent
    const cssRules = getTailwindCSS(original);
    if (cssRules) {
      css += `.${obfuscated} { ${cssRules} }\n`;
    }
  });
  
  return css;
}

// Basic Tailwind CSS to actual CSS mapping
function getTailwindCSS(className) {
  const cssMap = {
    'min-h-screen': 'min-height: 100vh;',
    'bg-gray-50': 'background-color: #f9fafb;',
    'py-8': 'padding-top: 2rem; padding-bottom: 2rem;',
    'container': 'max-width: 1200px;',
    'mx-auto': 'margin-left: auto; margin-right: auto;',
    'px-4': 'padding-left: 1rem; padding-right: 1rem;',
    'text-center': 'text-align: center;',
    'mb-6': 'margin-bottom: 1.5rem;',
    'text-4xl': 'font-size: 2.25rem; line-height: 2.5rem;',
    'font-bold': 'font-weight: 700;',
    'text-gray-900': 'color: #111827;',
    'mb-4': 'margin-bottom: 1rem;',
    'capitalize': 'text-transform: capitalize;',
    'text-xl': 'font-size: 1.25rem; line-height: 1.75rem;',
    'text-gray-600': 'color: #4b5563;',
    'max-w-2xl': 'max-width: 42rem;',
    'mb-12': 'margin-bottom: 3rem;',
    'grid': 'display: grid;',
    'grid-cols-1': 'grid-template-columns: repeat(1, minmax(0, 1fr));',
    'md:grid-cols-2': '@media (min-width: 768px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }',
    'lg:grid-cols-3': '@media (min-width: 1024px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }',
    'gap-6': 'gap: 1.5rem;',
    'rounded-lg': 'border-radius: 0.5rem;',
    'shadow-md': 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);',
    'p-6': 'padding: 1.5rem;',
    'bg-white': 'background-color: #ffffff;',
    'hover:shadow-lg': 'hover: { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }',
    'transition-shadow': 'transition-property: box-shadow;',
    'duration-300': 'transition-duration: 300ms;',
    'flex': 'display: flex;',
    'items-center': 'align-items: center;',
    'justify-center': 'justify-content: center;',
    'space-y-4': 'gap: 1rem; flex-direction: column;',
    'space-x-4': 'gap: 1rem;',
    'w-full': 'width: 100%;',
    'h-full': 'height: 100%;',
    'relative': 'position: relative;',
    'absolute': 'position: absolute;',
    'top-0': 'top: 0;',
    'bottom-0': 'bottom: 0;',
    'left-0': 'left: 0;',
    'right-0': 'right: 0;',
    'z-10': 'z-index: 10;',
    'z-20': 'z-index: 20;'
  };
  
  return cssMap[className];
}

// Function to process build files
function obfuscateBuildFiles(buildDir) {
  const processFile = (filePath) => {
    if (filePath.endsWith('.html')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const obfuscatedContent = obfuscateHTMLContent(content);
      fs.writeFileSync(filePath, obfuscatedContent);
      console.log(`✓ Obfuscated HTML: ${path.relative(buildDir, filePath)}`);
    }
  };

  const walkDir = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else {
        processFile(filePath);
      }
    });
  };

  walkDir(buildDir);
}

// Main execution
console.log('🔧 Starting post-build obfuscation...');

const buildDir = path.join(__dirname, '../.next');
const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(buildDir)) {
  // Create obfuscated CSS file
  const obfuscatedCSS = createObfuscatedCSS();
  const cssOutputPath = path.join(publicDir, 'obfuscated.css');
  fs.writeFileSync(cssOutputPath, obfuscatedCSS);
  console.log('✓ Created obfuscated CSS file');

  // Save class mapping for reference
  const mappingPath = path.join(__dirname, 'class-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(classMapping, null, 2));
  console.log('✓ Saved class mapping file');

  // Obfuscate HTML files
  obfuscateBuildFiles(buildDir);
  
  console.log('✅ Post-build obfuscation completed successfully!');
  console.log(`📊 Obfuscated ${Object.keys(classMapping).length} CSS classes`);
} else {
  console.error('❌ Build directory not found. Run npm run build first.');
  process.exit(1);
}