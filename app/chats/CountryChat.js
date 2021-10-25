'use strict'
const { Markup } = require('telegraf')
const str = require('string')

class CountryChat {
	constructor({ MessageString, DefaultString }) {
		this.messageString = MessageString
		this.defaultString = DefaultString
	}

	async showCountriesList(CTX, countriesList) {
		const button = Markup.inlineKeyboard(
			countriesList.map(country => {
				return [
					Markup.button.callback(
						str(country.name).capitalize().s,
						`setCountry:${country.id}`
					)
				]
			})
		)
		return await CTX.replyWithMarkdown(this.messageString.getCountry, button)
	}

	async setCountryCorrectly(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.setCountry)
	}
}
module.exports = CountryChat
