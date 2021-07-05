'use strict'

class WalletMiddleware {
	constructor({ WalletValidate }) {
		this.walletValidate = WalletValidate
	}

	async correctWallet(CTX) {
		try {
			const walletKey = CTX.message.text
			if (await this.walletValidate.validateKeyWallet(CTX, walletKey))
				return true
			return false
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = WalletMiddleware
