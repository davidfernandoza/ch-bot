'use strict'
const provider = require('./config/Providers')
const config = provider.resolve('Config')
const app = provider.resolve('App')
provider.resolve('BotKernel')

app.start().then(async data => {
	console.info(`Bot corriendo en -> ${data.botUrl}`)
	console.info(`Aplicacion corriendo en -> ${config.ORIGIN}:${data.port}`)
	console.info(`Base de datos conectada`)
})
