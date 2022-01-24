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
		const client = await this.getClient(telegramId)
		if (client) {
			await this.updateClientStatus(client, 'INFO_ACTIVE')
			return true
		} else return false
	}

	changeStatusForClientArray(clients) {
		clients.forEach(async clientBack => {
			const client = await this.getClient(clientBack.telegramId)
			if (client) {
				if (clientBack.status == 'INACTIVE') {
					this.addInactiveClient(client)
				} else if (clientBack.status == 'INCOMPLETE') {
					this.addIncompleteClient(client)
				} else if (clientBack.status == 'COMPANY') {
					this.addCompanyClient(client)
				}
			}
		})
	}

	async getClient(telegramId) {
		return await this.clientRepository.getClientByTelegramIdInMongo(telegramId)
	}
}
module.exports = StatusClientDomain
