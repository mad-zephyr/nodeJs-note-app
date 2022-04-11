const chalk = require('chalk')
const express = require('express')
const path = require('path')
const { addNotes, deleteNote, getNotes, getNoteById, editNotes } = require('./notes.controller')

const PORT = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.urlencoded({ extended: true }), express.json())
app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Express app',
		notes: await getNotes(),
		created: false
	})
})


app.get('/:id', async (req, res) => {
	res.json({ note: await getNoteById(req.params.id)})
})

app.post('/', async (req, res) => {
	await addNotes(req.body.title)
	res.render('index', {
		title: 'Express app',
		notes: await getNotes(),
		created: true
	})
})

app.delete('/:id', async (req, res) => {
	console.log('id', req.params.id)
	deleteNote(req.params.id)
	res.render('index', {
		title: 'Express app',
		notes: await getNotes(),
		created: false
	})
})

app.put('/:id', async (req, res) => {
	await editNotes(req.params.id)
	res.render('index', {
		title: 'Express app',
		notes: await getNotes(),
		created: false
	})
})

app.listen(PORT, () => {
	console.log(chalk.green.inverse(`Server has been started on port: ${PORT}`))
})