import Image from 'next/image';
import brandsData from '../../data/brands.json';

const Brands = () => {
  return (
    <div className="block">
      <div className="w-full">
        <div className="flex">
          <div className="w-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold animate-fadeInUp">We are associated with </h2>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="p-0">
            <div className="marquee-container overflow-hidden">
              <div className="marquee-content flex flex-nowrap gap-2 sm:gap-3 md:gap-4 items-center animate-marquee">
                {brandsData.map((brand, index) => (
                  <Image key={index} src={brand.src} className="shrink-0 h-8 sm:h-10 md:h-12 lg:h-14 w-auto hover:scale-110 transition-transform duration-300" loading="lazy" alt={brand.alt} width={120} height={60} sizes="(max-width: 767px) 64px, (max-width: 1023px) 96px, 120px" />
                ))}
                {brandsData.map((brand, index) => (
                  <Image key={`dup-${index}`} src={brand.src} className="shrink-0 h-8 sm:h-10 md:h-12 lg:h-14 w-auto hover:scale-110 transition-transform duration-300" loading="lazy" alt={brand.alt} width={120} height={60} sizes="(max-width: 767px) 64px, (max-width: 1023px) 96px, 120px" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;