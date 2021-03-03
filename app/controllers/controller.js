'use strict'
const axios = require('axios')
class Controller {
	constructor(Config, Bot, IsNotBotValidate, MessageString, Methods) {
		this.config = Config
		this.bot = Bot
		this.urlApi = Config.API
		this.messageString = MessageString
		this.isNotBotValidate = IsNotBotValidate
		this.methods = Methods
	}

	/*
	 * Metodo que se encarga de hacer las peticiones al backend
	 * los controladores que heredan hacen la peticion a este metodo
	 */
	async apiRequest(CTX, method, endPoint, dataSend = null) {
		if (this.isNotBotValidate.index(CTX)) {
			try {
				const { GET } = this.methods
				const optionAxios = {
					headers: {
						token_control: this.config.TOKEN_CONTROL
					},
					method: method,
					data: dataSend
				}
				if (dataSend == null || method == GET) delete optionAxios.data

				const dataAxios = await axios(`${this.urlApi}/${endPoint}`, optionAxios)

				if (dataAxios.status >= 200 && dataAxios.status < 300)
					return dataAxios.data
				throw new Error(dataAxios)
			} catch (error) {
				console.log(error)
				this.bot.telegram.sendMessage(CTX.from.id, this.messageString.msgE001)
				return null
			}
		}
	}
}
module.exports = Controller
