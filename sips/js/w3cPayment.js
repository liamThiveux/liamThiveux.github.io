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
		supportedMethods: ['basic-card','bobpay'],
		data: {supportedNetworks: networks, supportedTypes: types},
	},
	{   supportedMethods: ['https://www.alipay.com/webpay'],
    data: {
      // Second transaction string:
      orderInfo: 'biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E4%B8%9C%E8%A5%BF%3B%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%3B%22%2C%22out_trade_no%22%3A%221486526346860%22%7D&sign=D46CRjKqvlbglEVqsmqLnviwJDgAQyFdI%2B%2BEG7Fm4ANn%2BXAj3IoQeZSdR%2ByjuYRyx4LQvCVJhT%2FDunCiWIxAYx8%2BVRaUE3g%2FvvglvKZYxR5AvWYx4bpb1nKk2kIgcrihi0q0JIl%2BN9ZHegYXNhLzhy1We325eC9%2B7BluRnpqsoITmMeYEbuW%2F6kblnVNTlK1Aqdlzqf5NLK3Q7cZFx3BRJoE9Lpp6rQQupmr28Kg271SG3RgW6%2BtUUUgLAmC852L8fVq6K5g0RCm3tgxCEvtaC%2FGaM0oYhJq0ZnhAJuaJETDqFfobHGpuL71GBMiL8H4Km0de%2BmNcXVHjWhsz%2BIXCg%3D%3D&method=alipay.trade.app.pay&charset=utf-8&version=1.0&app_id=2014100900013222&timestamp=2017-02-08+11%3A59%3A06&sign_type=RSA2', // eslint-disable-line max-len
		}
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
            let details = instrumentResponse.details;
            payMean=details.cardNumber.substr(0,4);
          } else /*if ( payMethod.search("bobpay") > -1) */{
            payMethod="bobpay";
            payMean="bp3751012";
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
