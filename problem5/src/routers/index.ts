import { Request, Response, Router } from "express";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../services";
import { body } from "express-validator";
import { validate } from "../middlewares/validate";
import { formatDateTime } from "../utils";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
	const notes = await getNotes();
	res.render("pages/index", {
		title: "Note",
		notes: notes,
	});
});
router.get("/add", (_req: Request, res: Response) => {
	res.render("pages/add", {
		title: "Add Note",
	});
});
router.post(
	"/add",
	validate([body("name").isLength({ min: 5 }), body("content").isLength({ min: 5 })]),
	async (req: Request, res: Response) => {
		const { name, content } = req.body;
		const note = await createNote({
			name: name,
			content: content,
			date: formatDateTime(Date.now()),
		});

		return res.render("pages/add", {
			title: "Add Note",
		});
	}
);
router.get("/:uuid", async (req: Request, res: Response) => {
	const id = req.params.uuid;
	const note = await getNoteById(id);
	if (!note) {
		return res.render("pages/404", {
			title: "404",
		});
	}
	return res.render("pages/details", {
		title: "Details Note",
		note,
	});
});
router.put(
	"/:uuid",
	validate([body("name").isLength({ min: 5 }), body("content").isLength({ min: 5 })]),
	async (req: Request, res: Response) => {
		const { name, content } = req.body;
		const id = req.params.uuid;
		const note = await updateNote(id, {
			name: name,
			content: content,
		});
		if (note) {
			return res.send("Item update successfully");
		}
		return res.status(500).send("There was a problem update the item.");
	}
);
router.delete("/:uuid", async (req: Request, res: Response) => {
	const id = req.params.uuid;
	const note = await deleteNote(id);
	if (note) {
		return res.send("Item deleted successfully");
	}
	return res.status(500).send("There was a problem deleting the item.");
});
export default router;
