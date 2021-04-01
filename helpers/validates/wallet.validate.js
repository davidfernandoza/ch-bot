'use strict'
const axios = require('axios')

/*
 * Valida si el que abre el chat es un bot
 */
class WalletValidate {
	constructor({ MessageString, Config }) {
		this.messageString = MessageString
		this.config = Config
	}

	async index(CTX, address) {
		try {
			const res = await axios(`${this.config.API_TRONGRID}/accounts/${address}`)
			if (!res.data.success) {
				CTX.reply(this.messageString.addresUnavalible)
				return false
			}
			return true
		} catch (error) {
			console.log(error)
			CTX.reply(this.messageString.addresUnavalible)
			return false
		}
	}
}

module.exports = WalletValidate

// const validate = require('validate.js')
// this.rules = {
// 	presence: true,
// 	address: { length: { is: 34 } }
// }
// const Form = {address: '41e9d79cc47518930bc322d9bf7cddd260a0260a8d'}
// await validate(Form, this.rules)
