'use strict'

class WalletMiddleware {
	constructor({ WalletValidate }) {
		this.walletValidate = WalletValidate
	}

	async correctWallet(request) {
		const CTX = request.context
		if (await this.walletValidate.validateKeyWallet(CTX)) {
			return true
		}
		return false
	}
}
module.exports = WalletMiddleware
