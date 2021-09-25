'use strict'
const Repository = require('./Repository')

class ClientRepository extends Repository {
	constructor({ Client, Config }) {
		super(Config)
		this.client = Client
		this.prefix = 'clients'
	}

	async storeClientInBack(clientData) {
		try {
			return await super.post(`${this.prefix}/telegram`, clientData)
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

	async getClientWithReferrals(client_id, accessToken) {
		try {
			return await super.get(
				`${this.prefix}/referrals/${client_id}`,
				accessToken
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async setCountryForClient(clientId, countryId, accessToken) {
		try {
			return await super.put(
				`${this.prefix}/set-country/client/${clientId}`,
				{
					country_id: countryId
				},
				accessToken
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async setPhoneForClient(clientId, phone, accessToken) {
		try {
			return await super.put(
				`${this.prefix}/set-phone/client/${clientId}`,
				{
					phone: phone
				},
				accessToken
			)
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
