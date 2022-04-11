const fs = require('fs/promises')
const fsSync = require('fs')
const path = require('path')

const base = path.join(__dirname, 'temp')
const getContent = () => {
	return `date: ${Date.now()} -- ${process.argv[2]} \n`
}

async function start() {
	
	try {
		if(fsSync.existsSync(base)) {
			fs.appendFile(path.join(base, 'logs.txt'), getContent() ?? '')
			const data = await fs.readFile(path.join(base, 'logs.txt'), {encoding: 'utf-8'})
			console.log(data)
		} else {
			await fs.mkdir(base)
			fs.writeFile(path.join(base, 'logs.txt'), getContent() ?? '')
		}
		console.log('Dir created')	
	} catch (error) {
		console.log(error)
	}
}

start()
