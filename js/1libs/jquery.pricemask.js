/*

* Price Format jQuery Plugin
* Created By Eduardo Cuducos - cuducos [at] gmail [dot] com
* Currently maintained by Flavio Silveira - flavio [at] gmail [dot] com
* Version: 1.4
* Release: 2011-05-17

* original char limit by Flavio Silveira <http://flaviosilveira.com>
* original keydown event attachment by Kaihua Qi
* keydown fixes by Thasmo <http://thasmo.com>
* Clear Prefix on Blur suggest by Ricardo Mendes from PhonoWay

*/

(function($) {

	$.fn.priceFormat = function(options) {

		var defaults = {
			prefix: 'R$ ',
			centsSeparator: ',',
			thousandsSeparator: '.',
			limit: 13,
			centsLimit: 2,
			clearPrefix: false,
                        negative: false,
                        negative_class: "saldo_negativo",
                        negative_prefix: "R$ -"
		};

		var options = $.extend(defaults, options);

		return this.each(function() {

			// pre defined options
			var obj = $(this);
			var is_number = /[0-9]/;

			// load the pluggings settings
			var prefix = options.prefix;
			var centsSeparator = options.centsSeparator;
			var thousandsSeparator = options.thousandsSeparator;
			var limit = options.limit;
			var centsLimit = options.centsLimit;
			var clearPrefix = options.clearPrefix;
                        var negative = options.negative;
                        var negative_class = options.negative_class;
                        var negative_prefix = options.negative_prefix;

			// skip everything that isn't a number
			// and also skip the left zeroes
			function to_numbers (str) {
				var formatted = '';
                                var num;
				for (var i=0;i<(str.length);i++) {
					num = str.charAt(i);
					if (formatted.length==0 && num==0) num = false;
					if (num && num.match(is_number)) {
						if (limit) {
							if (formatted.length < limit) formatted = formatted+num;
						}else{
							formatted = formatted+num;
						}
					}
				}
				return formatted;
			}

			// format to fill with zeros to complete cents chars
			function fill_with_zeroes (str) {
				while (str.length<(centsLimit+1)) str = '0'+str;
				return str;
			}

			// format as price
			function price_format (str) {

				// formatting settings
				var formatted = fill_with_zeroes(to_numbers(str));
				var thousandsFormatted = '';
				var thousandsCount = 0;

				// split integer from cents
				var centsVal = formatted.substr(formatted.length-centsLimit,centsLimit);
				var integerVal = formatted.substr(0,formatted.length-centsLimit);

				// apply cents pontuation
				formatted = integerVal+centsSeparator+centsVal;

				// apply thousands pontuation
				if (thousandsSeparator) {
                                    var num;
					for (var j=integerVal.length;j>0;j--) {
						num = integerVal.substr(j-1,1);
						thousandsCount++;
						if (thousandsCount%3==0) num = thousandsSeparator+num;
						thousandsFormatted = num+thousandsFormatted;
					}
					if (thousandsFormatted.substr(0,1)==thousandsSeparator) thousandsFormatted = thousandsFormatted.substring(1,thousandsFormatted.length);
					formatted = thousandsFormatted+centsSeparator+centsVal;
				}

				if (negative && str.indexOf('-') != -1 && (integerVal != 0 || centsVal != 0))
                                {
                                    obj.addClass(negative_class);
                                    prefix = negative_prefix;
                                }
                                else
                                {
                                    obj.removeClass(negative_class);
                                    prefix = options.prefix;
                                }

				// apply the prefix
				if (prefix) formatted = prefix+formatted;

				return formatted;

			}

			// filter what user type (only numbers and functional keys)
			function key_check (e) {

				var code = (e.keyCode ? e.keyCode : e.which);
				var typed = String.fromCharCode(code);
				var functional = false;
				var str = obj.val();
				var newValue = price_format(str+typed);

				// allow keypad numbers, 0 to 9
				if((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) functional = true;

				// check Backspace, Tab, Enter, and left/right arrows
				if (code ==  8) functional = true; //backspace
				if (code ==  9) functional = true;
				if (code == 13) functional = true;
				if (code == 37) functional = true;
				if (code == 39) functional = true;
				if (code == 116) functional = true; // F5
				if (code == 17) functional = true; // ctrl
				if (code == 86) functional = true; // v
				if (code == 67) functional = true; // c
				if ( (code == 189 ||code == 109) && negative) functional = true; // minus

				if (!functional) {
					e.preventDefault();
					e.stopPropagation();
					if (str!=newValue) obj.val(newValue);
				}
//                                else{
//                                    if(negative)
//                                    {
//                                        if(code==189 || code==109){
//                                            obj.addClass(negative_class);
//                                            prefix = negative_prefix;
//                                        }else if(code ==8) {
//                                            obj.removeClass(negative_class);
//                                            prefix = defaults.prefix;
////                                            alert(prefix);
//                                        }
//                                    }
//                                }

			}

			// inster formatted price as a value of an input field
			function price_it () {
				var str = obj.val();
				var price = price_format(str);
				if (str != price) obj.val(price);
			}

			// Add prefix on focus
			function add_prefix()
			{
				var val = obj.val();
				obj.val(prefix + val);
			}

			// Clear prefix on blur if is set to true
			function clear_prefix()
			{
				var array = obj.val().split(prefix);
				obj.val(array[1]);
			}

			// bind the actions
			$(this).bind('keydown', key_check);
			$(this).bind('keyup', price_it);

			// Clear Prefix and Add Prefix if need
			if(clearPrefix)
			{
				$(this).bind('focusout', function()
				{
					clear_prefix();
				});

				$(this).bind('focusin', function()
				{
					add_prefix();
				});
			}

			// If value has content
			if ($(this).val().length>0)
			{
				price_it();

				if(clearPrefix)
					clear_prefix();
			}


		});

	};

})(jQuery);