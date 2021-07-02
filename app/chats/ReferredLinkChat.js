'use strict'
class ReferredLinkChat {
	constructor({ DefaultString }) {
		this.defaultString = DefaultString
	}

	async sendReferredLink(CTX) {
		try {
			const message = this.defaultString.URL_REFERRED.replace('#', CTX.from.id)
			return await CTX.replyWithMarkdown(message)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = ReferredLinkChat
