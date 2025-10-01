"use client";

import Image from 'next/image';
import { getOptimizedImageProps } from '../../utils/imageOptimization';
import { useIntersectionObserver } from '../../hooks/useImageOptimization';
import brandsData from '../../data/brands.json';

const Brands = () => {
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver();
  
  return (
    <div 
      ref={ref}
      className="block" 
      style={{
        background: 'linear-gradient(135deg, #11664d 0%, #173334 55%, #11664d 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-32 h-32 rounded-full opacity-10 animate-float"
          style={{
            background: 'radial-gradient(circle, #C89364, transparent)',
            top: '10%',
            left: '15%',
            animationDelay: '0s',
            animationDuration: '20s'
          }}
        ></div>
        <div 
          className="absolute w-24 h-24 rounded-full opacity-15 animate-float"
          style={{
            background: 'radial-gradient(circle, #C89364, transparent)',
            top: '60%',
            right: '20%',
            animationDelay: '7s',
            animationDuration: '25s'
          }}
        ></div>
        <div 
          className="absolute w-20 h-20 rounded-full opacity-12 animate-float"
          style={{
            background: 'radial-gradient(circle, #C89364, transparent)',
            bottom: '20%',
            left: '70%',
            animationDelay: '14s',
            animationDuration: '18s'
          }}
        ></div>
      </div>
      
      {/* Enhanced overlay effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(circle at 25% 20%, rgba(200,147,100,0.25), transparent 60%)',
          mixBlendMode: 'screen'
        }}
      ></div>
      
      {/* Subtle animated border */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,147,100,0.3), transparent)',
          transform: 'translateX(-100%)',
          animation: 'shimmer 8s ease-in-out infinite'
        }}
      ></div>
      
      <div className="w-full relative z-10 py-8">
        <div className="flex">
          <div className="w-full">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold animate-fadeInUp drop-shadow-lg" style={{color: '#C89364'}}>
                We are associated with
                <span className="block text-sm font-normal mt-2 opacity-80">Trusted partners in your journey</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="p-0">
            <div className="marquee-container overflow-hidden">
              <div className="marquee-content flex flex-nowrap gap-2 sm:gap-3 md:gap-4 items-center animate-marquee">
                {/* Only render images when component is in view */}
                {(hasIntersected || isIntersecting) && (
                  <>
                    {brandsData.map((brand, index) => (
                      <Image 
                        key={index} 
                        {...getOptimizedImageProps({
                          src: brand.src,
                          alt: brand.alt,
                          width: 120,
                          height: 60,
                          priority: false,
                          quality: 70, // Lower quality for brand logos
                          sizes: "(max-width: 767px) 64px, (max-width: 1023px) 96px, 120px",
                          enableBlur: true,
                          blurColor: "#f3f4f6"
                        })}
                        className="shrink-0 h-8 sm:h-10 md:h-12 lg:h-14 w-auto hover:scale-110 transition-transform duration-300" 
                      />
                    ))}
                    {brandsData.map((brand, index) => (
                      <Image 
                        key={`dup-${index}`} 
                        {...getOptimizedImageProps({
                          src: brand.src,
                          alt: brand.alt,
                          width: 120,
                          height: 60,
                          priority: false,
                          quality: 70,
                          sizes: "(max-width: 767px) 64px, (max-width: 1023px) 96px, 120px",
                          enableBlur: true,
                          blurColor: "#f3f4f6"
                        })}
                        className="shrink-0 h-8 sm:h-10 md:h-12 lg:h-14 w-auto hover:scale-110 transition-transform duration-300" 
                      />
                    ))}
                  </>
                )}
                {/* Loading placeholder when not in view */}
                {!hasIntersected && !isIntersecting && (
                  <div className="flex gap-4 items-center animate-pulse">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="bg-white/20 rounded h-8 sm:h-10 md:h-12 lg:h-14 w-16 sm:w-20 md:w-24 lg:w-28"></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;