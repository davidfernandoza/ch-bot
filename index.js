'use strict'
const container = require('./providers')
const config = container.resolve('Config')
const app = container.resolve('App')
container.resolve('BotRegister')

app
	.start()
	.then(async data => {
		console.info(`Bot corriendo en -> ${data.botUrl}`)
		console.info(`Aplicacion corriendo en -> ${config.ORIGIN}:${data.port}`)
		console.info(`Base de datos conectada`)
	})
	.catch(error => {
		console.log(error)
		process.exit()
	})
