'use strict'

class ClientChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async succesNewClient(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.succesClient)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = ClientChat
