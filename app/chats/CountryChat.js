'use strict'
const { Markup } = require('telegraf')
const str = require('string')

class CountryChat {
	constructor({ MessageString, DefaultString }) {
		this.messageString = MessageString
		this.defaultString = DefaultString
	}

	async showCountriesList(CTX, countriesList) {
		try {
			const button = Markup.inlineKeyboard(
				countriesList.map(country => {
					return Markup.button.callback(
						str(country.name).capitalize().s,
						`setCountry:${country.id}`
					)
				})
			)
			return await CTX.replyWithMarkdown(this.messageString.getCountry, button)
		} catch (error) {
			throw new Error(error)
		}
	}

	async setCountryCorrectly(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.setCountry)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = CountryChat
