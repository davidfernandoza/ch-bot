'use strict'

class ClientDomain {
	async assignActionNewWallet(client, CTX) {
		client.wallet.action_wallet = CTX.action_wallet
		client.action_bot = { step: 0, action: 'GET_WALLET' }
		return client
	}
}

module.exports = ClientDomain
