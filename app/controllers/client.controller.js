'use strict'

class ClientController {
	constructor({
		Client,
		Config,
		Methods,
		MessageString,
		MenuController,
		IsNotBotValidate,
		WalletController
	}) {
		// super(Config, IsNotBotValidate, MessageString)
		this.walletController = WalletController
		this.menuController = MenuController
		this.client = Client
		this.methods = Methods
		this.endpoint = 'clients'
	}

	/*
	 * Registro del cliente en el back
	 */
	async store(CTX) {
		/*
		 * Validar si existe el usuario
		 */
		if (await this.client.findOne({ telegram_id: CTX.from.id })) {
			return this.menuController.index(CTX)
		}
		const dataSponsor = await this.getSponsor(CTX)
		if (dataSponsor) {
			const { POST } = this.methods,
				client = CTX.from,
				request = {
					endpoint: `${this.endpoint}`,
					method: POST,
					context: CTX,
					dataSend: {
						telegram_id: client.id,
						sponsor_id: dataSponsor.id,
						full_name: `${client.first_name} ${client.last_name}`,
						username: `${client.username}`,
						plan_id: CTX.plan_id
					}
				},
				dataResponse = await super.apiRequest(request)

			if (dataResponse) {
				/*
				 * Almacena al usuario en Mongo
				 */
				this.client.create({
					...dataResponse,
					client_id: dataResponse.id,
					action_bot: { action: 'GET_WALLET' },
					sponsor_telegram_id: CTX.sponsor_telegram_id
				})
				CTX.action_wallet = POST
				await CTX.reply(this.messageString.succesClient)
				return await this.walletController.reset(CTX)
			}
		}
	}

	async getSponsor(CTX) {
		const { GET } = this.methods,
			request = {
				endpoint: `${this.endpoint}/telegram-id/${CTX.sponsor_telegram_id}`,
				method: GET,
				context: CTX
			}
		return await super.apiRequest(request) // Trae al sponsor
	}
}
module.exports = ClientController
