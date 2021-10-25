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
		if (access_token)
			this.optionAxios.headers.Authorization = `Bearer ${access_token}`
		return this.responseFormater(
			await axios.get(`${this.baseUrl}/${endpoint}`, this.optionAxios)
		)
	}

	async post(endpoint, data, access_token) {
		if (access_token)
			this.optionAxios.headers.Authorization = `Bearer ${access_token}`
		return this.responseFormater(
			await axios.post(`${this.baseUrl}/${endpoint}`, data, this.optionAxios)
		)
	}

	async put(endpoint, data, access_token) {
		if (access_token)
			this.optionAxios.headers.Authorization = `Bearer ${access_token}`
		return this.responseFormater(
			await axios.put(`${this.baseUrl}/${endpoint}`, data, this.optionAxios)
		)
	}

	async delete(endpoint, access_token) {
		if (access_token)
			this.optionAxios.headers.Authorization = `Bearer ${access_token}`
		return this.responseFormater(
			await axios.delete(`${this.baseUrl}/${endpoint}`, this.optionAxios)
		)
	}

	async responseFormater(response) {
		if (typeof response.data === 'object') {
			if (Object.keys(response.data).length === 0) return null
		}
		return response.data
	}
}
module.exports = Repository
