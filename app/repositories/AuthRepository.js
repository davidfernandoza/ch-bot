'use strict'
const Repository = require('./Repository')

class AuthRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'auth'
	}

	async login(dataAuth) {
		try {
			return await super.post(`${this.prefix}/telegram/login`, dataAuth)
		} catch (error) {
			throw new Error(error)
		}
	}

	async logout(authToken) {
		try {
			return await super.post(`${this.prefix}/logout`, {}, authToken)
		} catch (error) {
			throw new Error(error)
		}
	}

	async refresh(authToken) {
		try {
			return await super.post(`${this.prefix}/refresh`, {}, authToken)
		} catch (error) {
			throw new Error(error)
		}
	}

	async getRegistry(authToken) {
		try {
			return await super.post(`${this.prefix}/get-registry`, {}, authToken)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = AuthRepository
