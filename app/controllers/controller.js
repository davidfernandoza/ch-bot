'use strict'
const axios = require('axios')
class Controller {
	constructor(Config, Bot, IsNotBotValidate, MessageString) {
		this.config = Config
		this.bot = Bot
		this.urlApi = Config.API
		this.messageString = MessageString
		this.isNotBotValidate = IsNotBotValidate
	}

	/*
	 * Metodo que se encarga de hacer las peticiones al backend
	 * los controladores que heredan hacen la peticion a este metodo
	 */
	async apiRequest(options, dataSend = null) {
		if (this.isNotBotValidate.index(options.context)) {
			try {
				const optionAxios = {
					headers: {
						'X-API-Bot-Token-Origin': this.config.TOKEN_ORIGIN
					},
					method: options.method
				}
				if (dataSend) optionAxios.data = dataSend
				if (options.auth) optionAxios.headers.Authorization = options.auth

				const dataAxios = await axios(
					`${this.urlApi}/${options.endpoint}`,
					optionAxios
				)

				if (dataAxios.status >= 200 && dataAxios.status < 300) {
					if (typeof dataAxios.data === 'object') {
						if (Object.keys(dataAxios.data).length === 0) return null
						return dataAxios.data
					}
					return dataAxios.data
				} else {
					throw new Error(dataAxios)
				}
			} catch (error) {
				console.error(error.response)
				this.bot.telegram.sendMessage(
					options.context.from.id,
					this.messageString.serverError
				)
				return null
			}
		}
	}
}
module.exports = Controller
