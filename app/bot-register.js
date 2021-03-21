'use strict'
/*
 * Se registran los eventos y los comandos del bot
 * cada evento o comando genera un contexto que se le pasa al manejador o a
 * un controlador.
 *
 * Los manejadores lo que hacen es filtrar el contexto para pasarle la
 * peticion al controlador encargado
 *
 * Los eventos necesitan de un manejador de eventos, lo que diferencia un evento
 * de un comando es que cada evento se dispara con algo en especifico como un
 * texto, un click, un stiker etc..
 * en cambio un comando se sebe disparar con el comando tecleado
 */
module.exports = ({
	Bot,
	TextHandler,
	MenuController,
	TermPlanController,
	CallbackQueryHandler,
	WalletController,
	Client
}) => {
	/*
	 * Comandos
	 */
	Bot.command('/start', CTX => TermPlanController.getPlanAndTerms(CTX))
	Bot.command('/menu', CTX => MenuController.index(CTX))
	Bot.command('/test', async CTX => {
		await Client.where({ telegram_id: CTX.from.id }).updateOne({
			wallet: {
				id: 5,
				address: 'AKSETHbn1uTBNtz4zPsFRMDTb4QtswpQj8',
				status: true,
				action_wallet: 'POST'
			}
		})
		let c = await Client.findOne({ telegram_id: CTX.from.id })
		c.wallet.action_wallet = 'PUT'
		await c.save()

		// await Client.where({ telegram_id: CTX.from.id }).updateOne({
		// 	$set: {
		// 		wallet: {
		// 			action_wallet: 'PUT'
		// 		}
		// 		// action_bot: { step: 0, action: 'GET_WALLET' }
		// 	}
		// })
		c = await Client.findOne({ telegram_id: CTX.from.id })
		console.log(c)
		CTX.client = await Client.findOne({ telegram_id: CTX.from.id })
		CTX.message.text = 'DavidHbn1uTBNtz4zPsFRMDTb4QtswpQj8'

		// WalletController.store(CTX)
	})

	/*
	 * Eventos
	 */
	Bot.on('callback_query', CTX => CallbackQueryHandler.index(CTX))
	Bot.on('text', CTX => TextHandler.index(CTX))
}
