import NoteCard from './NoteCard';
import ShimmerEffect from './ShimmerEffect';

const NotesGrid = ({ notes, isLoading, handleUpdatedNote, handleDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading ? (
        [...Array(6)].map((_, index) => <ShimmerEffect key={index} />)
      ) : notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            handleUpdatedNote={handleUpdatedNote}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-xl text-teal-500">No notes available</p>
      )}
    </div>
  );
};

export default NotesGrid;
