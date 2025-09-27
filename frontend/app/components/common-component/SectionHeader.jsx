const SectionHeader = ({ 
  id, 
  title, 
  highlightText, 
  description, 
  className = "text-center mb-6" 
}) => {
  return (
    <header className={className}>
      <h2 
        id={id} 
        className="text-3xl lg:text-4xl font-bold from-[#11664d] to-[#0d5a41] mb-4"
      >
        {title} {highlightText && <span className="text-brand">{highlightText}</span>}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </header>
  );
};

export default SectionHeader;