import topbarData from '../../data/topbarData.json';

const Topbar = () => {
  return (
    <div className="bg-beige py-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center text-sm text-off-white-700">
          {topbarData.message} - {topbarData.contactNumbers.join(', ')}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
