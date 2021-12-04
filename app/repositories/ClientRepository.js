'use strict'
const Repository = require('./Repository')

class ClientRepository extends Repository {
	constructor({ Client, Config }) {
		super(Config)
		this.client = Client
		this.prefix = 'clients'
	}

	async storeClientInBack(clientData) {
		return await super.post(`${this.prefix}/telegram`, clientData)
	}
	async getClientInBackByTelegramId(telegramId) {
		return await super.get(`${this.prefix}/telegram-id/${telegramId}`)
	}

	async getClientWithReferrals(client_id, accessToken) {
		return await super.get(
			`${this.prefix}/referrals/client/${client_id}`,
			accessToken
		)
	}

	async getAmountOfActiveReferralsByClient(clientId, accessToken) {
		return await super.get(
			`${this.prefix}/get-amount-of-active-referrals/client/${clientId}`,
			accessToken
		)
	}

	async setCountryForClient(clientId, countryId, accessToken) {
		return await super.put(
			`${this.prefix}/set-country/client/${clientId}`,
			{
				country_id: countryId
			},
			accessToken
		)
	}

	async setPhoneForClient(clientId, phone, accessToken) {
		return await super.put(
			`${this.prefix}/set-phone/client/${clientId}`,
			{
				phone: phone
			},
			accessToken
		)
	}

	//  Mongo ----------------------------------

	async storeClientInMongo(dataClient) {
		return await this.client.create(dataClient)
	}

	async updateClientInMongoWithData(byFind, data) {
		return await this.client.where(byFind).updateOne(data)
	}

	async updateClientInMongo(client) {
		return await client.save()
	}

	async getClientByTelegramIdInMongo(telegram_id) {
		return await this.client.findOne({ telegram_id })
	}
}

module.exports = ClientRepository
