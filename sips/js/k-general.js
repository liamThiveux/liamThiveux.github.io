// Le Studio, Atos Worldline, 2013
// General functions

// ------------- Function for testing touch screens

function is_touch_device() {
	return !!('ontouchstart' in window);
}

// ------------- Printing Function

function toPrint() {
	if (jQuery(".k-print")) {
		jQuery(".k-print").click(function(event) {
			event.preventDefault();
			window.print();
			return false;
		});
	}
}

// ------------- SVG Fallback

function fallbackSVG() {
	var zString;
	jQuery('img').each(function() {
		zString = jQuery(this).attr('src');
		zString = zString.replace("svg", "png");
		jQuery(this).attr('src', zString);
	});
}
