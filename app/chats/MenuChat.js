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
			['🤝 Link Referido', '👨‍👧‍👦 Referidos'],
			['📆 Ciclo', '💵 Cobrar'],
			['👤 Mi Informacion', '⚖️ Reglas']
		]).reply()
		return await CTX.reply('Menu Principal', keyboard)
	}

	referralsMenu(CTX) {
		const keyboard = Keyboard.make([
			['🧍🏽‍♂️ Ref. Izquierdo', '🧍🏽 Ref. Central', '🧍🏽‍♀️ Ref. Derecho'],
			['🧑🏽‍🦱 Generacion 1', '👨🏼‍🦰 Generacion 2', '👨🏼‍🦳 Generacion 3'],
			['👨🏽‍💼 Patrocinador'],
			['⬅️ Menu Principal']
		]).reply()
		return CTX.reply('Menu de Referidos!', keyboard)
	}

	rulesMenu(CTX) {
		const keyboard = Keyboard.make([
			['🔃 Matriz Forzada', '💰 Plan de Pagos'],
			['🔖 Importante', '⚖️ Terminos y Condiciones'],
			['⬅️ Menu Principal']
		]).reply()
		return CTX.reply('Menu de Reglas!', keyboard)
	}

	cycleMenu(CTX) {
		const keyboard = Keyboard.make([
			['🔄 Estado', '💵 Pagar Ciclo'],
			['⬅️ Menu Principal']
		]).reply()
		return CTX.reply('Menu de Ciclos!', keyboard)
	}

	chargeMenu(CTX) {
		const keyboard = Keyboard.make([
			['💳 Cambiar Direccion Tron', '📊 Cobrar Saldo'],
			['🗂 Historial'],
			['⬅️ Menu Principal']
		]).reply()
		return CTX.reply('Menu de Cobranza!', keyboard)
	}

	myInfoMenu(CTX) {
		const keyboard = Keyboard.make([
			['👤 Ver mi Informacion'],
			['🇪🇨 Agregar Pais', '📞 Agregar Telefono'],
			['🌐 Agregar Email', '🎉 Agregar Fecha de Nacimiento'],
			['⬅️ Menu Principal']
		]).reply()
		return CTX.reply('Menu de Información!', keyboard)
	}

	async sendWebKMessage(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.webKvalidate)
	}

	getButtonOpenMenu() {
		return Markup.inlineKeyboard([
			Markup.button.callback('🔣 Abrir Menu', `openMenu:NONE`)
		])
	}

	getButtonInfoWebK() {
		return Markup.inlineKeyboard([
			Markup.button.callback('📚 Ver informacion!!', `openWebK:NONE`)
		])
	}
}
module.exports = MenuChat
