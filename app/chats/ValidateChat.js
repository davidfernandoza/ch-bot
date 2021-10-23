'use strict'

const { Markup } = require('telegraf')
class ValidateChat {
	constructor({
		MessageString,
		WalletChat,
		TransactionChat,
		StartChat,
		MenuChat,
		DefaultString
	}) {
		this.messageString = MessageString
		this.transactionChat = TransactionChat
		this.walletChat = WalletChat
		this.startChat = StartChat
		this.menuChat = MenuChat
		this.defaultString = DefaultString
	}

	async sendErrorKeyWallet(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.addresUnavalible)
		} catch (error) {
			throw new Error(error)
		}
	}

	async clientExist(CTX) {
		try {
			const button = await this.menuChat.getButtonOpenMenu()
			return await CTX.replyWithMarkdown(
				this.messageString.clientExistError,
				button
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async clientNotExist(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.clientNotExistError)
		} catch (error) {
			throw new Error(error)
		}
	}

	async sponsorNotExist(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.sponsorNotExist)
		} catch (error) {
			throw new Error(error)
		}
	}

	async sponsorAndClientIsEquals(CTX) {
		try {
			return await CTX.replyWithMarkdown(
				this.messageString.sponsorAndClientIsEquals
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async countryNotExist(CTX) {
		try {
			return await CTX.replyWithMarkdown(
				this.messageString.countryNotExistError
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async chatIsBot(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.isBot)
		} catch (error) {
			throw new Error(error)
		}
	}

	async infoIsMissing(CTX, attribute) {
		try {
			const attributeSelected = this.defaultString.INFO[attribute]
			let message = this.messageString.infoValidate
			message = message.replace('#INFO', attributeSelected)
			await CTX.replyWithMarkdown(message)
			return await this.menuChat.myInfoMenu(CTX)
		} catch (error) {
			throw new Error(error)
		}
	}

	async sendDefaultMessage(CTX) {
		try {
			const client = CTX.client
			const actionMessage = this.defaultString.ACTIONS[client.action_bot.action]
			let message = this.messageString.defaultTextMessage
			const button = Markup.inlineKeyboard([
				Markup.button.callback('✔️ Cancelar acción', `actionCancel:NONE`)
			])
			message = message.replace('#ACTION', actionMessage)
			return await CTX.replyWithMarkdown(message, button)
		} catch (error) {
			throw new Error(error)
		}
	}

	async actionCancelMessage(CTX) {
		try {
			const message = this.messageString.cancelActionMessage
			return await CTX.replyWithMarkdown(message)
		} catch (error) {
			throw new Error(error)
		}
	}

	async otherTextSended(CTX) {
		try {
			const message = this.messageString.otherTextSended
			return await CTX.replyWithMarkdown(message)
		} catch (error) {
			throw new Error(error)
		}
	}

	async isNotPhone(CTX) {
		try {
			const message = this.messageString.isNotPhone
			return await CTX.replyWithMarkdown(message)
		} catch (error) {
			throw new Error(error)
		}
	}

	async incompleteMessage(CTX) {
		try {
			const message = this.messageString.incompleteMessage
			return await CTX.replyWithMarkdown(message)
		} catch (error) {
			throw new Error(error)
		}
	}

	async clientIsCompanyStatus(CTX) {
		try {
			const telegramId = CTX.from.id
			let message = this.messageString.clientIsCompanyStatus
			message = message.replace('#TELEGRAM_ID', telegramId)
			message = message.replace('#URL_SUPPORT', this.defaultString.URL_SUPPORT)
			return await CTX.replyWithMarkdown(message)
		} catch (error) {
			throw new Error(error)
		}
	}

	async infoBackMissing(CTX) {
		try {
			const telegramId = CTX.from.id
			let message = this.messageString.infoBackMissing
			let defaultStrings = this.defaultString.URL_SUPPORT
			defaultStrings = defaultStrings.replace('#', telegramId)
			message = message.replace('#URL', defaultStrings)
			return await CTX.replyWithMarkdown(message)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = ValidateChat
