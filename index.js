'use strict'
const providers = require('./providers')
const config = providers.resolve('Config')
const app = providers.resolve('App')
providers.resolve('BotKernel')

app.start().then(async data => {
	console.info(`Bot corriendo en -> ${data.botUrl}`)
	console.info(`Aplicacion corriendo en -> ${config.ORIGIN}:${data.port}`)
	console.info(`Base de datos conectada`)
})
