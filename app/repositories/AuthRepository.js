'use strict'
const Repository = require('./Repository')

class AuthRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'auth'
	}

	async login(dataAuth) {
		return await super.post(`${this.prefix}/telegram/login`, dataAuth)
	}

	async logout(authToken) {
		return await super.post(`${this.prefix}/logout`, {}, authToken)
	}

	async refresh(authToken) {
		return await super.post(`${this.prefix}/refresh`, {}, authToken)
	}

	async getRegistry(authToken) {
		return await super.post(`${this.prefix}/get-registry`, {}, authToken)
	}
}

module.exports = AuthRepository
