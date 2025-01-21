import { useDispatch } from 'react-redux';
import { updateSort } from '../store/slices/filtersSlice';

const SortBy = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sortDropdown" className="text-white">
        Sort By:
      </label>
      <select
        id="sortDropdown"
        className="bg-gray-700 text-white p-2 rounded focus:outline-none"
        onChange={(e) => dispatch(updateSort(e.target.value))}
      >
        <option value="-createdAt">Newest First</option>
        <option value="createdAt">Oldest First</option>
        <option value="-importance">Importance</option>
      </select>
    </div>
  );
};

export default SortBy;
