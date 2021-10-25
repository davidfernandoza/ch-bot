'use strict'

class ClientChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async succesNewClient(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.succesClient)
	}
}
module.exports = ClientChat
