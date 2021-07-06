'use strict'
const moment = require('moment')
const str = require('string')
class ClientReferralsChat {
	constructor({ MessageString, DefaultString }) {
		this.messageString = MessageString
		this.defaultString = DefaultString
	}

	async printClient(CTX, client) {
		let message
		if (client.data) {
			message = this.buildCorrectMessage(client)
		} else {
			message = this.messageString.notReferred
		}
		return await CTX.replyWithMarkdown(message)
	}

	buildCorrectMessage(client) {
		let message = this.messageString.referred
		message = message.replace('#TITLE', client.title)
		message = message.replace('#NAME', client.data.full_name)
		message = message.replace(
			'#STATUS',
			this.defaultString.STATUS[client.data.status]
		)
		if (client.data.country != '*No Existe*' && client.data.phone) {
			message = message.replace(
				'#PHONE',
				`+${client.data.country.prefix} ${client.data.phone}`
			)
		} else message = message.replace('#PHONE', client.data.phone)

		if (client.data.birthday != '*No Existe*') {
			message = message.replace(
				'#BIRTHDAY',
				moment(client.data.birthday).format('MM-DD')
			)
		} else message = message.replace('#BIRTHDAY', client.data.birthday)
		if (client.data.country != '*No Existe*') {
			message = message.replace(
				'#COUNTRY',
				str(client.data.country.name).capitalize().s
			)
		} else message = message.replace('#COUNTRY', client.data.country)

		if (client.data.user_email) {
			message += `\n*Email*: ${client.data.user_email}`
		}
		return message
	}
}
module.exports = ClientReferralsChat
