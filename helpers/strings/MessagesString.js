'use strict'

module.exports = {
	serverError:
		'El chat en este momento no esta disponible, intenta mas tarde o contacte a soporte.',
	isBot: 'No puede ser un bot para usar este chat.',
	addresUnavalible:
		'La dirección de tron no es valida, intenta enviarla otra vez.',

	clientExistError:
		'El usuario ya existe en el sistema. \nUsa el comando /menu para abrir el menu del usuario. \n\nÓ usa el siguiente botón.',
	clientNotExistError:
		'El usuario no existe en el sistema. \nUsa el comando /start para crear un nuevo usuario. \n\nÓ usa el siguiente botón',
	clientNotActive:
		'El usuario no esta activo en la plataforma debe de hacer la siguiente transacción.',

	webKvalidate:
		'Hola!! Si estas en la plataforma web de "*Telegram WebK*" o la plataforma web de "*Telegram WebZ*" te recomendamos que descargues la aplicación de escritorio para tu sistema operativo correspondiente, ya que dichas plataformas web están limitadas para todas las opciones de la plataforma.\n\nPuedes descargar telegram para tu sistema operativo desde el siguiente link.\n\nhttps://telegram.org/apps',

	registerRule:
		'¡Hola! #NAME, pon mucha atención a las reglas de Cadena ahorro: \n\n#TERM \n\nPlan de ahorro:\n\n #PLAN',
	succesClient: '¡Se ha creado el usuario con éxito!',
	sendTronAddress:
		'Por favor envie su dirección tron. \n\n*Nota*: Tenga en cuenta que desde esta dirección tron se debe enviar las consignaciones y en esta misma recibirá los pagos.',
	sendWalletConsignment:
		'Enviá la cantidad de #AMOUNT QFS a la aterior dirección tron\n(Puedes escanear el código QR)\n\n- Después de hacer la consignación solicita la validación de esta.',
	sendChangeToWallet:
		'*Nota*: corrobore la dirección tron que asigno a su cuenta antes de hacer la consignación, ya que con dicha dirección se validara la transacción.\n\n- Si la dirección tron que previamente asigno a su cuenta no es correcta, la puedes cambiar.',
	wishChangeToWallet:
		'Si quieres cambiar tu dirección tron puedes hacerlo con el siguiente botón.',
	transactionComplete:
		'Transacción ejecutada correctamente.\nEstas activo hasta #DATE.',
	transactionNone:
		'En el momento no se encuentra ninguna transacción en cola, espera un momento y vuélvalo a intentar.',
	transactionIncomplete:
		'Hay varias transacciones que no completan el valor total de #TOTAL QFS para la consignación, hace fatal #AMOUNT QFS para activar la cuenta.\n\nUsar el anterior código QR o enviá la cantidad de #AMOUNT QFS a la anterior dirección tron',
	referred:
		'*#TITLE*\n\n*Nombre*: #NAME\n*Estado*: #STATUS\n*País*: #COUNTRY\n*Teléfono*: #PHONE',
	notReferred: 'No existe usuario en esta posición.',
	infoValidate:
		'Falta información personal para que puedas seguir usando la plataforma.\nEmpieza por #INFO',
	getCountry: 'Selecciona tu país en la siguiente lista:',
	setCountry: 'Selección de país hecha correctamente',
	defaultTextMessage:
		'La plataforma esta esperando #ACTION, si quiere puedes enviar el requerimiento o cancelar la acción con el siguiente botón.',
	cancelActionMessage: 'Acción cancelada.',
	otherTextSended: 'La plataforma no esta esperando texto en este momento.',
	countryNotExistError: 'Debes de seleccionar primero el país.',
	getPhoneMessage:
		'Escribe tu numero de teléfono celular que estés usando con este telegram.',
	getEmailMessage: 'Escribe tu correo electrónico.',
	isNotPhone: 'El teléfono enviado no es valido, intenta enviarlo otra vez.',
	isNotEmail:
		'El correo electrónico enviado no es valido, intenta enviarlo otra vez.',
	setEmail: 'Selección de correo electrónico hecha correctamente.',
	setPhone: 'Selección de teléfono hecha correctamente.',
	incompleteMessage:
		'Termina de pagar tu consignación con la cantidad que te enviamos.',
	infoBackMissing:
		'Todavía no tienes una posición en el árbol, si ya llevas mas de 1 (un) dia con este problema comunicate con soporte.\nsigue el siguiente link:\n\n#URL',
	historicPeriodMessage:
		'*Ciclo: #CODE*\n\n*Fecha de inicio:* #DATE_IN\n*Fecha de cierre:* #DATE_OUT\n*Cantidad de transacciones:* #CONSIGNMENTS_AMOUNT\n*Estado:* #STATUS',
	statusClientInPeriodMessage:
		'*Ciclo: #CODE* (Actual)\n\n*Fecha de inicio:* #DATE_IN\n*Fecha de cierre:* #DATE_OUT\n*En el actual ciclo tienes un estado de:* #CLIENT_STATUS',
	historicPeriodTitleMessage: '*Historico de ciclos pagos:*',
	statusClientPeriodTitleMessage: '*Estado del ciclo actual:*',
	notHavePeriodMessage: '🚫 *No hay periodos pagos*'
}
