'use strict'
const provider = require('./config/providers')
const config = provider.resolve('Config')
const app = provider.resolve('App')
provider.resolve('BotRegister')

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
