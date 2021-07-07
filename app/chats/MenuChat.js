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
				['🤝 Link Referido', '👨‍👧‍👦 Referidos'],
				['📆 Ciclo', '💵 Cobrar'],
				['👤 Mi Informacion', '⚖️ Reglas']
			]).reply()
			return await CTX.reply('Menu Principal', keyboard)
		} catch (error) {
			throw new Error(error)
		}
	}

	referralsMenu(CTX) {
		try {
			const keyboard = Keyboard.make([
				['🧍🏽‍♂️ Ref. Izquierdo', '🧍🏽 Ref. Central', '🧍🏽‍♀️ Ref. Derecho'],
				['🧑🏽‍🦱 Generacion 1', '👨🏼‍🦰 Generacion 2', '👨🏼‍🦳 Generacion 3'],
				['👨🏽‍💼 Patrocinador'],
				['⬅️ Menu Principal']
			]).reply()
			return CTX.reply('Menu de Referidos!', keyboard)
		} catch (error) {
			throw new Error(error)
		}
	}

	rulesMenu(CTX) {
		try {
			const keyboard = Keyboard.make([
				['🔃 Matriz Forzada', '💰 Plan de Pagos'],
				['🔖 Importante', '⚖️ Terminos y Condiciones'],
				['⬅️ Menu Principal']
			]).reply()
			return CTX.reply('Menu de Reglas!', keyboard)
		} catch (error) {
			throw new Error(error)
		}
	}

	cycleMenu(CTX) {
		try {
			const keyboard = Keyboard.make([
				['🔄 Estado', '💵 Pagar Ciclo'],
				['⬅️ Menu Principal']
			]).reply()
			return CTX.reply('Menu de Ciclos!', keyboard)
		} catch (error) {
			throw new Error(error)
		}
	}

	chargeMenu(CTX) {
		try {
			const keyboard = Keyboard.make([
				['💳 Cambiar Direccion Tron', '📊 Cobrar Saldo'],
				['🗂 Historial'],
				['⬅️ Menu Principal']
			]).reply()
			return CTX.reply('Menu de Cobranza!', keyboard)
		} catch (error) {
			throw new Error(error)
		}
	}

	myInfoMenu(CTX) {
		try {
			const keyboard = Keyboard.make([
				['👤 Ver mi Informacion'],
				['🇪🇨 Agregar Pais', '📞 Agregar Telefono'],
				['🌐 Agregar Email', '🎉 Agregar Fecha de Nacimiento'],
				['⬅️ Menu Principal']
			]).reply()
			return CTX.reply('Menu de Información!', keyboard)
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
				Markup.button.callback('🔣 Abrir Menu', `openMenu:NONE`)
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
