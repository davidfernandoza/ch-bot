'use strict'

const { Markup } = require('telegraf')
class ValidateChat {
	constructor({
		MessageString,
		WalletChat,
		BuildWalletDomain,
		StartChat,
		MenuChat,
		DefaultString
	}) {
		this.messageString = MessageString
		this.walletChat = WalletChat
		this.buildWalletDomain = BuildWalletDomain
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
			const button = await this.startChat.getButtonNewClient()
			return await CTX.replyWithMarkdown(
				this.messageString.clientNotExistError,
				button
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

	async openPayment(CTX, client) {
		try {
			const dataPrint =
				await this.buildWalletDomain.makeDataPrintForConsignmentWallet(client)
			await CTX.replyWithMarkdown(this.messageString.clientNotActive)
			await this.walletChat.sendInfoForTransaction(CTX, dataPrint)
			return await this.walletChat.changeToWallet(CTX)
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

	async isNotEmail(CTX) {
		try {
			const message = this.messageString.isNotEmail
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
