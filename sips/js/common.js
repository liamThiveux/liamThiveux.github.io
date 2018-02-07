function setMerchantInfos(merchantInfos) {

	  var el = merchantInfos.split('|');
	  var merchantId = el[0];
	  var secretKey = el[1];
	  var keyVersion = el[2];
	  
	  document.getElementById('merchantId').value = merchantId;
	  document.getElementById('secretKey').value = secretKey;
	  document.getElementById('keyVersion').value = keyVersion;

	}

	function setTransactionReference() {

	  var date = new Date();
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var seconds = date.getSeconds();
	  var milliseconds = date.getMilliseconds();

	  if (hours < 10)
	    hours = '0' + hours;
	  
	  if (minutes < 10)
	    minutes = '0' + minutes;
	    
	  if (seconds < 10)
	    seconds = '0' + seconds;
	    
	  if (milliseconds < 10)
	    milliseconds = '0' + milliseconds;
	    
	  if (milliseconds < 100)
	    milliseconds = '0' + milliseconds;
	  
	  var transactionReference = hours + '' + minutes + '' + seconds + '' + milliseconds;
	  document.getElementById('transactionReference').value = transactionReference;

	}

	function resetField(field) {

	  document.getElementById(field).value = '';

	}

	function switchMode(mode) {
		
	  var elements = document.getElementsByClassName('advanced');

	  if (mode == 'advanced') {
	  
	    document.getElementById('advancedMode').style.display = 'none';
	    document.getElementById('simpleMode').style.display = 'inline';
		document.getElementById('managementModeBlock').style.display = 'none';
	    for (var i=0; i<elements.length; i++) {
	      elements[i].style.display = 'block';
	    }
	  }
	  
	  if (mode == 'simple') {
	  
	    document.getElementById('advancedMode').style.display = 'inline';
	    document.getElementById('simpleMode').style.display = 'none';
		document.getElementById('managementModeBlock').style.display = 'none';
	    for (var i=0; i<elements.length; i++) {
	      elements[i].style.display = 'none';
	    }
	  }
	  if (mode == 'payment') {
	  
	    document.getElementById('paymentMode').style.display = 'none';
	    document.getElementById('managementMode').style.display = 'inline';
		document.getElementById('paymentModeBlock').style.display = 'inline';
		document.getElementById('managementModeBlock').style.display = 'none';
	    
	  }
	  if (mode == 'management') {
	  
	    document.getElementById('paymentMode').style.display = 'inline';
	    document.getElementById('managementMode').style.display = 'none';
		document.getElementById('paymentModeBlock').style.display = 'none';
		document.getElementById('managementModeBlock').style.display = 'inline';
	  }

	}
	
	function toggleplusminus(obj) {
		
		var id =  obj.id;
		//Customer data
		if (id == 'customer-plus') {
			document.getElementById('customer-plus').style.display = 'none';
		    document.getElementById('customer-minus').style.display = 'inline';
		    document.getElementById('customer-content').style.display = 'inline';
		    document.getElementById('customerAddressFlag').value = 'true';
		}
		
		if (id == 'customer-minus') {
			document.getElementById('customer-plus').style.display = 'inline';
		    document.getElementById('customer-minus').style.display = 'none';
		    document.getElementById('customer-content').style.display = 'none';
		    document.getElementById('customerAddressFlag').value = 'false';
		}
		
			//Customer data
		if (id == 'personal-plus') {
			document.getElementById('personal-plus').style.display = 'none';
		    document.getElementById('personal-minus').style.display = 'inline';
		    document.getElementById('personal-content').style.display = 'inline';
		    document.getElementById('personalFlag').value = 'true';
		}
		
		if (id == 'personal-minus') {
			document.getElementById('personal-plus').style.display = 'inline';
		    document.getElementById('personal-minus').style.display = 'none';
		    document.getElementById('personal-content').style.display = 'none';
		    document.getElementById('personalFlag').value = 'false';
		}
		
		//PayPal toggle logic
		if (id == 'paypal-plus') {
			document.getElementById('paypal-plus').style.display = 'none';
		    document.getElementById('paypal-minus').style.display = 'inline';
		    document.getElementById('paypal-content').style.display = 'inline';
		    document.getElementById('paypalFlag').value = 'true';
		}
		
		if (id == 'paypal-minus') {
			document.getElementById('paypal-plus').style.display = 'inline';
		    document.getElementById('paypal-minus').style.display = 'none';
		    document.getElementById('paypal-content').style.display = 'none';
		    document.getElementById('paypalFlag').value = 'false';
		}
		
		//Payment several time toggle logic
		if (id == 'paysevtime-plus') {
			document.getElementById('paysevtime-plus').style.display = 'none';
		    document.getElementById('paysevtime-minus').style.display = 'inline';
		    document.getElementById('paysevtime-content').style.display = 'inline';
		    document.getElementById('paymentSeveralTimeFlag').value = 'true';
		}
		
		if (id == 'paysevtime-minus') {
			document.getElementById('paysevtime-plus').style.display = 'inline';
		    document.getElementById('paysevtime-minus').style.display = 'none';
		    document.getElementById('paysevtime-content').style.display = 'none';
		    document.getElementById('paymentSeveralTimeFlag').value = 'false';
		}
		
		//Bridge toggle logic
		if (id == 'bridge-plus') {
			document.getElementById('bridge-plus').style.display = 'none';
		    document.getElementById('bridge-minus').style.display = 'inline';
		    document.getElementById('bridge-content').style.display = 'inline';
		    document.getElementById('bridgeFlag').value = 'true';
		}
		
		if (id == 'bridge-minus') {
			document.getElementById('bridge-plus').style.display = 'inline';
		    document.getElementById('bridge-minus').style.display = 'none';
		    document.getElementById('bridge-content').style.display = 'none';
		    document.getElementById('bridgeFlag').value = 'false';
		    
		}
		
		//facilypay toggle logic
		if (id == 'facilypay-plus') {
			document.getElementById('facilypay-plus').style.display = 'none';
		    document.getElementById('facilypay-minus').style.display = 'inline';
		    document.getElementById('facilypay-content').style.display = 'inline';
		    document.getElementById('facilypayFlag').value = 'true';
		}
		
		if (id == 'facilypay-minus') {
			document.getElementById('facilypay-plus').style.display = 'inline';
		    document.getElementById('facilypay-minus').style.display = 'none';
		    document.getElementById('facilypay-content').style.display = 'none';
		    document.getElementById('facilypayFlag').value = 'false';
		    
		}
		
		
		//presto toggle logic
		if (id == 'presto-plus') {
			document.getElementById('presto-plus').style.display = 'none';
		    document.getElementById('presto-minus').style.display = 'inline';
		    document.getElementById('presto-content').style.display = 'inline';
		    document.getElementById('prestoFlag').value = 'true';
		}
		
		if (id == 'presto-minus') {
			document.getElementById('presto-plus').style.display = 'inline';
		    document.getElementById('presto-minus').style.display = 'none';
		    document.getElementById('presto-content').style.display = 'none';
		    document.getElementById('prestoFlag').value = 'false';
		    
		}
		
		//presto toggle logic
		if (id == 'sdd-plus') {
			document.getElementById('sdd-plus').style.display = 'none';
		    document.getElementById('sdd-minus').style.display = 'inline';
		    document.getElementById('sdd-content').style.display = 'inline';
		    document.getElementById('sddFlag').value = 'true';
		}
		
		if (id == 'sdd-minus') {
			document.getElementById('sdd-plus').style.display = 'inline';
		    document.getElementById('sdd-minus').style.display = 'none';
		    document.getElementById('sdd-content').style.display = 'none';
		    document.getElementById('sddFlag').value = 'false';
		    
		}
	
		//cofidis toggle logic
		if (id == 'cofidis-plus') {
			document.getElementById('cofidis-plus').style.display = 'none';
		    document.getElementById('cofidis-minus').style.display = 'inline';
		    document.getElementById('cofidis-content').style.display = 'inline';
		    document.getElementById('cofidisFlag').value = 'true';
		}
		
		if (id == 'cofidis-minus') {
			document.getElementById('cofidis-plus').style.display = 'inline';
		    document.getElementById('cofidis-minus').style.display = 'none';
		    document.getElementById('cofidis-content').style.display = 'none';
		    document.getElementById('cofidisFlag').value = 'false';
		    
		}
		
		//rms toggle logic
		if (id == 'rms-plus') {
			document.getElementById('rms-plus').style.display = 'none';
		    document.getElementById('rms-minus').style.display = 'inline';
		    document.getElementById('rms-content').style.display = 'inline';
		    document.getElementById('rmsFlag').value = 'true';
		}
		
		if (id == 'rms-minus') {
			document.getElementById('rms-plus').style.display = 'inline';
		    document.getElementById('rms-minus').style.display = 'none';
		    document.getElementById('rms-content').style.display = 'none';
		    document.getElementById('rmsFlag').value = 'false';
		}

		//shoppingCartDetail toggle logic
		if (id == 'shoppingCartDetail-plus') {
			document.getElementById('shoppingCartDetail-plus').style.display = 'none';
			document.getElementById('shoppingCartDetail-minus').style.display = 'inline';
			document.getElementById('shoppingCartDetail-content').style.display = 'inline';
			document.getElementById('shoppingCartFlag').value = 'true';
		}

		if (id == 'shoppingCartDetail-minus') {
			document.getElementById('shoppingCartDetail-plus').style.display = 'inline';
			document.getElementById('shoppingCartDetail-minus').style.display = 'none';
			document.getElementById('shoppingCartDetail-content').style.display = 'none';
			document.getElementById('shoppingCartFlag').value = 'false';

		}

		//cetelem3x toggle logic
		if (id == 'cetelem3x-plus') {
			document.getElementById('cetelem3x-plus').style.display = 'none';
			document.getElementById('cetelem3x-minus').style.display = 'inline';
			document.getElementById('cetelem3x-content').style.display = 'inline';
			document.getElementById('cetelem3xFlag').value = 'true';
		}

		if (id == 'cetelem3x-minus') {
			document.getElementById('cetelem3x-plus').style.display = 'inline';
			document.getElementById('cetelem3x-minus').style.display = 'none';
			document.getElementById('cetelem3x-content').style.display = 'none';
			document.getElementById('cetelem3xFlag').value = 'false';

		}

		//cetelem4x toggle logic
		if (id == 'cetelem4x-plus') {
			document.getElementById('cetelem4x-plus').style.display = 'none';
			document.getElementById('cetelem4x-minus').style.display = 'inline';
			document.getElementById('cetelem4x-content').style.display = 'inline';
			document.getElementById('cetelem4x3xFlag').value = 'true';
		}

		if (id == 'cetelem4x-minus') {
			document.getElementById('cetelem4x-plus').style.display = 'inline';
			document.getElementById('cetelem4x-minus').style.display = 'none';
			document.getElementById('cetelem4x-content').style.display = 'none';
			document.getElementById('cetelem4xFlag').value = 'false';
		}

	}
	
	function initialize()	{
	
		document.getElementById('paypalFlag').value = 'false';
		document.getElementById('paymentSeveralTimeFlag').value = 'false';
		document.getElementById('bridgeFlag').value = 'false';
		document.getElementById('rmsFlag').value = 'false';
		document.getElementById('prestoFlag').value = 'false';
		document.getElementById('cetelem3xFlag').value = 'false';
		document.getElementById('cetelem4xFlag').value = 'false';
	}
	