/**
 * Modal
 * Le Studio, 2014
 */

(function($) {
	$.fn.kModal = function(options) {
		var KEYCODE_ESC = 27;
			
		function closeThis(xmodal, xtrigger) {
			xmodal.css('display', 'none').attr('aria-hidden', 'true');
			if(xtrigger.prev().is('input')) {
				xtrigger.prev('input').focus();
			} else {
				xtrigger.focus();
			}
		}

			return this.each(function() {
					var $trigger = $(this);
					var zModal = $trigger.attr('href');
					
					// ARIA
					$(zModal).css('display', 'none').attr('role', 'dialog').attr('aria-hidden', 'true');
					$(zModal).children('.modal-body').find('> *:first-child').attr('tabindex', '0');
					
					$(zModal).children('.modal-body').prepend('<p class=\"close\"><a href=\"#\" aria-label=\"Fermer\">&#10006;</a></p>');
					$(zModal).prepend('<div class=\"overlay\"></div>');
					
					if ($('html').height() < $(window).height()) {
						$(zModal).css('height', $(window).height());
					} else {
						$(zModal).css('height', $('html').height());
					}
					$trigger.click(function(event) {
						$(zModal).addClass('active');
						$(zModal).css('display', 'block').attr('aria-hidden', 'false');
						$(zModal).find('.close').focus();
						
						$(document).keyup(function(e) {
							if (e.keyCode == KEYCODE_ESC) {
								closeThis($(zModal), $trigger);
							} 
						});
						
						$('.bt-close, p.close, .overlay').click(function(event) {
							event.preventDefault();
							closeThis($(zModal), $trigger);
						});
					});
					
					
			});
		
	};	
})(jQuery);

