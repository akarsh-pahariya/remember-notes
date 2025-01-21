const SortBy = () => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sortDropdown" className="text-white">
        Sort By:
      </label>
      <select
        id="sortDropdown"
        className="bg-gray-700 text-white p-2 rounded focus:outline-none"
        onChange={(e) => console.log('Sort by:', e.target.value)}
      >
        <option value="latest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
};

export default SortBy;
