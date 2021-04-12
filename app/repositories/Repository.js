'use strict'
const axios = require('axios')
class Repository {
	constructor(config) {
		this.config = config
		this.baseUrl = config.API
		this.optionAxios = {
			headers: {
				'X-API-Bot-Token-Origin': this.config.TOKEN_ORIGIN
			}
		}
	}

	async get(endpoint, access_token) {
		try {
			if (access_token) this.optionAxios.headers.access_token = access_token
			return this.responseFormater(
				await axios.get(`${this.baseUrl}/${endpoint}`, this.optionAxios)
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async post(endpoint, data, access_token) {
		try {
			if (access_token) this.optionAxios.headers.access_token = access_token
			return this.responseFormater(
				await axios.post(`${this.baseUrl}/${endpoint}`, data, this.optionAxios)
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async put(endpoint, data, access_token) {
		try {
			if (access_token) this.optionAxios.headers.access_token = access_token
			return this.responseFormater(
				await axios.put(`${this.baseUrl}/${endpoint}`, data, this.optionAxios)
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async delete(endpoint, access_token) {
		try {
			if (access_token) this.optionAxios.headers.access_token = access_token
			return this.responseFormater(
				await axios.delete(`${this.baseUrl}/${endpoint}`, this.optionAxios)
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async responseFormater(response) {
		if (response.status >= 200 && response.status < 300) {
			if (typeof response.data === 'object') {
				if (Object.keys(response.data).length === 0) return null
			}
			return response.data
		} else {
			throw new Error({ method: responseFormater.name, data: response })
		}
	}
}
module.exports = Repository
