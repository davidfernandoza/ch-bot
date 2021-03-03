'use strict'
const Express = require('express')

class StartUp {
	constructor({ Config, Bot, UrlBotService }) {
		this.config = Config
		this.express = Express()
		this.bot = Bot
		this.urlBotService = UrlBotService
	}

	/*
	 * Inicia la conexion del bot y se inicia el servidor
	 */
	async start() {
		return new Promise(async (resolve, reject) => {
			try {
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
