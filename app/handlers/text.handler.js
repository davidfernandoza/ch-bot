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
		CTX.client = await this.client.findOne({ telegram_id: telegramId })
		if (CTX.client) {
			const actionBot = CTX.client.action_bot

			switch (actionBot.action) {
				case 'GET_WALLET':
					await this.controllers.WalletRegisterController.index(CTX)
					break
			}
		}
	}
}
module.exports = TextHandler
