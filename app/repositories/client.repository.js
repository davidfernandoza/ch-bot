'use strict'

class ClientRepository {
	constructor({ Client }) {
		this.client = Client
	}

	async storeClientInMongo(client) {
		try {
			return await client.save()
		} catch (error) {
			throw new Error(error)
		}
	}

	async getClientByTelegramIdInMongo(telegram_id) {
		try {
			return await this.client.findOne({ telegram_id })
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = ClientRepository
