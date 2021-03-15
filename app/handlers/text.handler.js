'use strict'

class TextHandler {
	constructor({ Bot, Client, Config, WalletRegisterController }) {
		this.bot = Bot
		this.config = Config
		this.client = Client
		this.controllers = {
			WalletRegisterController
		}
	}
	/*
	 * Maneja el evento de texto enviado
	 */
	async index(CTX) {
		const telegramId = CTX.from.id
		let client = await this.client.find({ telegram_id: telegramId })
		if (client.length > 0) {
			client = client[0]
			CTX.client = client
			const actionBot = client.action_bot

			switch (actionBot.action) {
				case 'GET_WALLET':
					await this.controllers.WalletRegisterController.index(CTX)
					break
			}
		}
	}
}
module.exports = TextHandler
