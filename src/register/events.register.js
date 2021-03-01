'use strict'
/*
 * Se registran los eventos en el bot
 * cada evento genera un contexto que se le pasa al manejador
 */
module.exports = ({ Bot, EventCallbackQuery }) => {
	Bot.on('callback_query', CTX => EventCallbackQuery.index(CTX))
}
