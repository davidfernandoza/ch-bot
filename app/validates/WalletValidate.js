'use strict'
class WalletValidate {
	constructor({ WalletRepository, ErrorHandler, ValidateChat }) {
		this.walletRepository = WalletRepository
		this.errorHandler = ErrorHandler
		this.validateChat = ValidateChat
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
			this.errorHandler.sendError(CTX, error)
			return false
		}
	}
}

module.exports = WalletValidate

// const validate = require('validate.js')
// this.rules = {
// 	presence: true,
// 	address: { length: { is: 34 } }
// }
// const Form = {address: '41e9d79cc47518930bc322d9bf7cddd260a0260a8d'}
// await validate(Form, this.rules)
