'use strict'

class PhoneDomain {
	constructor({ ClientRepository, DefaultString }) {
		this.clientRepository = ClientRepository
		this.defaultString = DefaultString
	}

	async setActiveEmailStatus(CTX) {
		try {
			const client = CTX.client
			client.action_bot.action = this.defaultString.GET_EMAIL
			await this.clientRepository.updateClientInMongo(client)
		} catch (error) {
			throw new Error(error)
		}
	}

	async setEmailForClient(CTX) {
		try {
			const email = CTX.message.text,
				client = CTX.client,
				backClient = await this.clientRepository.setEmailForClient(
					client.client_id,
					email,
					CTX.accessToken
				)
			client.email = backClient.email
			client.action_bot.action = 'NONE'
			await this.clientRepository.updateClientInMongo(client)
			return true
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = PhoneDomain
