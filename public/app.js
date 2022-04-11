document.addEventListener('click', async (e) => {
	e.preventDefault()
	e.stopPropagation()

	if (e.target.dataset.type === 'submit') {
		const {name, value} = e.target.previousElementSibling
		post({[name]: value})
	}

	if (e.target.dataset.type === 'remove') {
		const id = e.target.dataset.id
		remove(id).then(() =>  e.target.closest('li').remove())
	}

	if (e.target.dataset.type === 'edit') {
		const id = e.target.dataset.id
		const data = await getById(id)

		const editedNote = await prompt('Edit your note', data.note.title)
		editNote({id: id, title: editedNote }).then(() => {
			e.target.closest('li').firstElementChild.textContent = editedNote
			console.log(e.target.closest('li').firstElementChild)
		})
	}
})

async function editNote(note) {
	console.log('note.id:', note.id)
	await fetch(`/${note.id}`, {
		method: 'PUT',
		headers: {
			Accept: 'text/html',
			'Content-type': 'application/json'
		},
		body: JSON.stringify(note)
	})
}

async function remove(id) {
	await fetch(`/${id}`, {method: 'DELETE'})
}

async function getById(id) {
	const data = await fetch(`/${id}`, {
		method: 'GET',
		headers: {
			Accept: 'text/plain',
			'Content-type': 'application/json'
		}
	})
	const response = await data.json()
	return response
}

async function post(data) {
	await fetch(`/`, {
		method: 'POST',
		headers: {
			Accept: 'text/html',
			'Content-type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	location.reload()
}
