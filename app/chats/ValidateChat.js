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
		return await CTX.replyWithMarkdown(this.messageString.addresUnavalible)
	}

	async clientExist(CTX) {
		const button = await this.menuChat.getButtonOpenMenu()
		return await CTX.replyWithMarkdown(
			this.messageString.clientExistError,
			button
		)
	}

	async clientNotExist(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.clientNotExistError)
	}

	async sponsorNotExist(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.sponsorNotExist)
	}

	async sponsorAndClientIsEquals(CTX) {
		return await CTX.replyWithMarkdown(
			this.messageString.sponsorAndClientIsEquals
		)
	}

	async countryNotExist(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.countryNotExistError)
	}

	async chatIsBot(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.isBot)
	}

	async infoIsMissing(CTX, attribute) {
		const attributeSelected = this.defaultString.INFO[attribute]
		let message = this.messageString.infoValidate
		message = message.replace('#INFO', attributeSelected)
		await this.menuChat.notViewChat(CTX)
		await CTX.replyWithMarkdown(message)
		return await this.menuChat.myInfoMenu(CTX)
	}

	async sendDefaultMessage(CTX) {
		const client = CTX.client
		const actionMessage = this.defaultString.ACTIONS[client.action_bot.action]
		let message = this.messageString.defaultTextMessage
		const button = Markup.inlineKeyboard([
			Markup.button.callback('✔️ Cancelar acción', `actionCancel:NONE`)
		])
		message = message.replace('#ACTION', actionMessage)
		return await CTX.replyWithMarkdown(message, button)
	}

	async actionCancelMessage(CTX) {
		const message = this.messageString.cancelActionMessage
		return await CTX.replyWithMarkdown(message)
	}

	async otherTextSended(CTX) {
		const message = this.messageString.otherTextSended
		return await CTX.replyWithMarkdown(message)
	}

	async isNotPhone(CTX) {
		const message = this.messageString.isNotPhone
		return await CTX.replyWithMarkdown(message)
	}

	async incompleteMessage(CTX) {
		const message = this.messageString.incompleteMessage
		return await CTX.replyWithMarkdown(message)
	}

	async clientIsCompanyStatus(CTX) {
		const telegramId = CTX.from.id
		const url = this.defaultString.URL_SUPPORT
		let message = this.messageString.clientIsCompanyStatus
		message = message.replace('#TELEGRAM_ID', telegramId)
		message = message.replace('#URL_SUPPORT', url.replace('#', telegramId))
		return await CTX.replyWithMarkdown(message)
	}

	async infoBackMissing(CTX) {
		const telegramId = CTX.from.id
		const url = this.defaultString.URL_SUPPORT
		let message = this.messageString.infoBackMissing
		message = message.replace('#TELEGRAM_ID', telegramId)
		message = message.replace('#URL_SUPPORT', url.replace('#', telegramId))
		return await CTX.replyWithMarkdown(message)
	}

	async walletTaken(CTX) {
		const message = this.messageString.walletTaken
		return await CTX.replyWithMarkdown(message)
	}

	async balanceWithoutFunds(CTX) {
		let message = this.messageString.balanceWithoutFunds
		message += ' para el pago del plan.'
		return await CTX.replyWithMarkdown(message)
	}

	async balanceWithoutFundsForCharges(CTX) {
		let message = this.messageString.balanceWithoutFunds
		message += ' para hacer el cobro.'
		return await CTX.replyWithMarkdown(message)
	}

	async limitCharges(CTX) {
		const message = this.messageString.limitCharges
		return await CTX.replyWithMarkdown(message)
	}

	async referralsAreMissing(CTX) {
		const message = this.messageString.referralsAreMissing
		return await CTX.replyWithMarkdown(message)
	}
}
module.exports = ValidateChat
