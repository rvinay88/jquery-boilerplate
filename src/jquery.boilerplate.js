// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "fext",
				defaults = {};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		Plugin.prototype = {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.settings
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.settings).
						this.watchBreakpoint();
				},
				watchBreakpoint: function () {

					$outerWrapperMakrup = "<div class='off-canvas-wrap'><div class='inner-wrap'>";
					$tabBarleftMarkup = "<nav class='tab-bar'><section class='left-small'><a class='left-off-canvas-toggle menu-icon'><span></span></a></section>";
					$tabBarMiddleMarkup = "<section class='middle tab-bar-section'></section>"
					$tabBarRightMarkup = "<section class='right-small'><a class='right-off-canvas-toggle menu-icon' ><span></span></a></section></nav>";
					$leftAsideMarkup = "<aside class='left-off-canvas-menu'><ul class='off-canvas-list'><li><label>Foundation</label></li></ul></aside>";
					$rightAsideMarkup = "<aside class='right-off-canvas-menu'><ul class='off-canvas-list'><li><label>Foundation</label></li></ul></aside>";
					$mainSectionMarkup = "<section class='main-section'></section>";
					$wrapperClosure = "<a class='exit-off-canvas'></a></div></div>";
					
					var content = [
						$outerWrapperMakrup,
						$tabBarleftMarkup,
						$tabBarMiddleMarkup,
						$tabBarRightMarkup,
						$leftAsideMarkup,
						$rightAsideMarkup,
						$mainSectionMarkup,
						$wrapperClosure
					];
					
					var concatHTML = content.join('');
					
					$(window).resize (function () {
						if($(".fext").css("float") === "left") {
							$(".top-bar").show();
							
							$(".fext").removeClass("appended");
							$(".off-canvas-wrap").remove();
						};

						if($(".fext").css("float") === "none") {
							$(".top-bar").hide();
							if(!$(".fext").hasClass("appended")) {
								$(".fext-container").append(concatHTML);
								$(".fext").addClass("appended");
							}
						};						
					})
				}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
