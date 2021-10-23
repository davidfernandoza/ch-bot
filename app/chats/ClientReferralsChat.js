'use strict'
const moment = require('moment')
const str = require('string')
class ClientReferralsChat {
	constructor({ MessageString, DefaultString }) {
		this.messageString = MessageString
		this.defaultString = DefaultString
	}

	async printClient(CTX, client) {
		try {
			let message
			if (client.data) {
				message = this.buildCorrectMessage(client)
			} else {
				message = this.messageString.notReferred
			}
			return await CTX.replyWithMarkdown(message)
		} catch (error) {
			throw new Error(error)
		}
	}

	buildCorrectMessage(client) {
		try {
			const condition = '*No Existe*'
			let message = this.messageString.referred
			message = message.replace('#TITLE', client.title)
			message = message.replace('#NAME', client.data.full_name)
			message = message.replace(
				'#STATUS',
				this.defaultString.STATUS[client.data.status]
			)

			/*
			 * Phone
			 */
			if (client.data.country != condition && client.data.phone != condition) {
				message = message.replace(
					'#PHONE',
					`+${client.data.country.prefix} ${client.data.phone}`
				)
			} else message = message.replace('#PHONE', client.data.phone)

			/*
			 * Country
			 */
			if (client.data.country != condition) {
				message = message.replace(
					'#COUNTRY',
					str(client.data.country.name).capitalize().s
				)
			} else message = message.replace('#COUNTRY', client.data.country)

			return message
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = ClientReferralsChat
