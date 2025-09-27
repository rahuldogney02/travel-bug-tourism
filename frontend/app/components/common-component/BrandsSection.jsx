import SectionHeader from './SectionHeader';
import Brands from './Brands';

const BrandsSection = ({ 
  title = "Our", 
  highlightText = "Trusted", 
  titleSuffix = "Partners",
  description = "We partner with the best brands in the industry to ensure quality and reliability",
  className = "py-5 lg:py-5 bg-gradient-to-r from-brand/2 to-leaf/2"
}) => {
  const headingId = "brands-heading";
  
  return (
    <section 
      className={className}
      aria-labelledby={headingId}
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          id={headingId}
          title={`${title} ${titleSuffix}`}
          highlightText={highlightText}
          description={description}
        />
        <Brands />
      </div>
    </section>
  );
};

export default BrandsSection;