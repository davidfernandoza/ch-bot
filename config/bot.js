'use strict'
const { Telegraf } = require('telegraf')
/*
 * Creacion del bot de telegram
 */
module.exports = ({ Config }) => {
	return new Telegraf(Config.TOKEN_BOT)
}
