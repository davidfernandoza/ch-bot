'use strict'
const { Markup } = require('telegraf')
const { Keyboard } = require('telegram-keyboard')
class MenuChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async openMenu(CTX) {
		await CTX.reply(
			'No ves el menu? Usa el siguiente boton.',
			this.getButtonInfoWebK()
		)
		return await this.newMenu(CTX)
	}

	async newMenu(CTX) {
		const keyboard = Keyboard.make([
			['🔖 Importante'],
			['🤝 Codigo de referido', '👨‍👧‍👦 Referidos'],
			['📆 Ciclo', '💵 Cobrar'],
			['👤 Mi informacion', '⚖️ Terminos y condiciones']
		]).reply()
		return await CTX.reply('Menu principal', keyboard)
	}

	referralsMenu(CTX) {
		const keyboard = Keyboard.make([
			['🧍🏽‍♂️ Ref. Izquierdo', '🧍🏽 Ref. Central', '🧍🏽‍♀️ Ref. Derecho'],
			['👨🏽‍💼 Patrocinador'],
			['⬅️ Menu principal']
		]).reply()
		return CTX.reply('Menu de referidos!', keyboard)
	}

	cycleMenu(CTX) {
		const keyboard = Keyboard.make([
			['🔄 Estado', '💵 Pagar ciclo'],
			['💳 Cambiar direccion tron'],
			['⬅️ Menu principal']
		]).reply()
		return CTX.reply('Menu de ciclos!', keyboard)
	}

	chargeMenu(CTX) {
		const keyboard = Keyboard.make([
			['🗂 Historial', '📊 Cobrar saldo'],
			['💳 Cambiar direccion tron'],
			['⬅️ Menu principal']
		]).reply()
		return CTX.reply('Menu de cobranza!', keyboard)
	}

	myInfoMenu(CTX) {
		const keyboard = Keyboard.make([
			['👤 Ver mi informacion'],
			['🇪🇨 Agregar pais', '📞 Agregar telefono'],
			['⬅️ Menu principal']
		]).reply()
		return CTX.reply('Menu de información!', keyboard)
	}

	async sendWebKMessage(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.webKvalidate)
	}

	getButtonOpenMenu() {
		return Markup.inlineKeyboard([
			Markup.button.callback('🔣 Abrir menu', `openMenu:NONE`)
		])
	}

	getButtonInfoWebK() {
		return Markup.inlineKeyboard([
			Markup.button.callback('📚 Ver informacion!!', `openWebK:NONE`)
		])
	}
}
module.exports = MenuChat
