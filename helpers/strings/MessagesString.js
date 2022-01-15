'use strict'

module.exports = {
	serverError:
		'El chat en este momento no esta disponible, intenta mas tarde o contacte a soporte.',
	isBot: 'No puede ser un bot para usar este chat.',
	addresUnavalible:
		'La dirección de tron no es valida, intenta enviarla otra vez.',
	clientExistError:
		'*Oh!* El usuario ya existe en el sistema. \nUsa el comando /menu para abrir el menu del usuario. \n\nÓ usa el siguiente botón.',
	clientNotExistError:
		'*Ops!* El usuario no existe en el sistema.\n\n*Escribe el código de referido que te paso tu patrocinador para crear un nuevo usuario.*',
	sponsorNotExist:
		'*Ops!* El código de referido del patrocinador no es correcto.\n\n*Escribe el código de referido que te paso tu patrocinador para crear un nuevo usuario.*',
	sponsorAndClientIsEquals:
		'*Ops!* El código de referido del patricinador es el mismo código del actual usuario.\n\nUsa otro link o pide otro código de patricinador.',
	clientNotActive:
		'El usuario no esta activo en la plataforma debe de hacer la siguiente transacción.',
	webKvalidate:
		'Hola!! Si estas en la plataforma web de "*Telegram WebK*" o la plataforma web de "*Telegram WebZ*" te recomendamos que descargues la aplicación de escritorio para tu sistema operativo correspondiente, ya que dichas plataformas web están limitadas para todas las opciones de la plataforma.\n\nPuedes descargar telegram para tu sistema operativo desde el siguiente link.\n\nhttps://telegram.org/apps',
	registerRule:
		'*¡Hola!* #NAME, pon mucha atención a las reglas de Cadena ahorro:',
	acceptRules:
		'*¿Leiste todo y estas de acuerdo con los terminos, condiciones y la información de Cadena de ahorro?*',
	succesClient: '¡Se ha creado el usuario con éxito!',
	sendTronAddress:
		'Por favor envie su dirección tron. \n\n*Nota*: Tenga en cuenta que desde esta dirección tron se debe enviar las consignaciones y en esta misma recibirá los pagos.',
	sendWalletConsignment:
		'Enviá la cantidad de *#AMOUNT USDT* a la aterior dirección tron\n(Puedes escanear el código QR)\n\n- Después de hacer la consignación solicita la validación de esta.',
	sendChangeToWallet:
		'*Nota*: corrobore la dirección tron que asigno a su cuenta antes de hacer la consignación, ya que con dicha dirección se validara la transacción.\n\n- Si la dirección tron que previamente asigno a su cuenta no es correcta, la puedes cambiar.',
	wishChangeToWallet:
		'Si quieres cambiar tu dirección tron puedes hacerlo con el siguiente botón.',
	transactionComplete:
		'Transacción ejecutada correctamente.\nEstas activo hasta #DATE.',
	transactionNone:
		'En el momento no se encuentra ninguna transacción en cola, espera un momento y vuélvalo a intentar.',
	transactionIncomplete:
		'Hay varias transacciones que no completan el valor total de *#TOTAL USDT* para la consignación, hace fatal *#AMOUNT USDT* para activar la cuenta.\n\nUsar el anterior código QR o enviá la cantidad de *#AMOUNT USDT* a la anterior dirección tron',
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
	setEmail: 'Selección de correo electrónico hecha correctamente.',
	setPhone: 'Selección de teléfono hecha correctamente.',

	infoBackMissing:
		'Todavía no tienes una posición en el árbol, si ya llevas mas de 1 (un) dia con este problema comunicate con soporte, exponga su caso con el siguiente código *#TELEGRAM_ID* en el sigue chat:\n\n#URL_SUPPORT',
	historicPeriodMessage:
		'*Ciclo: #CODE*\n\n*Fecha de inicio:* #DATE_IN\n*Fecha de cierre:* #DATE_OUT\n*Cantidad de transacciones:* #CONSIGNMENTS_AMOUNT\n*Estado:* #STATUS',
	statusClientInPeriodMessage:
		'*Ciclo: #CODE* (Actual)\n\n*Fecha de inicio:* #DATE_IN\n*Fecha de cierre:* #DATE_OUT\n*En el actual ciclo tienes un estado de:* #CLIENT_STATUS',
	debtPeriodMessage:
		'*Ciclo: #CODE*\n\n*Fecha de inicio:* #DATE_IN\n*Fecha de cierre:* #DATE_OUT',
	historicPeriodTitleMessage: '*Historico de ciclos pagos:*',
	statusClientPeriodTitleMessage: '*Estado del ciclo actual:*',
	debtPeriodTitleMessage: '*Ciclos siguientes a pagar:*',
	notHavePeriodMessage: '*No hay periodos para listar*',
	referredMessage:
		'Puedes enviar el *link* o el *código* a tus referidos para agregarlos a tu red.',
	clientIsCompanyStatus:
		'El usuario esta *INACTIVO de forma permanente*, esto se dio por el tiempo prolongado sin pagar varios ciclos.\nSe puede comunicar con soporte y exponer su caso con el siguiente código *#TELEGRAM_ID* en el siguiente chat:\n#URL_SUPPORT',
	correctWalleChange: 'Direccion tron actualizada correctamente.',
	walletTaken: '*Error* La direccion tron ya esta tomada, use otra.',
	balanceMessage: 'Su saldo es de: *#BALANCE USDT*',
	balanceWithoutFunds: '*Error* No tienes el saldo suficiente',
	limitCharges:
		'*Error* No puedes usar mas el saldo en este ciclo, ya llegaste al limite de 2 cobros por ciclo.',
	collectBalanceEnable:
		'*Cobro de saldo hecho exitosamente*\nEl pago del cobro se realizara entre 1 a 2 días hábiles, para ver la información del estado del cobro se recomienda estar consultando el historial de cobros en este mismo menu.\n\nSi hay alguna irregularidad en el estado del cobro, se puede comunicar con soporte y exponer su caso con el siguiente código *#TELEGRAM_ID* en el siguiente Chat:\n#URL_SUPPORT',
	collectBalanceDisable:
		'*Hubo un problema en el cobro del saldo*\n\nIntenta de nuevo o se puede comunicar con soporte y exponer su caso con el siguiente código *#TELEGRAM_ID* en el siguiente Chat:\n#URL_SUPPORT',
	referralsAreMissing:
		'*Error* No tienes el mínimo de 3 referidos activos para cobrar el saldo, ingresa a mas personas a tu red o contacta a tus referidos actuales e invítalos a activar sus cuentas.',
	historicPaymentDeliveredTitleMessage: '*Historico de pagos entregados:*',
	historicPaymentProcessingTitleMessage: '*Historico de pagos pendientes:*',
	notHavePaymentsMessage: '*No hay pagos entregados*',
	historicPaymentMessage:
		'*Pago: #CODE*\n\n*Tipo:* #TYPE\n*Valor entregado:* #VALUE\n*Fecha:* #DATE\n*A la direccion Tron:*\n#ADDRESS',
	historicConsignmentMessage:
		'*Pago: #CODE*\n\n*Tipo:* #TYPE\n*Valor entregado:* #VALUE\n*Precio del ciclo:* #PERIOD_VALUE\n*Cambio:* #CHANGE\n*Fecha:* #DATE',
	historicPendingPaymentMessage:
		'*Pago en proceso*\n\n*Valor ha entregar:* #VALUE\n*Fecha de solucitud*: #DATE',
	inactiveMessage:
		'*Usuario inactivo* haz el pago del ciclo para activar tu cuenta y poder cobrar el saldo devengado.',
	incompleteMessage:
		'*Usuario con consignación incompleta* Termina de pagar tu ciclo para activar tu cuenta y poder cobrar el saldo devengado.'
}
