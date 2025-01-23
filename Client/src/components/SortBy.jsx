import { useDispatch, useSelector } from 'react-redux';
import { updateSort } from '../store/slices/filtersSlice';
import useFilterNotes from '../features/useFilterNotes';
import { useEffect, useRef } from 'react';

const SortBy = () => {
  const sort = useSelector((store) => store.filters.sort);
  const fetchFilteredNotes = useFilterNotes();
  const dispatch = useDispatch();
  const value = useRef(0);

  useEffect(() => {
    if (value.current > 1) fetchFilteredNotes();
    value.current = 2;
  }, [sort, fetchFilteredNotes]);

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sortDropdown" className="text-white">
        Sort By:
      </label>
      <select
        id="sortDropdown"
        className="bg-gray-700 text-white p-2 rounded focus:outline-none"
        onChange={(e) => {
          dispatch(updateSort(e.target.value));
        }}
      >
        <option value="-createdAt">Newest First</option>
        <option value="createdAt">Oldest First</option>
        <option value="-importance">Importance</option>
      </select>
    </div>
  );
};

export default SortBy;
