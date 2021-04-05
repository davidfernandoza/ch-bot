'use strict'
const RepositoryAPI = require('./repository-api')
class ClientRepository extends RepositoryAPI {
	constructor({ Client, Config }) {
		super(Config)
		this.client = Client
		this.prefix = 'clients'
	}

	async storeClientInBack(clientData) {
		try {
			return await super.post(`${this.prefix}`, clientData)
		} catch (error) {
			throw new Error(error)
		}
	}
	async getClientInBackByTelegramId(telegramId) {
		try {
			return await super.get(`${this.prefix}/telegram-id/${telegramId}`)
		} catch (error) {
			throw new Error(error)
		}
	}

	//  Mongo ----------------------------------

	async storeClientInMongo(dataClient) {
		try {
			return await this.client.create(dataClient)
		} catch (error) {
			throw new Error(error)
		}
	}

	async updateClientInMongoWithData(byFind, data) {
		try {
			return await this.client.where(byFind).updateOne(data)
		} catch (error) {
			throw new Error(error)
		}
	}

	async updateClientInMongo(client) {
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
