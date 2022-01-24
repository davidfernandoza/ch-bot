'use strict'

class PhoneDomain {
	constructor({ ClientRepository, DefaultString, ClientDomain }) {
		this.clientRepository = ClientRepository
		this.defaultString = DefaultString
		this.clientDomain = ClientDomain
	}

	async setActivePhoneStatus(CTX) {
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		client.action_bot.action = this.defaultString.GET_PHONE
		await this.clientRepository.updateClientInMongo(client)
	}

	async setPhoneForClient(CTX) {
		const phone = CTX.message.text
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		const backClient = await this.clientRepository.setPhoneForClient(
			client.client_id,
			phone,
			client.auth.access_token
		)
		client.phone = backClient.phone
		client.action_bot.action = 'NONE'
		await this.clientRepository.updateClientInMongo(client)
		return true
	}
}

module.exports = PhoneDomain
