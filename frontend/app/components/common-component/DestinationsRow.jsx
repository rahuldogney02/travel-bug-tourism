"use client"
import Link from 'next/link';
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
import { useState } from 'react';

const slugify = (s = '') =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

function Card({ href, title, candidates, showLabels }) {
  const [idx, setIdx] = useState(0);
  const src = candidates[idx] || '/hero.png';

  return (
    <div className="group relative aspect-square rounded-xl ring-1 ring-dark/10 hover:ring-brand/40 hover:shadow-lg transition-all duration-300 ease-out bg-white/70 dark:bg-dark/30 backdrop-blur animate-float">
      <Link href={href} className="absolute inset-0 rounded-xl overflow-hidden" aria-label={`Explore ${title}`}>
        <img
          src={src}
          alt={title}
          loading="lazy"
          decoding="async"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          onError={() => {
            if (idx < candidates.length - 1) setIdx((n) => n + 1);
          }}
        />
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
    const s = (i?.slug || slugify(i?.title || '')).replace(/^royal-/, '');
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
          const rawSlug = destination?.slug || slugify(destination?.title) || String(index);
          const cleanSlug = rawSlug.replace(/^royal-/, '');
          const hrefSlug = category === 'international' ? (rawSlug.startsWith('royal-') ? rawSlug : `royal-${cleanSlug}`) : cleanSlug;
          const title = destination?.banner?.title || destination?.title || cleanSlug;

          // Build candidate image list
          const candidates = [
            `/image/destination/${category}/${cleanSlug}.svg`,
            `/image/destination/${category}/${cleanSlug}.png`,
            '/hero.png',
          ].filter(Boolean);

          return (
            <Card
              key={`${category}-${cleanSlug}`}
              href={`${prefix}/${hrefSlug}`}
              title={title}
              candidates={candidates}
              showLabels={showLabels}
            />
          );
        })}
        </div>
      </div>
    </section>
  );
};

export default DestinationsRow;
