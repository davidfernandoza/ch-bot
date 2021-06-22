'use strict'

class ValidateChat {
	constructor({
		MessageString,
		WalletChat,
		BuildWalletDomain,
		StartChat,
		MenuChat
	}) {
		this.messageString = MessageString
		this.walletChat = WalletChat
		this.buildWalletDomain = BuildWalletDomain
		this.startChat = StartChat
		this.menuChat = MenuChat
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
		const button = await this.startChat.getButtonNewClient()
		return await CTX.replyWithMarkdown(
			this.messageString.clientNotExistError,
			button
		)
	}

	async chatIsBot(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.isBot)
	}

	async openPayment(CTX, client) {
		const dataPrint =
			await this.buildWalletDomain.makeDataPrintForConsignmentWallet(client)
		await CTX.replyWithMarkdown(this.messageString.clientNotActive)
		await this.walletChat.sendInfoForTransaction(CTX, dataPrint)
		return await this.walletChat.changeToWallet(CTX)
	}
}
module.exports = ValidateChat
