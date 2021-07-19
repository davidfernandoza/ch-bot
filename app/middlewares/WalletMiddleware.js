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
		try {
			const walletKey = CTX.message.text
			if (await this.validateKeyWallet(CTX, walletKey)) return true
			return false
		} catch (error) {
			throw new Error(error)
		}
	}

	async validateKeyWallet(CTX, keyWallet) {
		try {
			const response = await this.walletRepository.getWalletInfoInTronGrid(
				keyWallet
			)
			if (!response.success) {
				await this.validateChat.sendErrorKeyWallet(CTX)
				return false
			}
			return true
		} catch (error) {
			throw new Error(error)
		}
	}
	async clientWithWallet(CTX) {
		try {
			const client = await this.clientRepository.getClientByTelegramIdInMongo(
				CTX.from.id
			)
			if (client) {
				if (client.wallet.key) {
					if (!client.wallet.action_wallet) return true
				}
			}
			await this.walletChat.askTronWallet(CTX)
			return false
		} catch (error) {
			throw new Error(error)
		}
	}

	// const validate = require('validate.js')
	// this.rules = {
	// 	presence: true,
	// 	address: { length: { is: 34 } }
	// }
	// const Form = {address: '41e9d79cc47518930bc322d9bf7cddd260a0260a8d'}
	// await validate(Form, this.rules)
}
module.exports = WalletMiddleware
