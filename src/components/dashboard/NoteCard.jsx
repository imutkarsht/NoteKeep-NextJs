import { UpdatePopup } from '@/components/dashboard/features/UpdatePopup';
import { DeletePopup } from '@/components/dashboard/features/DeletePopup';
import parse from 'html-react-parser';

const NoteCard = ({ note, handleUpdatedNote, handleDelete }) => {
  return (
    <div className="relative flex flex-col p-6 max-w-md max-h-[40vh] bg-gradient-to-br from-white to-gray-100 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-200 dark:border-zinc-700">
      <div className="absolute top-3 right-3 flex space-x-2">
        <UpdatePopup note={note} onUpdate={handleUpdatedNote} />
        <DeletePopup note={note} onDelete={() => handleDelete(note._id)} />
      </div>

      <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-2">
        {note.title}
      </h3>

      <p className="text-sm tiptap text-gray-700 dark:text-gray-300 leading-relaxed">
        {parse(note.content.length > 200
          ? `${note.content.substring(0, 200)}...`
          : note.content)}
      </p>

      <div className="flex items-center justify-between p-2 mt-auto gap-2">
        <div className="flex flex-wrap gap-2">
          {note.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-semibold rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
