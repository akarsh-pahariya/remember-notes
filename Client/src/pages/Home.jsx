import Notes from '../components/Notes';
import CreateNote from '../components/CreateNote';
import useFetchNotes from '../features/useFetchNotes';
import { useSelector } from 'react-redux';

const Home = () => {
  const { fetchData } = useFetchNotes();
  const notes = useSelector((store) => store.notes.notes);

  return (
    <div className="h-[609px] flex bg-black">
      <div className="w-1/2 bg-gray-800 shadow-md p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Your Notes: {notes?.length}
        </h2>
        {notes?.map((note) => (
          <Notes key={note._id} data={note} fetchData={fetchData} />
        ))}
      </div>
      <CreateNote fetchNotes={fetchData} />
    </div>
  );
};

export default Home;
