'use strict'

class StartDomain {
	getSponsorTelegramId(CTX) {
		try {
			const arrayText = CTX.update.message.text.split(' ')
			return arrayText.length > 1 ? arrayText[1] : '1ROOT'
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = StartDomain
