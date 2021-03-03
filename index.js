'use strict'
const container = require('./container')
const config = container.resolve('Config')
const app = container.resolve('App')
container.resolve('ComandsRegister')
container.resolve('EventsRegister')

app
	.start()
	.then(async data => {
		console.info(`Bot corriendo en -> ${data.botUrl}`)
		console.info(`Aplicacion corriendo en -> ${config.ORIGIN}:${data.port}`)
	})
	.catch(error => {
		console.log(error)
		process.exit()
	})
