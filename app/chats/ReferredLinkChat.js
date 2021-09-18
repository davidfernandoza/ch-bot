'use strict'
class ReferredLinkChat {
	constructor({ DefaultString, MessageString }) {
		this.defaultString = DefaultString
		this.messageString = MessageString
	}

	async sendReferredLink(CTX) {
		try {
			const message = this.defaultString.URL_REFERRED.replace('#', CTX.from.id)
			await CTX.replyWithMarkdown(this.messageString.referredMessage)
			await CTX.replyWithMarkdown(message)
			return await CTX.replyWithMarkdown(CTX.from.id)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = ReferredLinkChat
