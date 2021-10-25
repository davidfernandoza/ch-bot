'use strict'
const moment = require('moment')

class AuthDomain {
	constructor({ ClientRepository, AuthRepository }) {
		this.clientRepository = ClientRepository
		this.authRepository = AuthRepository
	}

	async getAccessToken(telegram_id) {
		let client = await this.clientRepository.getClientByTelegramIdInMongo(
				telegram_id
			),
			dateNow = moment().format('YYYY-MM-DD HH:mm:ss'),
			dateUser = moment(client.auth.expires_in).format('YYYY-MM-DD HH:mm:ss')
		if (!client.auth) return false
		if (dateUser < dateNow) client = await this.login(client)
		return client.auth.access_token
	}

	async login(client) {
		const auth = await this.authRepository.login({
			telegram_id: client.telegram_id,
			password: client.telegram_id
		})
		client.auth = {
			...auth,
			expires_in: moment().add(auth.expires_in, 's').format('YYYY-MM-DD')
		}
		await this.clientRepository.updateClientInMongo(client)
		return client
	}
}

module.exports = AuthDomain
