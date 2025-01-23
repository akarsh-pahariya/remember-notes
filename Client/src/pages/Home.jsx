import Notes from '../components/Notes';
import CreateNote from '../components/CreateNote';
import useFetchNotes from '../features/useFetchNotes';
import { useSelector } from 'react-redux';
import SortBy from '../components/SortBy';
import PaginationControls from '../components/PaginationControls';

const Home = () => {
  const { fetchData } = useFetchNotes();
  const notes = useSelector((store) => store.notes.notes);
  const totalNotes = useSelector((store) => store.notes.totalNotes);

  return (
    <div className="h-[609px] flex bg-black">
      <div className="w-1/2 bg-gray-800 shadow-md py-10 px-6">
        <div className="flex items-center justify-between mb-5 mt-[-12px]">
          <h2 className="text-2xl font-semibold text-white">
            Your Notes: {totalNotes}
          </h2>
          <SortBy />
        </div>
        <div className="overflow-y-auto h-[calc(100%-64px)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 hover:scrollbar-thumb-gray-500">
          {notes?.map((note) => (
            <Notes key={note._id} data={note} fetchData={fetchData} />
          ))}
        </div>
        <PaginationControls totalNotes={totalNotes} />
      </div>
      <CreateNote fetchNotes={fetchData} />
    </div>
  );
};

export default Home;
