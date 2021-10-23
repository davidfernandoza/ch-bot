'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
	client_id: { type: Number, unique: true },
	sponsor_id: { type: Number },
	plan_id: { type: Number, nullable: true },
	sponsor_telegram_id: { type: Number },
	full_name: {
		type: String
	},
	period: { type: Date, nullable: true },
	phone: { type: String, nullable: true },
	telegram_id: { type: String, unique: true },
	status: {
		type: String,
		enum: [
			'ACTIVE',
			'INFO',
			'INFO_ACTIVE',
			'COMPANY',
			'INACTIVE',
			'INCOMPLETE'
		],
		default: 'INACTIVE'
	},
	wallet: {
		id: Number,
		key: { type: String, unique: true },
		status: { type: Boolean, default: false },
		action_wallet: { type: String, default: 'NONE' } //Update or Created
	},
	auth: {
		access_token: { type: String, nullable: true },
		token_type: { type: String, nullable: true },
		expires_in: { type: Date, nullable: true }
	},
	country: {
		id: { type: Number, nullable: true },
		name: { type: String, nullable: true },
		prefix: { type: String, nullable: true },
		characters_phone: { type: Number, nullable: true }
	},
	action_bot: {
		step: { type: Number, default: 0 },
		action: {
			type: String,
			enum: ['NONE', 'GET_WALLET', 'GET_COUNTRY', 'GET_PHONE'],
			default: 'NONE'
		}
	}
})

module.exports = mongoose.model('Client', ClientSchema)
