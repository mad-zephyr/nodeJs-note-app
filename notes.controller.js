const fs = require('fs/promises');
const path = require('path')
const notesPath = path.join(__dirname, './dj.json')
const chalk = require('chalk')

async function addNotes(title) {
	const notes = await getNotes()
	const note = {
		title,
		id: Date.now().toString()
	}
	notes.push(note)
	await fs.writeFile(notesPath, JSON.stringify(notes, null, 2))
	console.log(chalk.green.inverse('NOTE was added'))
}

async function editNotes(editedNote) {
	const buffer = await fs.readFile(notesPath, { encoding: 'utf-8'})
	const notes = JSON.parse(buffer)
	const indexNote = notes.findIndex(note => note.id === editedNote.id)
	notes.splice(indexNote, 1, editedNote)
	await fs.writeFile(notesPath, JSON.stringify(notes, null, 2))

	return indexNote ? editedNote : null
}

async function getNotes() {
	const buffer = await fs.readFile(notesPath, { encoding: 'utf-8'})
	const notes = JSON.parse(buffer)
	return Array.isArray(notes) ? notes : []
}

async function getNoteById(id) {
	const buffer = await fs.readFile(notesPath, { encoding: 'utf-8'})
	const notes = JSON.parse(buffer)
	const findedNote = notes.find(note => note.id === id)
	console.log('findedNote: ', findedNote)
	return Array.isArray(notes) ? findedNote : null
}

async function getNotes() {
	const buffer = await fs.readFile(notesPath, { encoding: 'utf-8'})
	const notes = JSON.parse(buffer)
	return Array.isArray(notes) ? notes : []
}

async function printNotes() {
	const notes = await getNotes()
	notes.forEach(note => console.log(chalk.cyanBright.inverse(note.title, note.id)))
}

async function deleteNote(id) {
	const notes = await getNotes()
	const index = notes.findIndex(note => note.id === id)
	const deletedNote = notes.splice(index, 1)
	await fs.writeFile(notesPath, JSON.stringify(notes, null, 2))
	console.log(chalk.red.inverse(`NOTE: ${deletedNote[0].id} was deleted`))
}

module.exports =  {
	addNotes, printNotes, deleteNote, getNotes, editNotes, getNoteById
}