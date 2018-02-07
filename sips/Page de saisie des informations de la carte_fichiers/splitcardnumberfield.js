/**
 * Autotab - jQuery plugin 1.1b http://www.lousyllama.com/sandbox/jquery-autotab
 *
 * Copyright (c) 2008 Matthew Miller
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Revised: 2008-09-10 16:55:08
 */

(function($) {
    // Look for an element based on ID or name
    var check_element = function(name) {
        var obj = null;
        var check_id = $('#' + name);
        var check_name = $('input[name=' + name + ']');

        if(check_id.length)
            obj = check_id;
        else if(check_name != undefined)
            obj = check_name;

        return obj;
    };

    /**
     * Function used to generate the split of card number according to : length :
     * number of blocks tab : array which contains size of characters for each block
     *
     * The base field must not be split if :
     * - The selectedPaymentMean or the paymentMeans contains only elements of [CB, VISA, MasterCard, Maestro, VPay, VISA_ELECTRON] (4 blocks)
     * - The selectedPaymentMean or the paymentMeans contains only AMEX (3 blocks)
     *
     * Note : If the selectedPaymentMeans is null or empty, the payment mean selection page has been by-passed.
     * There is probably only card types in the full payment means list. It is then used to determine the split.
     *
     * When a block is modified, the base field must be updated.
     * When MIF (CoBadging option) is enabled, the zone must be updated as well.
     *
     * @param selectedPaymentMean The selected payment mean(s). It can be multiple elements when co-badging is enabled (card types).
     * @param paymentMeans The full list of paymentMeans.
     */
    $.fn.generateSplit = function(selectedPaymentMean, paymentMeans, mifEnabled) {

        // Split determination
        var paymentMeanList = (selectedPaymentMean != "" && selectedPaymentMean != 'null') ? selectedPaymentMean : paymentMeans,
            possibleSplits = {
                'Amex' : [4,6,5],
                'CB' : [4,4,4,7]
            },
            splitTab;
        if(isCBSplit(paymentMeanList)){
            splitTab = possibleSplits.CB;
        } else if (isAmexSplit(paymentMeanList)) {
            splitTab = possibleSplits.Amex;
        } else {
            return;
        }

        var cardNumberBaseField = $('input#cardNumberField'),
            blocksContainer = $('#splitCardNumberBlock'),
            numberOfBlocks = splitTab.length,
            blockClass = 'cardNumberFieldSplitBlock',
            pixelsPerCharacter = 8;

        cardNumberBaseField.hide(0);

        // Blocks creation
        for (i = 0; i < numberOfBlocks; i++) {
        	var blockId = 'cardNumberField'+i;
        	jQuery('<input />', {
        		type: 'text',
				id: blockId,
                maxlength: splitTab[i],
                autocomplete: 'OFF',
                style: 'width:' + (splitTab[i] * pixelsPerCharacter) + 'px;'
            }).appendTo(blocksContainer);
            $('#' + blockId).addClass(blockClass);
            if (i < numberOfBlocks - 1)
                blocksContainer.append(' - ');
        }

        // Blocks events (base field replication, zone update + auto-tabulations)
        $('.' + blockClass).on("keyup", function(){
            var concatenate = "";
            for (i = 0; i < numberOfBlocks; i++)
                concatenate += $('#cardNumberField'+i).val();
            cardNumberBaseField.val(concatenate);
            if(mifEnabled == 'true') {
                defaultZoneUpdater.updateZone();
            }
        }).autotab_magic();

        // Put the cursor in the first block at the end
        $('input#cardNumberField0').focus();
    };

    /**
     * Determines if the given payment means list only contains AMEX.
     *
     * @param paymentMeansList : String containing the payment means to check.
     * @returns {boolean}
     */
    var isAmexSplit = function(paymentMeansList) {
        return containsOnly(paymentMeansList, ["AMEX"]);
    };

    /**
     * Determines if the given payment means list contains only elements of the following list :
     * CB, VISA, MASTERCARD, VPAY, MAESTRO, VISA_ELECTRON
     *
     * @param paymentMeansList : String containing the payment means to check.
     * @returns {boolean}
     */
    var isCBSplit = function(paymentMeansList) {
        return containsOnly(paymentMeansList, ["CB", "VISA", "MASTERCARD", "VPAY", "MAESTRO", "VISA_ELECTRON"]);
    };

    /**
     * Determines if the given payment means list contains only elements of a another payment means array.
     *
     * @param paymentMeanList : String containing the payment means to check.
     * @param paymentMeanToCheck : Array containing the allowed payment means.
     * @returns {boolean}
     */
    var containsOnly = function(paymentMeanList, paymentMeanToCheck){
        var paymentMeans = paymentMeanList.replace(/[\[|\]]/g, '').split(/,[\s]*/);
        for(var i = 0; i < paymentMeans.length; i++){
            if(paymentMeanToCheck.indexOf(paymentMeans[i]) == -1)
                return false;
        }
        return true;
    };

    /**
     * autotab_magic automatically establishes autotabbing with the next and
     * previous elements as provided by :input.
     *
     * autotab_magic should called after applying filters, if used. If any filters
     * are applied after calling autotab_magic, then Autotab may not protect against
     * brute force typing.
     *
     * @name autotab_magic
     * @param focus
     *            Applies focus on the specified element
     * @example $(':input').autotab_magic();
     */
    $.fn.autotab_magic = function(focus) {
        for(var i = 0; i < this.length; i++)
        {
            var n = i + 1;
            var p = i - 1;

            if(i > 0 && n < this.length)
                $(this[i]).autotab({ target: $(this[n]), previous: $(this[p]) });
            else if(i > 0)
                $(this[i]).autotab({ previous: $(this[p]) });
            else
                $(this[i]).autotab({ target: $(this[n]) });

            // Set the focus on the specified element
            if(focus != null && (isNaN(focus) && focus == $(this[i]).attr('id')) || (!isNaN(focus) && focus == i))
                $(this[i]).focus();
        }
        return this;
    };

    /**
     * This will take any of the text that is typed and format it according to the
     * options specified.
     *
     * Option values: format text|number|alphanumeric|all|custom - Text Allows all
     * characters except numbers - Number Allows only numbers - Alphanumeric Allows
     * only letters and numbers - All Allows any and all characters - Custom Allows
     * developer to provide their own filter
     *
     * uppercase true|false - Converts a string to UPPERCASE
     *
     * lowercase true|false - Converts a string to lowecase
     *
     * nospace true|false - Remove spaces in the user input
     *
     * pattern null|(regular expression) - Custom regular expression for the filter
     *
     * @name autotab_filter
     * @param options
     *            Can be a string, function or a list of options. If a string or
     *            function is passed, it will be assumed to be a format option.
     * @example $('#number1, #number2, #number3').autotab_filter('number');
     * @example $('#product_key').autotab_filter({ format: 'alphanumeric', nospace:
 *          true });
     * @example $('#unique_id').autotab_filter({ format: 'custom', pattern:
 *          '[^0-9\.]' });
     */
    $.fn.autotab_filter = function(options) {
        var defaults = {
            format: 'all',
            uppercase: false,
            lowercase: false,
            nospace: false,
            pattern: null
        };

        if(typeof options == 'string' || typeof options == 'function')
            defaults.format = options;
        else
            $.extend(defaults, options);

        for(var i = 0; i < this.length; i++)
        {
            $(this[i]).bind('keyup', function(e) {
                var val = this.value;

                switch(defaults.format)
                {
                    case 'text':
                        var pattern = new RegExp('[^0-9]+', 'g');
                        val = val.replace(pattern, '');
                        break;

                    case 'alpha':
                        var pattern = new RegExp('[^a-zA-Z]+', 'g');
                        val = val.replace(pattern, '');
                        break;

                    case 'number':
                    case 'numeric':
                        var pattern = new RegExp('[0-9]+', 'g');
                        val = val.replace(pattern, '');
                        break;

                    case 'alphanumeric':
                        var pattern = new RegExp('[^0-9a-zA-Z]+', 'g');
                        val = val.replace(pattern, '');
                        break;

                    case 'custom':
                        var pattern = new RegExp(defaults.pattern, 'g');
                        val = val.replace(pattern, '');
                        break;

                    case 'all':
                    default:
                        if(typeof defaults.format == 'function')
                            var val = defaults.format(val);

                        break;
                }

                if(defaults.nospace)
                {
                    var pattern = new RegExp('[ ]+', 'g');
                    val = val.replace(pattern, '');
                }

                if(defaults.uppercase)
                    val = val.toUpperCase();

                if(defaults.lowercase)
                    val = val.toLowerCase();

                if(val != this.value)
                    this.value = val;
            });
        }
    };

    /**
     * Provides the autotabbing mechanism for the supplied element and passes any
     * formatting options to autotab_filter.
     *
     * Refer to autotab_filter's description for a detailed explanation of the
     * options available.
     *
     * @name autotab
     * @param options
     * @example $('#phone').autotab({ format: 'number' });
     * @example $('#username').autotab({ format: 'alphanumeric', target: 'password'
 *          });
     * @example $('#password').autotab({ previous: 'username', target: 'confirm' });
     */
    $.fn.autotab = function(options) {
        var defaults = {
            format: 'all',
            maxlength: 2147483647,
            uppercase: false,
            lowercase: false,
            nospace: false,
            target: null,
            previous: null,
            pattern: null
        };

        $.extend(defaults, options);

        // Sets targets to element based on the name or ID
        // passed if they are not currently objects
        if(typeof defaults.target == 'string')
            defaults.target = check_element(defaults.target);

        if(typeof defaults.previous == 'string')
            defaults.previous = check_element(defaults.previous);

        var maxlength = $(this).attr('maxlength');

        // defaults.maxlength has not changed and maxlength was specified
        if(defaults.maxlength == 2147483647 && maxlength != 2147483647)
            defaults.maxlength = maxlength;
        // defaults.maxlength overrides maxlength
        else if(defaults.maxlength > 0)
            $(this).attr('maxlength', defaults.maxlength)
        // defaults.maxlength and maxlength have not been specified
        // A target cannot be used since there is no defined maxlength
        else
            defaults.target = null;

        if(defaults.format != 'all')
            $(this).autotab_filter(defaults);

        // Go to the previous element when backspace
        // is pressed in an empty input field
        return $(this).bind('keydown', function(e) {
            if(e.which == 8 && this.value.length == 0 && defaults.previous)
                defaults.previous.focus().val(defaults.previous.val());
        }).bind('keyup', function(e) {
            /**
             * Do not auto tab when the following keys are pressed 8: Backspace 9:
             * Tab 16: Shift 17: Ctrl 18: Alt 19: Pause Break 20: Caps Lock 27: Esc
             * 33: Page Up 34: Page Down 35: End 36: Home 37: Left Arrow 38: Up
             * Arrow 39: Right Arrow 40: Down Arrow 45: Insert 46: Delete 144: Num
             * Lock 145: Scroll Lock
             */
            var keys = [8, 9, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 144, 145];

            if(e.which != 8)
            {
                var val = $(this).val();

                if($.inArray(e.which, keys) == -1 && val.length == defaults.maxlength && defaults.target)
                    defaults.target.focus();
            }
        });
    };

})(jQuery);