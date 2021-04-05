'use strict'

class MenuView {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async succesNewClient(CTX) {
		return await CTX.reply(this.messageString.succesClient)
	}
}
module.exports = MenuView
