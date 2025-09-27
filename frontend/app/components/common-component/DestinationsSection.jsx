import SectionHeader from './SectionHeader';
import DestinationsRow from './DestinationsRow';

const DestinationsSection = ({ 
  category, 
  title, 
  highlightText, 
  titleSuffix = "",
  description, 
  limit = 9,
  className = "py-12 lg:py-16 bg-white"
}) => {
  const headingId = `${category}-destinations-heading`;
  const fullTitle = `${title} ${titleSuffix}`.trim();
  
  return (
    <section 
      className={className}
      aria-labelledby={headingId}
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          id={headingId}
          title={fullTitle}
          highlightText={highlightText}
          description={description}
        />
        <DestinationsRow limit={limit} category={category} />
      </div>
    </section>
  );
};

export default DestinationsSection;