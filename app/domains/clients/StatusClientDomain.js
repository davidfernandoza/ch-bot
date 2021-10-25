'use strict'

class StatusClientDomain {
	constructor({ ClientRepository }) {
		this.clientRepository = ClientRepository
	}

	async updateClientStatus(client, status) {
		client.status = status
		await this.clientRepository.updateClientInMongo(client)
	}

	async addInfoClient(client) {
		await this.updateClientStatus(client, 'INFO')
	}

	async addIncompleteClient(client) {
		await this.updateClientStatus(client, 'INCOMPLETE')
	}

	async addCompanyClient(client) {
		await this.updateClientStatus(client, 'COMPANY')
	}

	async addActiveClient(client) {
		await this.updateClientStatus(client, 'ACTIVE')
	}

	async addInactiveClient(client) {
		await this.updateClientStatus(client, 'INACTIVE')
	}

	async addInfoActiveClient(telegramId) {
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)
		if (client) {
			await this.updateClientStatus(client, 'INFO_ACTIVE')
			return true
		} else return false
	}
}
module.exports = StatusClientDomain
