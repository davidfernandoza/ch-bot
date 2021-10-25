'use strict'

class PhoneDomain {
	constructor({ ClientRepository, DefaultString, ClientDomain }) {
		this.clientRepository = ClientRepository
		this.defaultString = DefaultString
		this.clientDomain = ClientDomain
	}

	async setActivePhoneStatus(CTX) {
		const client = CTX.client
		client.action_bot.action = this.defaultString.GET_PHONE
		await this.clientRepository.updateClientInMongo(client)
	}

	async setPhoneForClient(CTX) {
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
	}
}

module.exports = PhoneDomain
