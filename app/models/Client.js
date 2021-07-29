'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
	client_id: { type: Number, unique: true },
	sponsor_id: { type: Number, default: 1 },
	plan_id: String,
	sponsor_telegram_id: { type: String, default: '1ROOT' },
	full_name: String,
	period: Date,
	username: { type: String, unique: true },
	phone: String,
	telegram_id: { type: String, unique: true },
	email: { type: String, unique: true },
	tree_id: { type: Number, unique: true },
	action_bot: {
		step: { type: String, default: 0 },
		action: {
			type: String,
			enum: ['NONE', 'GET_WALLET', 'GET_COUNTRY', 'GET_PHONE', 'GET_EMAIL'],
			default: 'NONE'
		}
	},
	status: {
		type: String,
		enum: [
			'ACTIVE',
			'INFO',
			'INFO_ACTIVE',
			'COMPANY',
			'INACTIVE',
			'DEBT',
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
		access_token: String,
		token_type: String,
		expires_in: Date
	},
	country: {
		name: { type: String },
		prefix: { type: String },
		characters_phone: { type: Number },
		id: { type: String }
	}
})

module.exports = mongoose.model('Client', ClientSchema)
