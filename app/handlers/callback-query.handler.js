'use strict'
class CallbackQueryHandler {
	constructor({ Bot, Config, ClientController, WalletController }) {
		this.bot = Bot
		this.config = Config
		this.controllers = {
			ClientController,
			WalletController
		}
	}
	/*
	 * Captura el evento del boton en linea presionado
	 */
	index(CTX) {
		const buttonValueArray = CTX.update.callback_query.data.split(':'),
			button = buttonValueArray[0],
			value = buttonValueArray[1]

		switch (button) {
			case 'acceptTerms':
				CTX.sponsor_telegram_id = value
				CTX.plan_id = buttonValueArray[2]
				this.controllers.ClientController.store(CTX)
				break
			case 'changeWallet':
				CTX.action_wallet = value
				this.controllers.WalletController.reset(CTX)
				break
			case 'consignmentValidate':
				// this.controllers.ConsignmentController.validate(CTX)
				break
		}
	}
}
module.exports = CallbackQueryHandler
