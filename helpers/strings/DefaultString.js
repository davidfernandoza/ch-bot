'use strict'

module.exports = {
	/*
	 * Id del los terminos por defecto
	 */
	GENERAL_TERM: 1,
	DEFAULT_PLAN: 1,
	CREATE_WALLET: 'CREATE_WALLET',
	UPDATE_NEW_WALLET: 'UPDATE_NEW_WALLET',
	UPDATE_WALLET: 'UPDATE_WALLET',
	GET_WALLET: 'GET_WALLET',
	GET_COUNTRY: 'GET_COUNTRY',
	GET_PHONE: 'GET_PHONE',
	GET_EMAIL: 'GET_EMAIL',
	VALIDATE_TRANSACTION_STATUS: ['EXCEEDED', 'COMPLETE'],
	URL_REFERRED: 'https://t.me/ahorroFacilBot?start=#',
	URL_SUPPORT: 'https://t.me/supportAhorroFacil?start=#',
	STATUS: {
		ACTIVE: 'Activo',
		INFO: 'Perfil Incompleto ó Sin Posición\n*(Espera unos minutos)*',
		INFO_ACTIVE:
			'Perfil Incompleto ó Sin Posición\n*(Espera unos minutos - usa el menu principal)*',
		COMPANY: 'Inactivo',
		INACTIVE: 'Inactivo',
		INCOMPLETE: 'Inactivo con Pago Incompleto'
	},
	INFO: {
		phone: 'el *Teléfono*',
		email: 'el *Email*',
		country: 'el *País*'
	},
	ACTIONS: {
		GET_WALLET: 'una *dirección tron*',
		GET_COUNTRY: 'un *país a seleccionar*',
		GET_PHONE: 'un *teléfono*',
		GET_EMAIL: 'un *correo electrónico*'
	}
}
