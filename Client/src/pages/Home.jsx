import Notes from '../components/Notes';
import CreateNote from '../components/CreateNote';
import useFetchNotes from '../features/useFetchNotes';
import { useSelector } from 'react-redux';
import SortBy from '../components/SortBy';

const Home = () => {
  const { fetchData } = useFetchNotes();
  const notes = useSelector((store) => store.notes.notes);

  return (
    <div className="h-[609px] flex bg-black">
      <div className="w-1/2 bg-gray-800 shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-white">
            Your Notes: {notes?.length}
          </h2>
          <SortBy />
        </div>
        <div className="overflow-y-auto h-[calc(100%-64px)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 hover:scrollbar-thumb-gray-500">
          {notes?.map((note) => (
            <Notes key={note._id} data={note} fetchData={fetchData} />
          ))}
        </div>
      </div>
      <CreateNote fetchNotes={fetchData} />
    </div>
  );
};

export default Home;
