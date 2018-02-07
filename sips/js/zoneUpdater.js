var previousFirstBinDigits = "";
var actualFirstBinDigits = "";
var isCoBadgingLogosSet = false;
var MAXIMUM_SERVER_CALLS = 20;
var nbServerCalls = 0;
var cobadgingLogosCleared = false;

ZoneUpdater = Class.create( {

    initialize : function(spec) {
        this.element = $(spec.elementId);
        this.listenerURI = spec.listenerURI;
        $(this.element).getStorage().zoneId = spec.zoneId;
        
        if (spec.clientEvent) {
            this.clientEvent = spec.clientEvent;
            this.element.observe(this.clientEvent, this.updateZone.bindAsEventListener(this));
        }
		
		this.hasCoBadgingOption = spec.hasCoBadgingOption;
		this.binLength = spec.binLength;
    },
    
    updateZone : function() {
		if(!this.hasCoBadgingOption) {
			return;
		}
		var coBadgingLogosShouldBeReset = false;
		var cardNumberFieldValue = document.getElementById("cardNumberField").value;
		cardNumberFieldValue = cardNumberFieldValue.replace(/\s+/g, '');
	
		if(isCoBadgingLogosSet &&  cardNumberFieldValue.length < this.binLength) {
			coBadgingLogosShouldBeReset = true;
		}
		
		actualFirstBinDigits = cardNumberFieldValue.substring(0, this.binLength);
		if((previousFirstBinDigits == actualFirstBinDigits || cardNumberFieldValue.length < this.binLength) && !coBadgingLogosShouldBeReset) {
			previousFirstBinDigits = actualFirstBinDigits;
			return;
		}
		
        var zoneManager = Tapestry.findZoneManager(this.element);
        
        if (!zoneManager) {
            return;
        }

        var listenerURIWithValue = this.listenerURI;
        
        if (this.element.value) {
            var param = this.element.value;
            if (param) {
                listenerURIWithValue = addQueryStringParameter(listenerURIWithValue, 'param', param);
            }
        }
		previousFirstBinDigits = actualFirstBinDigits;
		if(isCoBadgingLogosSet && cardNumberFieldValue.length < this.binLength) {
			isCoBadgingLogosSet = false;
		} else {
			isCoBadgingLogosSet = true;
		}
		if(nbServerCalls < MAXIMUM_SERVER_CALLS || (coBadgingLogosShouldBeReset && !cobadgingLogosCleared)) {
			if(nbServerCalls >= MAXIMUM_SERVER_CALLS) {
				cobadgingLogosCleared = true;
			}
			customUpdateFromUrl(zoneManager, listenerURIWithValue);
		}
    }
} )

CustomActionLink = Class.create( {

    initialize : function(spec) {
        this.element = $(spec.elementId);
        this.listenerURI = spec.listenerURI;
        $(this.element).getStorage().zoneId = spec.zoneId;
        
        if (spec.clientEvent) {
            this.clientEvent = spec.clientEvent;
            this.element.observe(this.clientEvent, this.updateZone.bindAsEventListener(this));
        }
		
		this.hasCoBadgingOption = spec.hasCoBadgingOption;
    },
    
    updateZone : function() {
		if(!this.hasCoBadgingOption) {
			return;
		}
		
        var zoneManager = Tapestry.findZoneManager(this.element);
        
        if (!zoneManager) {
            return;
        }

        var listenerURIWithValue = this.listenerURI;
        
        if (this.element.value) {
            var param = this.element.value;
            if (param) {
                listenerURIWithValue = addQueryStringParameter(listenerURIWithValue, 'param', param);
            }
        }
		
		if(nbServerCalls < MAXIMUM_SERVER_CALLS) {
			customUpdateFromUrl(zoneManager, listenerURIWithValue);
		}
    }
} )

function addQueryStringParameter(url, name, value) {
    if (url.indexOf('?') < 0) {
        url += '?'
    } else {
        url += '&';
    }
    value = escape(value);
    url += name + '=' + value;
    return url;
}

function customUpdateFromUrl(zoneManager, URL, parameters) {
	nbServerCalls++;
	var finalParameters = $H({
            't:zoneid': zoneManager.element.id
        }).update(zoneManager.specParameters);
		
	if (!Object.isUndefined(parameters)) {
		finalParameters.update(parameters);
	}
	
	Tapestry.ajaxRequest(URL, {
		parameters: finalParameters.toObject(),
		onSuccess: function (transport) {
			zoneManager.processReply(transport.responseJSON);
		}.bind(zoneManager),
		on403: function () {
			window.location.reload();
		}
	});
}
