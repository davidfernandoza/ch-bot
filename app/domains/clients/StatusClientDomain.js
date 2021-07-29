'use strict'

class StatusClientDomain {
	constructor({ ClientRepository }) {
		this.clientRepository = ClientRepository
	}

	async updateClientStatus(client, status) {
		try {
			client.status = status
			await this.clientRepository.updateClientInMongo(client)
		} catch (error) {
			throw new Error(error)
		}
	}

	async addInfoClient(client) {
		try {
			await this.updateClientStatus(client, 'INFO')
		} catch (error) {
			throw new Error(error)
		}
	}

	async addDebtClient(client) {
		try {
			await this.updateClientStatus(client, 'DEBT')
		} catch (error) {
			throw new Error(error)
		}
	}

	async addIncompleteClient(client) {
		try {
			await this.updateClientStatus(client, 'INCOMPLETE')
		} catch (error) {
			throw new Error(error)
		}
	}

	async activeClient(client) {
		try {
			await this.updateClientStatus(client, 'ACTIVE')
		} catch (error) {
			throw new Error(error)
		}
	}

	async addInfoActiveClient(telegramId) {
		try {
			const client = await this.clientRepository.getClientByTelegramIdInMongo(
				telegramId
			)
			if (client) {
				await this.updateClientStatus(client, 'INFO_ACTIVE')
				return true
			} else return false
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = StatusClientDomain