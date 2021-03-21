'use strict'
const qrcode = require('qrcode')

/*
 * Genera codigo QR con valor pasado por parametro
 * retorna imagen PNG convertida de base64 a binario
 */
class QrCode {
	generate(toCode) {
		return new Promise((resolve, reject) => {
			qrcode.toDataURL(toCode, (error, code) => {
				if (error) reject(error)
				resolve(
					Buffer.from(code.replace(/^data:image\/png;base64,/, ''), 'base64')
				)
			})
		})
	}
}

module.exports = QrCode
