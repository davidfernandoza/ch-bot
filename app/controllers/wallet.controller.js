'use strict'
const Controller = require('./controller')

class WalletController extends Controller {
	constructor({
		Config,
		Client,
		Methods,
		WalletTrait,
		MessageString,
		WalletValidate,
		IsNotBotValidate
	}) {
		super(Config, IsNotBotValidate, MessageString)
		this.walletValidate = WalletValidate
		this.methods = Methods
		this.client = Client
		this.walletTrait = WalletTrait
	}

	/*
	 * Registro de la billetera del cliente en el back
	 */
	async store(CTX) {
		/*
		 * Validacion de la direccion
		 */
		const address = CTX.message.text
		if (await this.walletValidate.index(CTX, address)) {
			const { POST, PUT } = this.methods,
				wallet = CTX.client.wallet,
				request = {
					context: CTX,
					endpoint:
						wallet.action_wallet == POST ? 'wallets' : `wallets/${wallet.id}`,
					method: wallet.action_wallet == POST ? POST : PUT,
					dataSend: { key: address, client_id: CTX.client.client_id }
				},
				dataResponse = await super.apiRequest(request)
			dataResponse.consignment = await this.getAvailableConsignmentWallet(CTX)
			return await this.walletTrait.responseWithQR(CTX, dataResponse)
		}
	}

	async getAvailableConsignmentWallet(CTX) {
		const { GET } = this.methods,
			request = {
				endpoint: 'wallets/get-consignment',
				context: CTX,
				method: GET
			}
		return await super.apiRequest(request)
	}

	/*
	 * Resetear wallet
	 */
	async reset(CTX) {
		const client = await this.client.findOne({ telegram_id: CTX.from.id })
		client.wallet.action_wallet = CTX.action_wallet
		client.action_bot = { step: 0, action: 'GET_WALLET' }
		await client.save()
		return await CTX.reply(this.messageString.sendTronAddress)
	}
}

module.exports = WalletController
