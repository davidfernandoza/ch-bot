'use strict'

class WalletController {
	constructor({
		ErrorHandler,
		WalletValidate,
		ClientRepository,
		ClientDomain
	}) {
		this.walletValidate = WalletValidate
		this.clientRepository = ClientRepository
		this.clientDomain = ClientDomain
		this.errorHandler = ErrorHandler
	}

	/*
	 * Registro de la billetera del cliente en el back
	 */
	async storeWallet(CTX) {
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

	async resetActionInClientWallet(CTX) {
		let telegramId = CTX.from.id,
			client = await this.clientRepository.getClientByTelegramIdInMongo(
				telegramId
			)
		client = await this.clientDomain.assignActionNewWallet(client, CTX)
		if (await this.clientRepository.storeClientInMongo(client)) {
			return await CTX.reply(this.messageString.sendTronAddress)
		}
		super.handlerError(CTX, resetActionInClientWallet.name)
	}
}

module.exports = WalletController
