import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFilterNotes from '../features/useFilterNotes';

const PaginationControls = ({ totalNotes }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const fetchFilteredNotes = useFilterNotes();
  const value = useRef(0);
  const page = parseInt(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(totalNotes / 5);

  useEffect(() => {
    if ((page > totalPages || page < 1) && value > 0) {
      console.log(page);
      window.alert('Please insert a valid page');
      setSearchParams({ page: '1' });
      return;
    } else if (value > 0) {
      fetchFilteredNotes();
    }

    value.current = 1;
  }, [page, fetchFilteredNotes, totalPages, setSearchParams]);

  const handleNext = () => {
    if (page < totalPages) setSearchParams({ page: page + 1 });
  };

  const handlePrevious = () => {
    if (page > 1) setSearchParams({ page: page - 1 });
  };

  return (
    <div className="flex justify-center items-center mt-3">
      <button
        onClick={handlePrevious}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
      >
        Previous
      </button>
      <div className="mx-4 text-gray-300">
        Page <span className="font-semibold">{page}</span> of{' '}
        <span className="font-semibold">{totalPages}</span>
      </div>
      <button
        onClick={handleNext}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
