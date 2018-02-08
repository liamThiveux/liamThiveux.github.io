/**
 * Builds PaymentRequest for credit cards, but does not show any UI yet.
 *
 * @return {PaymentRequest} The PaymentRequest object.
 */
function initPaymentRequest(networks) {
//  let networks = ['amex', 'diners', 'discover', 'jcb', 'mastercard', 'unionpay',
      //'visa', 'mir'];
  let types = ['debit', 'credit', 'prepaid'];
  let supportedInstruments = [
	{
		supportedMethods: ['basic-card','bobpay','https://liamThiveux.github.io'],
		data: {supportedNetworks: networks, supportedTypes: types},
	}
  ];

  let details = {
    total: {label: 'Montant de la transaction', amount: {currency: 'EUR', value: '23.20'}},
    displayItems: [
      {
        label: 'Montant de la transaction',
        amount: {currency: 'EUR', value: '23.20'},
      },
    ],
  };

  return new PaymentRequest(supportedInstruments, details);
}

/**
 * Invokes PaymentRequest for credit cards.
 *
 * @param {PaymentRequest} request The PaymentRequest object.
 */
 var payMethod = "";
 var payMean = "";

function onBuyClicked(request) {

  request.show().then(function(instrumentResponse) {
    sendPaymentToServer(instrumentResponse);
	window.setTimeout(function() {
		nextPage(payMethod,payMean);
	}, 1000);

//	document.getElementById("captureCardForm").submit();
  })
  .catch(function(err) {
    ChromeSamples.setStatus(err);
  });
}

/**
 * Simulates processing the payment data on the server.
 *
 * @param {PaymentResponse} instrumentResponse The payment information to
 * process.
 */

function sendPaymentToServer(instrumentResponse) {
  // There's no server-side component of these samples. No transactions are
  // processed and no money exchanged hands. Instantaneous transactions are not
  // realistic. Add a 2 second delay to make it seem more real.
  //window.setTimeout(function() {
  //}, 2000);
    instrumentResponse.complete('success')
        .then(function() {

          payMethod=instrumentResponse.methodName;
          if ( payMethod.search("basic-card") > -1) {
		  console.log('basic card');
            let details = instrumentResponse.details;
            payMean=details.cardNumber.substr(0,4);
          } else if ( payMethod.search("bobpay") > -1) {
	console.log("BobPay");
            payMethod="bobpay";
            payMean="bp3751012";
          } else{
	console.log("Liam pay app");
		  let details = instrumentResponse.details;
		  payMean = "carte Liam Pay"
	    }
        })
        .catch(function(err) {
          ChromeSamples.setStatus(err);
        });

  //document.getElementById("captureCardForm").submit();
}

/**
 * Converts the payment instrument into a JSON string.
 *
 * @private
 * @param {PaymentResponse} instrument The instrument to convert.
 * @return {string} The JSON string representation of the instrument.
 */
function instrumentToJsonString(instrument) {
  let details = instrument.details;
  //details.cardNumber = 'XXXX-XXXX-XXXX-' + details.cardNumber.substr(12);
  //details.cardSecurityCode = '***';

  return JSON.stringify({
    methodName: instrument.methodName,
    details: details,
  }, undefined, 2);
}

function launchPayment(networks) {
if (window.PaymentRequest) {
  let request = initPaymentRequest(networks);
    onBuyClicked(request);
    request = initPaymentRequest();
} else {
  ChromeSamples.setStatus('This browser does not support web payments');
}

function initBuyButton(payButton) {
  initPaymentRequest(function(request, optionalWarning) {
    payButton.setAttribute('style', 'display: inline;');
/**    ChromeSamples.setStatus(optionalWarning ? optionalWarning : '');
    payButton.addEventListener('click', function handleClick() {
      payButton.removeEventListener('click', handleClick);
      onBuyClicked(request);
      initBuyButton(payButton);
    });**/
  }, function(error) {
    payButton.setAttribute('style', 'display: none;');
    ChromeSamples.setStatus(error);
  });
}
}
