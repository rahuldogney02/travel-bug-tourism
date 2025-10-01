"use client"
import Link from 'next/link';
import Image from 'next/image';
import destinationsData from  '../../data/destinations.json';

const KNOWN_INTERNATIONAL = [
  'bali',
  'thailand',
  'vietnam',
  'europe',
  'malaysia',
  'singapore',
  'maldives',
  'bangkok',
];

// Explicit filename normalization map (slug -> actual filename stem in /public) to survive
// case + space + underscore inconsistencies on case-sensitive prod (Vercel).
// If you rename files to consistent lowercase-hyphen forms you can delete this.
const DESTINATION_FILENAME_MAP = {
  // Domestic (map to actual file stems exactly as in /public)
  'amritsar': 'Amritsar',
  'coorg': 'coorg',
  'darjeling': 'Darjeling', // correct misspelling in data vs asset capitalization
  'delhi-agra-jaipur': 'Delhi',       // representative image
  'goa': 'goa',
  'himachal-pradesh': 'himachal pradesh',
  'jammu-kashmir': 'Jammu_Kashmir',
  'kerala': 'kerala',
  'kodaikanal': 'Kodaikanal',
  'ladakh': 'ladakh',
  'mysore': 'Mysore',
  'ooty': 'Ooty',
  'rajasthan': 'Rajasthan',
  'shirdi': 'Shiridi', // spelling mismatch in asset
  'tirupati': 'Tirupathi', // spelling mismatch in asset
  'wayanad': 'Wayanad',
  // International
  'bali': 'Bali',
  'bangkok': 'Bangkok',
  'europe': 'Europe',
  'malaysia': 'Malaysia',
  'maldives': 'Maldives',
  'singapore': 'Singapore',
  'sri-lanka': 'Sri Lanka',
  'thailand': 'Thailand',
  'vietnam': 'Vietnam',
};

// Slug utility (moved above candidate generator so it can be used there)
const slugify = (s = '') =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Greatly simplified candidate generator to avoid many 404s in production.
// Strategy:
// 1. Use explicit backend image URL if provided.
// 2. Try canonical slug with limited extensions (webp, jpg, png) – these should match what you actually store.
// 3. Final fallback to hero.png.
// This keeps network overhead low and first successful image fast.
const generateImageCandidates = (category, item) => {
  const list = [];
  if (item?.image) list.push(item.image);
  const slug = (item?.slug || slugify(item?.title || '')).toLowerCase();
  const mappedStem = DESTINATION_FILENAME_MAP[slug];

  // Build a concise but resilient stem set
  const stems = new Set();
  if (mappedStem) stems.add(mappedStem);            // exact asset stem
  stems.add(slug);                                  // raw slug lowercase
  // Capitalized variant (many files start with capital letter)
  const capitalized = slug.charAt(0).toUpperCase() + slug.slice(1);
  stems.add(capitalized);
  if (mappedStem) {
    // space + underscore variants if mapping includes them
    if (mappedStem.includes(' ')) stems.add(mappedStem.replace(/ /g, '-').toLowerCase());
    if (mappedStem.includes('_')) stems.add(mappedStem.replace(/_/g, '-').toLowerCase());
  }

  // Order extensions by what actually exists in repo (svg, png, jpg). Drop webp (not present) to avoid 404s.
  const exts = ['svg', 'png', 'jpg'];
  stems.forEach(stem => {
    exts.forEach(ext => list.push(`/image/destination/${category}/${stem}.${ext}`));
  });
  list.push('/hero.png');
  return [...new Set(list)];
};

import { useState } from 'react';

function Card({ href, title, candidates, showLabels, priority = false }) {
  const [idx, setIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const src = candidates[idx] || '/hero.png';

  const handleImageError = () => {
    if (idx < candidates.length - 1) {
      setIdx(n => n + 1);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <div className="group relative aspect-[4/5] rounded-xl ring-1 ring-dark/10 hover:ring-brand/40 hover:shadow-lg transition-all duration-300 ease-out bg-white/70 dark:bg-dark/30 backdrop-blur animate-float">
      <Link href={href} className="absolute inset-0 rounded-xl overflow-hidden" aria-label={`Explore ${title}`}>
        {/* Skeleton while loading */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100" aria-label="Loading image">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={src}
          alt={title}
          fill
            /* sizes tuned for 3->6 column responsive grid */
          sizes="(max-width:640px) 33vw, (max-width:1024px) 16vw, 12vw"
          priority={priority}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNlZWYnIC8+PC9zdmc+"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
          onLoadingComplete={handleImageLoad}
          fetchPriority={priority ? 'high' : 'auto'}
        />
        
        {/* Error state - show title when no image loads */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white text-sm font-medium p-2 text-center">
            {title}
          </div>
        )}
        
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
      </Link>
    </div>
  );
}

/**
 * Reusable single-row destinations component
 * - Uses images from public/image/destination/{category}/{slug}.svg first,
 *   then tries png, then primary-images mapping, then hero.png.
 */
const DestinationsRow = ({
  items = destinationsData.destinations,
  limit = 9,
  category = 'domestic',
  className = '',
  showLabels = true,
}) => {
  const prefix = category === 'international' ? '/category/international/destination' : '/category/domestic/destination';

  // If international items are not provided, synthesize a default list
  const providedLooksInternational = Array.isArray(items) && items.some((i) => {
    const s = i?.slug || slugify(i?.title || '');
    return KNOWN_INTERNATIONAL.includes(s);
  });
  const itemsToRender =
    category === 'international' && !providedLooksInternational
      ? KNOWN_INTERNATIONAL.map((s) => ({ slug: s, title: s.replace(/-/g, ' ') }))
      : items;

  return (
    <section className={`py-12 lg:py-5 bg-gradient-to-br from-gray-50 to-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 capitalize">
            {category} Destinations
          </h2>
          <p className="text-gray-600 mt-2">
            Discover amazing {category} travel destinations
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4 py-2 px-1" aria-label="Destinations list">
          {itemsToRender.slice(0, limit).map((destination, index) => {
          const hrefSlug = destination?.slug || slugify(destination?.title) || String(index);
          const title = destination?.banner?.title || destination?.title || hrefSlug;

          // Build candidate image list with multiple variations
          const candidates = generateImageCandidates(category, destination);

          return (
            <Card
              key={`${category}-${hrefSlug}`}
              href={`${prefix}/${hrefSlug}`}
              title={title}
              candidates={candidates}
              showLabels={showLabels}
              priority={index < 6}
            />
          );
        })}
        </div>
      </div>
    </section>
  );
};

export default DestinationsRow;
