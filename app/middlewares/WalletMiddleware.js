'use strict'

class WalletMiddleware {
	constructor({ WalletValidate }) {
		this.walletValidate = WalletValidate
	}

	async correctWallet(CTX) {
		const walletKey = CTX.message.text
		if (await this.walletValidate.validateKeyWallet(CTX, walletKey)) return true
		return false
	}
}
module.exports = WalletMiddleware
