'use strict'
const axios = require('axios')
class Controller {
	constructor(Config, IsNotBotValidate, MessageString) {
		this.config = Config
		this.urlApi = Config.API
		this.messageString = MessageString
		this.isNotBotValidate = IsNotBotValidate
	}

	/*
	 * Metodo que se encarga de hacer las peticiones al backend
	 * los controladores que heredan hacen la peticion a este metodo
	 */
	async apiRequest(request) {
		if (this.isNotBotValidate.index(request.context)) {
			try {
				const optionAxios = {
					headers: {
						'X-API-Bot-Token-Origin': this.config.TOKEN_ORIGIN
					},
					method: request.method
				}
				if (request.dataSend) optionAxios.data = request.dataSend
				if (request.auth) optionAxios.headers.Authorization = request.auth

				const dataAxios = await axios(
					`${this.urlApi}/${request.endpoint}`,
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
				console.error(error)
				request.context.reply(this.messageString.serverError)
				return null
			}
		}
	}
}
module.exports = Controller
