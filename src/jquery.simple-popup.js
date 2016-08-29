(function ($) {

    "use strict";

    $.fn.simplePopup = function(options) {
        /**
         * Javascript this
         */
        var that = this;

        /**
         * The data to be inserted in the popup
         */
        var data;

        /**
         * Determined type, based on type option (because we have possible value "auto")
         */
        var determinedType;

        /**
         * Different types are supported:
         *
         * "auto"   Will first try "data", then "html" and else it will fail.
         * "data"   Looks at current HTML "data-content" attribute for content
         * "html"   Needs a selector of an existing HTML tag
         */
        var types = [
            "auto",
            "data",
            "html",
        ];

        /**
         * Default values
         */
        var settings = $.extend({
            type: "auto",                   // Type to get content
            htmlSelector: null,             // HTML selector for popup content
            width: "600px",                 // Width popup
            height: "auto",                 // Height popup
            background: "#fff",             // Background popup
            backdrop: 0.7,                  // Backdrop opactity or falsy value
            backdropBackground: "#000",     // Backdrop background (any css here)
            inlineCss: true,                // Inject CSS via JS
            escapeKey: true,                // Close popup when "escape" is pressed"
            closeCross: true,               // Display a closing cross
            fadeInDuration: 0.3,            // The time to fade the popup in, in seconds
            fadeInTimingFunction: "ease",   // The timing function used to fade the popup in
            fadeOutDuration: 0.3,           // The time to fade the popup out, in seconds
            fadeOutimingFunction: "ease",   // The timing function used to fade the popup out
            beforeOpen: function(){},
            afterOpen: function(){},
            beforeClose: function(){},
            afterClose: function(){}
        }, options );

        /**
         * A selector string to filter the descendants of the selected elements that trigger the event.
         */
        var selector = this.selector;

        /**
         * init
         *
         * Set the onclick event, determine type, validate the settings, set the data and start popup.
         *
         * @returns {this} jQuery object
         */
        function init() {
            validateSettings();

            determinedType = determineType();
            data = setData();

            startPopup();

            return that;
        }

        /**
         * validateSettings
         *
         * Check for some settings if they are correct
         *
         * @returns {void}
         */
        function validateSettings() {
            if (settings.type !== "auto"
                && settings.type !== "data"
                && settings.type !== "html"
            ) {
                throw new Error("simplePopup: Type must me \"auto\", \"data\" or \"html\"");
            }

            if (settings.backdrop > 1 || settings.backdrop < 0) {
                throw new Error("simplePopup: Please enter a \"backdrop\" value <= 1 of >= 0");
            }

            if (settings.fadeInDuration < 0 || Number(settings.fadeInDuration) !== settings.fadeInDuration) {
                throw new Error("simplePopup: Please enter a \"fadeInDuration\" number >= 0");
            }

            if (settings.fadeOutDuration < 0 || Number(settings.fadeOutDuration) !== settings.fadeOutDuration) {
                throw new Error("simplePopup: Please enter a \"fadeOutDuration\" number >= 0");
            }
        }

        /**
         * determineType
         *
         * Check what type we have (and with that where we need to look for the data)
         *
         * @returns {boolean|string} The type of the data or false
         */
        function determineType() {
            // Type HTML
            if (settings.type === "html") {
                return "html";
            }

            // Type DATA
            if (settings.type === "data") {
                return "data";
            }

            // Type AUTO
            if (settings.type === "auto") {
                if(that.data("content")) {
                    return "data";
                }

                if ($(settings.htmlSelector).length) {
                    return "html";
                }

                throw new Error("simplePopup: could not determine type for \"type: auto\"");
            }

            return false;
        }

        /**
         * setData
         *
         * Set the data variable based on the type
         *
         * @returns {boolean|string} The HTML or text to disply in the popup or false
         */
        function setData() {
            // Type HTML
            if (determinedType === "html") {
                if (!settings.htmlSelector) {
                    throw new Error("simplePopup: for \"type: html\" the \"htmlSelector\" option must point to your popup html");
                }

                if (!$(settings.htmlSelector).length) {
                    throw new Error("simplePopup: the \"htmlSelector\": \"" + settings.htmlSelector + "\" was not found");
                }

                return $(settings.htmlSelector).html();
            }

            // Type DATA
            if (determinedType === "data") {
                data = that.data("content");

                if (!data) {
                    throw new Error("simplePopup: for \"type: data\" the \"data-content\" attribute can not be empty");
                }

                return data;
            }

            return false;
        }

        /**
         * startPopup
         *
         * Insert popup HTML, maybe bind escape key and maybe start the backdrop
         *
         * @returns {void}
         */
        function startPopup() {
            if (settings.backdrop) {
                startBackdrop();
            }

            if (settings.escapeKey) {
                bindEscape();
            }

            insertPopupHtml();
        }

        /**
         * insertPopupHtml
         *
         * Create the popup HTML and append it to the body. Maybe set the CSS.
         *
         * @returns {void}
         */
        function insertPopupHtml() {
            var content = $("<div/>", {
                "class": "simple-popup-content",
                "html": data
            });

            var html = $("<div/>", {
                "id": "simple-popup",
                "class": "hide-it"
            });

            if (settings.inlineCss) {
                content.css("width", settings.width);
                content.css("height", settings.height);
                content.css("background", settings.background);
            }

            bindClickPopup(html);

            // When we have a closeCross, create the element, bind click close and append it to
            // the content
            if (settings.closeCross) {
                var closeButton = $("<div/>", {
                    "class": "close"
                });

                bindClickClose(closeButton);
                content.append(closeButton);
            }

            html.append(content);

            // Call the beforeOpen callback
            settings.beforeOpen(html);

            $("body").append(html);

            // Use a timeout, else poor CSS is to slow to see the difference
            setTimeout(function() {
                var html = $("#simple-popup");

                // Set the fade in effect
                if (settings.inlineCss) {
                    html = setFadeTimingFunction(html, settings.fadeInTimingFunction);
                    html = setFadeDuration(html, settings.fadeInDuration);
                }

                html.removeClass("hide-it");

            });

            // Poll to check if the popup is faded in
            var intervalId = setInterval(function() {
                if ($("#simple-popup").css("opacity") === "1") {
                    clearInterval(intervalId);

                    // Call the afterOpen callback
                    settings.afterOpen(html);
                }
            }, 100);
        }

        /**
         * stopPopup
         *
         * Stop the popup and remove it from the DOM. Because it can fade out, use and interval
         * to check if opacity has reached 0. Maybe remove backdrop and maybe unbind the escape
         * key
         *
         * @returns {void}
         */
        function stopPopup() {
            // Call the beforeClose callback
            var html = $("#simple-popup");
            settings.beforeClose(html);

            // Set the fade out effect
            if (settings.inlineCss) {
                html = setFadeTimingFunction(html, settings.fadeOutTimingFunction);
                html = setFadeDuration(html, settings.fadeOutDuration);
            }

            $("#simple-popup").addClass("hide-it");

            // Poll to check if the popup is faded out
            var intervalId = setInterval(function() {
                if ($("#simple-popup").css("opacity") === "0") {
                    $("#simple-popup").remove();
                    clearInterval(intervalId);

                    // Call the afterClose callback
                    settings.afterClose();
                }
            }, 100);

            if (settings.backdrop) {
                stopBackdrop();
            }

            if (settings.escapeKey) {
                unbindEscape();
            }
        }

        /**
         * bindClickPopup
         *
         * When clicked outside the popup, close the popup. Use e.target to determine if
         * "simple-popup" was clicked or "simple-popup-content"
         *
         * @param {string} html The html of the popup
         * @returns {void}
         */
        function bindClickPopup(html) {
            $(html).on("click", function(e) {
                if ($(e.target).prop("id") === "simple-popup") {
                    stopPopup();
                }
            });
        }

        /**
         * bindClickClose
         *
         * When clicked on the close cross, close the popup
         *
         * @param {string} html The html of the popup
         * @returns {void}
         */
        function bindClickClose(html) {
            $(html).on("click", function(e) {
                stopPopup();
            });
        }

        /**
         * startBackdrop
         *
         * Insert the backdrop HTML
         *
         * @returns {void}
         */
        function startBackdrop() {
            insertBackdropHtml();
        }

        /**
         * stopBackdrop
         *
         * Stop the backdrop and remove it from the DOM. Because it can fade out, use and interval
         * to check if opacity has reached 0.
         *
         * @returns {void}
         */
        function stopBackdrop() {
            var backdrop = $("#simple-popup-backdrop");

            // Set the fade out effect
            if (settings.inlineCss) {
                backdrop = setFadeTimingFunction(backdrop, settings.fadeOutTimingFunction);
                backdrop = setFadeDuration(backdrop, settings.fadeOutDuration);
            }

            backdrop.addClass("hide-it");

            // Poll to check if the popup is faded out
            var intervalId = setInterval(function() {
                if ($("#simple-popup-backdrop").css("opacity") === "0") {
                    $("#simple-popup-backdrop").remove();
                    clearInterval(intervalId);
                }
            }, 100);
        }

        /**
         * insertBackdropHtml
         *
         * Create the backdrop HTML and append it to the body. Maybe set the CSS.
         *
         * @returns {void}
         */
        function insertBackdropHtml() {
            var content = $("<div/>", {
                "class": "simple-popup-backdrop-content"
            });

            var html = $("<div/>", {
                "id": "simple-popup-backdrop",
                "class": "hide-it"
            });

            if (settings.inlineCss) {
                content.css("opacity", settings.backdrop);
                content.css("background", settings.backdropBackground);
            }

            html.append(content);
            $("body").append(html);

            // Use a timeout, else poor CSS doesn"t see the difference
            setTimeout(function() {
                var backdrop = $("#simple-popup-backdrop");

                // Set the fade in effect
                if (settings.inlineCss) {
                    backdrop = setFadeTimingFunction(backdrop, settings.fadeInTimingFunction);
                    backdrop = setFadeDuration(backdrop, settings.fadeInDuration);
                }

                backdrop.removeClass("hide-it");
            });
        }

        /**
         * bindEscape
         *
         * Bind the escape key to stop popup
         *
         * @returns {void}
         */
        function bindEscape() {
            $(document).on("keyup.escapeKey", function(e) {
                if (e.keyCode === 27) {
                    stopPopup();
                }
            });
        }

        /**
         * unbindEscape
         *
         * Unbind the escape key
         *
         * @returns {void}
         */
        function unbindEscape() {
            $(document).unbind("keyup.escapeKey");
        }


        /**
         * setFadeTimingFunction
         *
         * @param {object} object - The object to set the timing function on
         * @param {string} timingFunction - The type of timing
         * @returns {object} The object with the time function set
         */
        function setFadeTimingFunction(object, timingFunction) {
            object.css("-webkit-transition-timing-function", timingFunction);
            object.css("-moz-transition-timing-function", timingFunction);
            object.css("-ms-transition-timing-function", timingFunction);
            object.css("-o-transition-timing-function", timingFunction);
            object.css("transition-timing-function", timingFunction);
            return object;
        }

        /**
         * setFadeDuration
         *
         * @param {object} object - The object to set the duration on
         * @param {float} duration - The duration of the fade
         * @returns {object} The object with the duration set
         */
        function setFadeDuration(object, duration) {
            object.css("-webkit-transition-duration", duration + "s");
            object.css("-moz-transition-duration", duration + "s");
            object.css("-ms-transition-duration", duration + "s");
            object.css("-o-transition-duration", duration + "s");
            object.css("transition-duration", duration + "s");
            return object;
        }

        return init();
    };
}(jQuery));
