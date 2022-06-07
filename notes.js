const fs = require("fs");
const chalk = require("chalk");

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
	try {
		const dataBufferString = fs.readFileSync("notes.json", { encoding: "utf-8" });
		return JSON.parse(dataBufferString);
	} catch (e) {
		return [];
	}
};

const addNote = (title, body) => {
	const notes = loadNotes();

	// const duplicateNotes = notes.filter((note) => note.title === title);
	const duplicateNote = notes.find((note) => note.title === title);

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body,
		});

		saveNotes(notes);
		console.log(chalk.green.inverse("New note added!"));
	} else {
		console.log(chalk.bgRed("Note title taken!"));
	}
};

const removeNote = (title) => {
	const notesList = loadNotes();

	const notesToKeep = notesList.filter((note) => note.title !== title);

	if (notesToKeep.length === notesList.length) {
		console.log(chalk.bgRed("No note found!"));
	} else {
		saveNotes(notesToKeep);
		console.log(chalk.green.inverse("Note removed!"));
	}
};

const listNotes = () => {
	const notesList = loadNotes();

	console.log(chalk.bgGreen("Your Notes..."));
	notesList.forEach((notes) =>
		console.log(chalk.bgRed("Title:") + " " + chalk.bgBlue(notes.title))
	);
};

const readNote = (title) => {
	const notesList = loadNotes();

	const noteToRead = notesList.find((note) => note.title === title);

	if (noteToRead) {
		console.log(chalk.bgBlue(noteToRead.title) + ": " + noteToRead.body);
	} else {
		console.log(chalk.bgRed("No note found?"));
	}
};

module.exports = {
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote,
};
