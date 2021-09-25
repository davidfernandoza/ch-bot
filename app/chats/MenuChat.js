'use strict'
const { Markup } = require('telegraf')
const { Keyboard } = require('telegram-keyboard')
class MenuChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async openMenu(CTX) {
		try {
			await CTX.reply(
				'No ves el menu? Usa el siguiente boton.',
				this.getButtonInfoWebK()
			)
			return await this.newMenu(CTX)
		} catch (error) {
			throw new Error(error)
		}
	}

	async newMenu(CTX) {
		try {
			const keyboard = Keyboard.make([
				['🔖 Importante'],
				['🤝 Codigo de referido', '👨‍👧‍👦 Referidos'],
				['📆 Ciclo', '💵 Cobrar'],
				['👤 Mi informacion', '⚖️ Terminos y condiciones']
			]).reply()
			return await CTX.reply('Menu principal', keyboard)
		} catch (error) {
			throw new Error(error)
		}
	}

	referralsMenu(CTX) {
		try {
			const keyboard = Keyboard.make([
				['🧍🏽‍♂️ Ref. Izquierdo', '🧍🏽 Ref. Central', '🧍🏽‍♀️ Ref. Derecho'],
				['👨🏽‍💼 Patrocinador'],
				['⬅️ Menu principal']
			]).reply()
			return CTX.reply('Menu de referidos!', keyboard)
		} catch (error) {
			throw new Error(error)
		}
	}

	cycleMenu(CTX) {
		try {
			const keyboard = Keyboard.make([
				['🔄 Estado', '💵 Pagar ciclo'],
				['⬅️ Menu principal']
			]).reply()
			return CTX.reply('Menu de ciclos!', keyboard)
		} catch (error) {
			throw new Error(error)
		}
	}

	chargeMenu(CTX) {
		try {
			const keyboard = Keyboard.make([
				['💳 Cambiar direccion tron', '📊 Cobrar saldo'],
				['🗂 Historial'],
				['⬅️ Menu principal']
			]).reply()
			return CTX.reply('Menu de cobranza!', keyboard)
		} catch (error) {
			throw new Error(error)
		}
	}

	myInfoMenu(CTX) {
		try {
			const keyboard = Keyboard.make([
				['👤 Ver mi informacion'],
				['🇪🇨 Agregar pais', '📞 Agregar telefono'],
				['⬅️ Menu principal']
			]).reply()
			return CTX.reply('Menu de información!', keyboard)
		} catch (error) {
			throw new Error(error)
		}
	}

	async sendWebKMessage(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.webKvalidate)
		} catch (error) {
			throw new Error(error)
		}
	}

	getButtonOpenMenu() {
		try {
			return Markup.inlineKeyboard([
				Markup.button.callback('🔣 Abrir menu', `openMenu:NONE`)
			])
		} catch (error) {
			throw new Error(error)
		}
	}

	getButtonInfoWebK() {
		try {
			return Markup.inlineKeyboard([
				Markup.button.callback('📚 Ver informacion!!', `openWebK:NONE`)
			])
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = MenuChat
