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
let validateChat
module.exports = ({
	Bot,
	TextHandler,
	CommandHandler,
	CallbackQueryHandler,
	ValidateChat
}) => {
	validateChat = ValidateChat
	/*
	 * Comandos
	 */
	Bot.command('/start', CTX =>
		botManager({ context: CTX, handler: () => CommandHandler.startBot(CTX) })
	)
	Bot.command('/menu', CTX =>
		botManager({ context: CTX, handler: () => CommandHandler.openMenu(CTX) })
	)

	/*
	 * Eventos
	 */
	Bot.on('callback_query', CTX =>
		botManager({
			context: CTX,
			handler: () => CallbackQueryHandler.getButtonAction(CTX)
		})
	)

	Bot.on('text', CTX =>
		botManager({
			context: CTX,
			handler: () => TextHandler.getClientAction(CTX)
		})
	)
}

async function botManager(dataContext) {
	if (dataContext.context.from.is_bot) {
		await validateChat.chatIsBot(dataContext.context)
		return false
	}
	dataContext.handler()
}
