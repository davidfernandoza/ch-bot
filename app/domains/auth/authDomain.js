'use strict'
const moment = require('moment')

class AuthDomain {
	constructor({ ClientRepository, AuthRepository }) {
		this.clientRepository = ClientRepository
		this.authRepository = AuthRepository
	}

	async getAccessToken(telegram_id) {
		try {
			const client = await this.clientRepository.getClientByTelegramIdInMongo(
				telegram_id
			)
			if (client.auth.expires_in > moment().format('YYYY-MM-DD')) {
				const auth = await this.authRepository.refresh(client.auth.access_token)
				client.auth = {
					...auth,
					expires_in: moment().add(auth.expires_in, 's').format('YYYY-MM-DD')
				}
				await this.clientRepository.updateClientInMongo(client)
			}
			return client.auth.access_token
		} catch (error) {
			throw new Error(error)
		}
	}

	async login(client) {
		try {
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
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = AuthDomain
