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
	CommandHandler,
	CallbackQueryHandler
}) => {
	/*
	 * Comandos
	 */
	Bot.command('/start', CTX => CommandHandler.startBot(CTX))
	Bot.command('/menu', CTX => CommandHandler.openMenu(CTX))

	/*
	 * Eventos
	 */
	Bot.on('callback_query', CTX => CallbackQueryHandler.getButtonAction(CTX))
	Bot.on('text', CTX => TextHandler.getClientAction(CTX))
}