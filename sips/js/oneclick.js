
jQuery(document).ready(function($) {

	$('input[name=\'addCardToWalletField\']').change(function() {
		$("#aliasBlock").toggle(this.value == "true");
		$("#sectionOneClickLegalNotice").toggle(this.value == "true");
	});

	$("input[name='addCardToWalletField']:checked").change();

});
