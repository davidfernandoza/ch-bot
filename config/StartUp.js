'use strict'
const Express = require('express')
const mongoose = require('mongoose')

class StartUp {
	constructor({ Config, Bot, UrlBotService, Router }) {
		this.urlBotService = UrlBotService
		this.config = Config
		this.router = Router
		this.bot = Bot
		this.express = Express()
	}

	/*
	 * Inicia la conexion del bot y se inicia el servidor
	 */
	async start() {
		return new Promise(async (resolve, reject) => {
			try {
				/*
				 * Conexion a la base de datos
				 */
				await mongoose.connect(this.config.BD_CONNECTION_URL, {
					useNewUrlParser: true,
					useUnifiedTopology: true,
					useCreateIndex: true
				})

				const botUrl = await this.urlBotService.get()

				/*
				 * Se registra una ruta de express con el endpoint que se le pasa a
				 * telegram, este es usado para que telegram mande los mensajes.
				 *
				 * Luego se registra la ruta en telegram despues de haberla creado en express
				 */
				this.express.use(
					this.bot.webhookCallback(`/${this.config.END_POIND_BOT}`)
				)
				this.bot.telegram.setWebhook(`${botUrl}/${this.config.END_POIND_BOT}`)
				this.express.use(this.router)

				/*
				 * Correr el servidor
				 */
				const http = this.express.listen(this.config.PORT, () => {
					const { port } = http.address()
					resolve({ port: port, botUrl: botUrl })
				})
			} catch (error) {
				reject(error)
			}
		})
	}
}

module.exports = StartUp
