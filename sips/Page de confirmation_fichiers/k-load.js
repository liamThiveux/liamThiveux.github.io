// Le Studio, Atos Worldline, 2013
// Groups all functions to be loaded on page loading
// Version 2

// Identifies IE version - only for tests on X-UA-Compatible 
var ie6 = (navigator.appName == "Microsoft Internet Explorer"
		&& parseInt(navigator.appVersion) == 4 && navigator.appVersion
		.indexOf("MSIE 6.0") != -1);
var ie7 = (navigator.appName == "Microsoft Internet Explorer"
		&& parseInt(navigator.appVersion) == 4 && navigator.appVersion
		.indexOf("MSIE 7.0") != -1);
var ie8 = (navigator.appName == "Microsoft Internet Explorer"
		&& parseInt(navigator.appVersion) == 4 && navigator.appVersion
		.indexOf("MSIE 8.0") != -1);

// Loading all scripts ...

window.onload = function(e) {

	// Set class on html element for touch/no-touch
	if (is_touch_device() == "true") {
		jQuery('html').addClass('flexNav-touch');
	} else {
		jQuery('html').addClass('flexNav-no-touch');
	}

	// --------------------------------------------------------------
	// HIDE URL BAR FOR iPHone ----------------------------------

	if (jQuery(window).width() <= 490) {
		window.scrollTo(0, 1);
	}

	// --------------------------------------------------------------
	// MODAL ----------------------------------

	if (jQuery.fn.kModal) {
		jQuery('.k-modal-trigger').kModal();
	}

	// --------------------------------------------------------------
	// LANGUAGE FLAGS ----------------------------------

	if (!(ie6 || ie7)) {
		if (jQuery.fn.languageFlag) {
			jQuery('form.k-language').languageFlag();
		}
	}

	// --------------------------------------------------------------
	// PRINT

	toPrint();

	// --------------------------------------------------------------
	// FALLBACK TO SVG

	if (!(document.implementation.hasFeature(
			"http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"))) {
		fallbackSVG();
	}

	// ----------------------------------------------------
	// COLLAPSE TRANSACTION MENU
	
	jQuery("span.transactionShowMore").click(function() {
		jQuery("dl.data-sheet").toggle(500);
		(jQuery(this).text() == "+") ? jQuery(this).text("-") : jQuery(this).text("+");
	});
	
		// ----------------------------------------------------
	// DISTRIBUTION PAYMENT METHOD
	
	if(jQuery("a.mozaic").length){
			nbElt = jQuery("a.mozaic").find("li").length
			jQuery("a.mozaic").addClass("item_"+nbElt);
	}
	
	// ----------------------------------------------------
}; // close function

