'use strict'
require('dotenv').config()
const defaultStrings = require('../helpers/strings/DefaultString')

const { NODE_ENV } = process.env,
	DATA = {
		NODE_ENV: process.env.NODE_ENV,
		PORT: process.env.PORT,
		ORIGIN: process.env.ORIGIN,
		API: process.env.API,
		TOKEN_BOT: process.env.TOKEN_BOT,
		END_POIND_BOT: process.env.END_POIND_BOT,
		TOKEN_ORIGIN: process.env.TOKEN_ORIGIN,
		BD_CONNECTION_URL: process.env.BD_CONNECTION_URL,
		API_TRONGRID: process.env.API_TRONGRID,
		ASSET_ID: process.env.ASSET_ID,
		STRINGS: defaultStrings,
		ORIGIN_CLIENT_CODE: process.env.ORIGIN_CLIENT_CODE
	},
	PRODUCTION = DATA,
	DEVELOPMENT = {
		...DATA,
		TOKEN_BRIDGE: process.env.TOKEN_BRIDGE
	}

let APP = DEVELOPMENT
if (NODE_ENV === 'production') {
	APP = PRODUCTION
}

module.exports = APP
