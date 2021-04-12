'use strict'
class WalletValidate {
	constructor({ WalletRepository }) {
		this.walletRepository = WalletRepository
	}

	async validateKeyWallet(keyWallet) {
		try {
			const response = await this.walletRepository.getWalletInfoInTronGrid(
				keyWallet
			)
			if (!response.success) {
				this.validateChat.sendErrorKeyWallet(CTX)
				return false
			}
			return true
		} catch (error) {
			this.errorHandler.sendError(error)
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
