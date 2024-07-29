import Orm from "ormjson";
interface Note {
	_id?: string;
	name: string;
	content: string;
	date: string;
}
const DBNotes = new Orm<Note>("data/note.json");

type INotePayload = Omit<Note, "_id">;
export const getNoteById = async (id: string) => {
	const note = await DBNotes.findById(id);
	return note;
};

export const getNotes = async () => {
	const notes = await DBNotes.findAll();
	return notes;
};
export const createNote = async (data: INotePayload) => {
	const note = await DBNotes.create(data);
	return note;
};
export const updateNote = async (id: string, data: Omit<INotePayload, "date">) => {
	const note = await DBNotes.update(id, data);

	return note;
};
export const deleteNote = async (id: string) => {
	await DBNotes.delete(id);

	return true;
};
