'use strict'
/*
 * Se registran los eventos en el bot
 * cada evento genera un contexto que se le pasa al manejador
 *
 * Los eventos necesitan de un manejador de eventos, lo que diferencia un evento
 * de un comando es que cada evento se dispara con algo en especifico como un
 * texto, un click etc..
 * en cambio un comando se sebe disparar con el comando tecleado
 */
module.exports = ({ Bot, HandlerCallbackQuery, HandlerText }) => {
	Bot.on('callback_query', CTX => HandlerCallbackQuery.index(CTX))
	Bot.on('text', CTX => HandlerText.index(CTX))
}
