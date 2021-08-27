'use strict'

class PeriodChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async sendPeriodStatusMessage(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.statusPeriodMessage)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = PeriodChat
