'use strict'
const axios = require('axios')
class Repository {
	constructor(config, baseUrl) {
		this.errorHandler = new config.ERROR_HANDLER()
		this.config = config
		this.baseUrl = baseUrl
		this.optionAxios = {
			headers: {
				'X-API-Bot-Token-Origin': this.config.TOKEN_ORIGIN
			}
		}
	}

	async get(endpoint) {
		try {
			this.optionAxios.method = 'GET'
			this.optionAxios.url = `${this.baseUrl}/${endpoint}`
			return this.responseFormater(await axios(this.optionAxios))
		} catch (error) {
			this.errorHandler(error)
		}
	}

	async post(endpoint, data) {
		try {
			this.optionAxios.method = 'POST'
			this.optionAxios.url = `${this.baseUrl}/${endpoint}`
			this.optionAxios.data = data
			return this.responseFormater(await axios(this.optionAxios))
		} catch (error) {
			this.errorHandler(error)
		}
	}

	async put(endpoint, data) {
		try {
			this.optionAxios.method = 'PUT'
			this.optionAxios.url = `${this.baseUrl}/${endpoint}`
			this.optionAxios.data = data
			return this.responseFormater(await axios(this.optionAxios))
		} catch (error) {
			this.errorHandler(error)
		}
	}

	async delete(endpoint) {
		try {
			this.optionAxios.method = 'DELETE'
			this.optionAxios.url = `${this.baseUrl}/${endpoint}`
			return this.responseFormater(await axios(this.optionAxios))
		} catch (error) {
			this.errorHandler(error)
		}
	}

	async responseFormater(response) {
		if (response.status >= 200 && response.status < 300) {
			if (typeof response.data === 'object') {
				if (Object.keys(response.data).length === 0) return null
			}
			return response.data
		} else {
			this.errorHandler(response)
			return null
		}
	}
}
module.exports = Repository
