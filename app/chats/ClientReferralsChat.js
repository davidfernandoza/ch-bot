'use strict'

class ClientReferralsChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async printClient(CTX, client) {
		let message
		if (client.data) {
			message = this.buildCorrectMessage(client)
		} else {
			message = this.messageString.notReferred
		}
		return await CTX.replyWithMarkdown(message)
	}

	buildCorrectMessage(client) {
		let message = this.messageString.referred
		message = message.replace('#TITLE', client.title)
		message = message.replace('#NAME', client.data.full_name)
		message = message.replace('#STATUS', client.data.status)
		message = message.replace('#PHONE', client.data.phone)
		message = message.replace('#BIRTHDAY', client.data.birthday)
		return message
	}
}
module.exports = ClientReferralsChat
