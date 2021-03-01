'use strict'
/*
 * Se registran los comandos del bot
 * cada comando genera un contexto que se le pasa al manejador
 */
module.exports = ({ Bot, StartController }) => {
	Bot.command('/start', CTX => StartController.index(CTX))
}
