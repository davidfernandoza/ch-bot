'use strict'

class PhoneDomain {
	constructor({ ClientRepository, DefaultString }) {
		this.clientRepository = ClientRepository
		this.defaultString = DefaultString
	}

	async setActivePhoneStatus(CTX) {
		try {
			const client = CTX.client
			client.action_bot.action = this.defaultString.GET_PHONE
			await this.clientRepository.updateClientInMongo(client)
		} catch (error) {
			throw new Error(error)
		}
	}

	async setPhoneForClient(CTX) {
		try {
			const phone = CTX.message.text,
				client = CTX.client,
				backClient = await this.clientRepository.setPhoneForClient(
					client.client_id,
					phone,
					CTX.accessToken
				)
			client.phone = backClient.phone
			client.action_bot.action = 'NONE'
			await this.clientRepository.updateClientInMongo(client)
			return true
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = PhoneDomain
