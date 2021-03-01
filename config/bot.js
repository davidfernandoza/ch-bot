'use strict'
const telegraf = require('telegraf')
/*
 * Creacion del bot de telegram
 */
module.exports = ({ Config }) => {
	return new telegraf(Config.TOKEN_BOT)
}
