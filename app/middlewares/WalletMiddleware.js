'use strict'

class WalletMiddleware {
	constructor({
		ValidateChat,
		ClientRepository,
		WalletRepository,
		WalletChat
	}) {
		this.validateChat = ValidateChat
		this.clientRepository = ClientRepository
		this.walletRepository = WalletRepository
		this.walletChat = WalletChat
	}

	async correctWallet(CTX) {
		const walletKey = CTX.message.text
		if (await this.validateKeyWallet(CTX, walletKey)) return true
		return false
	}

	async validateKeyWallet(CTX, keyWallet) {
		const response = await this.walletRepository.getWalletInfoInTronGrid(
			keyWallet
		)
		if (!response.success) {
			await this.validateChat.sendErrorKeyWallet(CTX)
			return false
		}
		return true
	}

	async clientWithWallet(CTX) {
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		if (client) {
			if (client.wallet.key) {
				if (!client.wallet.action_wallet) return true
				else if (client.wallet.action_wallet == 'NONE') return true
			}
		}
		await this.walletChat.askTronWallet(CTX)
		return false
	}
}
module.exports = WalletMiddleware
