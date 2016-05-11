/* ---------------------------------------------------
General site scripts.
Dependencies: jquery, dataset.min.js
--------------------------------------------------- */

// ============================
// Refiners
// ============================

$(function () {

    /* REFINER SHOW MORE/LESS SUPPORT */
    /* TODO: Fix issue when selected item is collapsed. */
    $('.refiner-list ul[data-show-more="True"], .worksection ul[data-show-more="True"]').each(function () {
        var max = this.dataset.numberOfFiltersToDisplay;
        var items = $(this).find('li');
        var active = $(this).find('li.active');
        if (items.length > max && (active.length == 0 || items.index(active) < max)) {
            $(this).find('li:gt(' + (max - 1) + ')').hide().end().append('<li><a href="#" class="showmore"><span class="more">' + this.dataset.moreLinkText + '</span></a></li>');
            $(this).find('.showmore').click(function (e) {
                e.preventDefault();
                $(this).parent('li').siblings(':gt(' + (max - 1) + ')').each(function (i, e) { $(this).delay(i).slideToggle(200) });
                if ($(this).find('.more').length) {
                    $(this).html('<span class="less">' + $(this).closest('ul').get(0).dataset.lessLinkText + '</span>');
                } else {
                    $(this).html('<span class="more">' + $(this).closest('ul').get(0).dataset.moreLinkText + '</span>');
                };
            });
        };
    });

    /* REFINER STYLES */

    //    /* Style Parliament refiner on two lines; insert line break before date range. */
    //    $('.refiner-display-parliament .refinement .name').each(function (i, e) {
    //        $(e).html(function (i, html) {
    //            return html.replace(/([^\s\(]*)(\s)(\([^\)]*\))/, "$1<br/>$3");            
    //            //return html.replace(/([^\d\s]*)(\s)(\s\d[^\)]*\))/, "$1<br/>$3");
    //        });
    //    });

    /* Inject a 'parliament' class for each parliament refinement; facilitate ordinal */
    $('.refiner-display-parliament .refinement').addClass("parliament");

    /*Make the Parliament Number in the Refiners superscript enabled*/
    $('.parliament .name').each(function (i, e) {
        $(e).html(function (i, html) {
            return html.replace(/(\d{1,2})(st|nd|rd|th|e|er|re)/, "$1<span class='superscript'>$2</span>");
        });
    });

    /*Add the List seperator Parameter based on the Client Value (French OS related)*/
    //PT #34616
    var array = ['a', 'b'];
    var list_seperator = array.toLocaleString().substring(1, 2);        
    $('a.csv-export-link').each(function (i, e) {
      $(e).attr("href", function(i,origValue){
          return origValue.replace("listSeperator=%2C", "listSeperator=" + list_seperator); 
       });
      });

      /*replace the texctual em dash by the html code*/
      $('.constituency').each(function (i, e) {
          $(e).html(function (i, html) {
              return html.replace(/[\u2014]/g, "&thinsp;&mdash;&thinsp;");                 
          });
      });    


});


(function () {

    $(document).ready(function () {

        // -------------------------------------
        // General Accordions
        // -------------------------------------

        $(document).find(".auto-expand").each(function (index) {
            // expand all by getting all the accordion menu items that are collapsed
            // (the "in" class indicates that it's expanded)
            $(this).find(".panel-collapse.collapse:not(.in)").each(function (index) {
                $(this).collapse("show");
            });
        });


        $(".accordion a.expand-all").click(function (e) {
            // expand all by getting all the accordion menu items that are collapsed
            // (the "in" class indicates that it's expanded)
            $(this).parent().parent().find(".panel-collapse.collapse:not(.in)").each(function (index) {
                $(this).collapse("show");
            });
        });

        $(".accordion a.collapse-all").click(function (e) {
            // collapse all by getting all the accordion menu items that are expanded
            $(this).parent().parent().find(".panel-collapse.in").each(function (index) {
                $(this).collapse("hide");
            });
        });

        $(".accordion .panel-collapse").on("shown.bs.collapse", function () {
            $(this).prev().find(".accordion-bar").removeClass("collapsed").addClass("expanded");
            $(this).parent().find(".panel-heading").addClass("expanded-header-bg");
        });

        $(".accordion .panel-collapse").on("hidden.bs.collapse", function () {
            $(this).prev().find(".accordion-bar").removeClass("expanded").addClass("collapsed");
            $(this).parent().find(".panel-heading").removeClass("expanded-header-bg");
        });

        // -------------------------------------
        // Accordion top level menu (mobile)
        // -------------------------------------

        $('.accordion-menu-mobile').find('.accordion-toggle').click(function () {

            //Expand or collapse this panel
            $(this).next().slideToggle('fast', function () {
                // change + or - icons
                if ($(this).is(':hidden')) {
                    $(this).prev().find(".expand-collapse-icon").removeClass("expanded");
                }
                else {
                    $(this).prev().find(".expand-collapse-icon").addClass("expanded");
                }
            });

            //Hide the other panels
            $(".accordion-menu-mobile .accordion-content").not($(this).next()).slideUp('fast', function () {
                // change + or - icons
                if ($(this).is(':hidden')) {
                    $(this).prev().find(".expand-collapse-icon").removeClass("expanded");
                }
                else {
                    $(this).prev().find(".expand-collapse-icon").addClass("expanded");
                }
            });

        });

        // handle the sub menu items accordion in the mobile menu
        $('.accordion-menu-mobile').find('.sub-menu-item-header').click(function () {
            $(this).next().slideToggle('fast', function () {
                // change + or - icons
                if ($(this).is(':hidden')) {
                    $(this).prev().find(".expand-collapse-icon").removeClass("expanded");
                }
                else {
                    $(this).prev().find(".expand-collapse-icon").addClass("expanded");
                }
            });
        });

        // -------------------------------------
        // Session Selector - Timeline - Session Selector (Mobile and Desktop)
        // -------------------------------------

        //Widths considered for the 2 Navigation buttons of the timeline (Left [<] & [>] Right) 
        var buttonWidth1 = 35;   //35px each 
        var buttonWidth2 = 2 * buttonWidth1; //considers both buttons

        //Get Session Container's width varies per device
        var sessionContainer = $('div.session-archives-header').outerWidth() - buttonWidth2;  //cheat: uses containers header width while container remains hidden

        //Get the hidden Session container's width
        var hiddenContainer = $('div.sessions-hidden-container').outerWidth();  //Ex: hiddenContainer = 2520

        //Get the furthest scolling position to the right (Normally would use scrollLeft(maxRight))
        var maxRight = hiddenContainer - sessionContainer;   //Ex: maxRight = 2520 -960 = 1560

        //To keep track of the scrolling Position of the Sessions
        var scrollPos = maxRight;

        //to keep track of the current active session's position 
        var activeSessionPos;

        //Animation scrollSpeed will change determinant on the sessionContainer's width
        var scrollSpeed = 300;

        //The amount of pixels to be scrolled when clicking the right or left button
        var scrollPixels = (sessionContainer / 2);

        //The width of the session-item's text
        var sessionItemTextWidth = $('div.session-item-8.grey > .item').outerWidth();

        //To keep track of the archive bar being open or not (When hidden at first)
        var archiveBarVisible = false;

        //Get the url parameters if needed later 
        var urlParams = getQueryParams(document.location.search);

        //Get the language of the page (French or Default:English)
        if (document.location.href.match("/fr/")) {
            var pageLanguage = "fr";
        } else {
            var pageLanguage = "en";
        };


        //disable right button to start with
        $("#right-button").prop("disabled", true);
        $("#left-button").prop("disabled", false);

        //if the left button is clicked 
        $("#left-button").click(function () {
            if (!$(".years-visible-container").is(':animated') && !$(".sessions-visible-container").is(':animated')) {

                if (!($("#left-button").prop("disabled"))) {

                    if (scrollPos > 0) {

                        scrollPos = scrollPos - scrollPixels;

                        if (sessionContainer > 500) {
                            scrollSpeed = 300;
                        } else {
                            scrollSpeed = 150;
                        }

                        $(".years-visible-container").animate({ scrollLeft: scrollPos }, scrollSpeed, "linear");
                        $(".sessions-visible-container").animate({ scrollLeft: scrollPos }, scrollSpeed, "linear");

                    }

                    if (scrollPos <= 0) {
                        $("#left-button").prop("disabled", true);
                    }

                    if (scrollPos < maxRight) {
                        $("#right-button").prop("disabled", false);
                    }
                    if (scrollPos == maxRight) {
                        $("#right-button").prop("disabled", true);
                        $("#left-button").prop("disabled", false);
                    }
                }
            }

        });

        //if the right button is clicked
        $("#right-button").click(function () {

            if (!$(".years-visible-container").is(':animated') && !$(".sessions-visible-container").is(':animated')) {

                if (!($("#right-button").prop("disabled"))) {

                    if (scrollPos < maxRight) {

                        scrollPos = scrollPos + scrollPixels;

                        if (sessionContainer > 500) {
                            scrollSpeed = 300;
                        } else {
                            scrollSpeed = 150;
                        }

                        $(".years-visible-container").animate({ scrollLeft: scrollPos }, scrollSpeed, "linear");
                        $(".sessions-visible-container").animate({ scrollLeft: scrollPos }, scrollSpeed, "linear");
                    }
                    if (scrollPos >= maxRight) {
                        $("#right-button").prop("disabled", true);
                    }
                    if (scrollPos >= 0) {
                        $("#left-button").prop("disabled", false);
                    }
                }
            }
        });


        //if a Session is clicked on, displays pop-up information

        $('div.session-item-8.grey').click(function () {

            //for pop-up
            var $sessionitem = $(this).parent(),
                   $sessioninfo = $('> .session-info-container', $sessionitem),
                   $sessioninfoWidth = $sessioninfo.outerWidth();
            $arrowUp = $('> .arrow-up', $sessioninfo),
            $arrowUp2 = $('> .arrow-up-2', $sessioninfo),
            $sessionContainer = $('div.session-archives-centered-container').outerWidth();

            var minTextVisiblility = 44;  //min session visibility;
            var centerOfText = sessionItemTextWidth / 2.5; //.5 for padding

            //For sessions not in view, $sessionClicked stores element for later use
            var $sessionClicked = $(this);

            //Session Clicked Style Change
            $(this).removeClass("grey");
            $(this).addClass("glowing-border");

            //Grab the session-item's position relative to its positioned parent
            var sessionItemPos = 0

            //Difference between a hidden session item and the scrolling it needs to be visible  (Used later)
            var scrollDifference = 0


            $('.years-visible-container').filter(':animated').promise().done(function () {

                //Gab the session-item's position relative to its positioned parent
                sessionItemPos = $sessionitem.position();


                if (sessionItemPos.left + minTextVisiblility < minTextVisiblility) {
                    //if Session-item is surpassing the container (left-side)
                    scrollDifference = minTextVisiblility - sessionItemPos.left;
                    for (i = 0; i < scrollDifference ; i = i + scrollPixels) {
                        $(".sessions-visible-container").filter(':animated').promise().done(function () {
                            $("#left-button").trigger("click");
                        });
                    }
                    $(".sessions-visible-container").filter(':animated').promise().done(function () {
                        $sessionClicked.trigger("click");
                    });

                } else if (sessionItemPos.left > $sessionContainer - minTextVisiblility) {
                    //if Session-item is surpassing the container (right-side)
                    $("#right-button").trigger("click");
                    $(".sessions-visible-container").filter(':animated').promise().done(function () {
                        $sessionClicked.trigger("click");
                    });

                } else if ($sessioninfoWidth > $sessionContainer) {
                    //if Session-info pop-up is larger then the container 
                    $sessioninfo.css({
                        top: sessionItemPos.top + 46,
                        left: -buttonWidth1 + ((($sessionContainer + buttonWidth2) - $sessioninfoWidth) / 2)
                    });
                    $arrowUp.css({
                        marginLeft: (sessionItemPos.left - parseInt($sessioninfo.css('left'), 10)) + centerOfText
                    });
                    $arrowUp2.css({
                        marginLeft: (sessionItemPos.left - parseInt($sessioninfo.css('left'), 10)) + centerOfText - 1
                    });
                    $sessioninfo.fadeIn(300, function () { $(this).focus(); });
                } else if (((sessionItemPos.left + ($sessionitem.outerWidth() / 2)) + ($sessioninfoWidth / 2)) > $sessionContainer) {
                    //if Session-info pop-up is surpassing the container (right-side)
                    $sessioninfo.css({
                        top: sessionItemPos.top + 46,
                        left: sessionItemPos.left - (sessionItemPos.left + $sessioninfoWidth - $sessionContainer)
                    });
                    $arrowUp.css({
                        marginLeft: (sessionItemPos.left - parseInt($sessioninfo.css('left'), 10)) + centerOfText
                    });
                    $arrowUp2.css({
                        marginLeft: (sessionItemPos.left - parseInt($sessioninfo.css('left'), 10)) + centerOfText - 1
                    });
                    $sessioninfo.fadeIn(300, function () { $(this).focus(); });
                } else if (((sessionItemPos.left + Math.round($sessionitem.outerWidth() * 0.50)) - ($sessioninfoWidth / 2)) < 0) {
                    //if Session-info pop-up is surpassing the container (left-side)
                    $sessioninfo.css({
                        top: sessionItemPos.top + 46,
                        left: 0
                    });
                    $arrowUp.css({
                        marginLeft: (sessionItemPos.left - parseInt($sessioninfo.css('left'), 10)) + centerOfText
                    });
                    $arrowUp2.css({
                        marginLeft: (sessionItemPos.left - parseInt($sessioninfo.css('left'), 10)) + centerOfText - 1
                    });
                    $sessioninfo.fadeIn(300, function () { $(this).focus(); });
                } else {
                    // place the pop-up in the correct position relevant to the session item (Either at 1/2 its width or 0.3)
                    if ($sessionitem.outerWidth() > $sessioninfoWidth && (((sessionItemPos.left + ($sessionitem.outerWidth() * 0.45)) - ($sessioninfoWidth / 2)) > 0)) {
                        $sessioninfo.css({
                            top: sessionItemPos.top + 46,
                            left: ((sessionItemPos.left + ($sessionitem.outerWidth() * 0.3)) - ($sessioninfoWidth / 2))
                        });
                    } else {
                        $sessioninfo.css({
                            top: sessionItemPos.top + 46,
                            left: ((sessionItemPos.left + ($sessionitem.outerWidth() / 2)) - ($sessioninfoWidth / 2))
                        });

                    }
                    $arrowUp.css({
                        marginLeft: (sessionItemPos.left - parseInt($sessioninfo.css('left'), 10)) + centerOfText
                    });
                    $arrowUp2.css({
                        marginLeft: (sessionItemPos.left - parseInt($sessioninfo.css('left'), 10)) + centerOfText - 1
                    });
                    $sessioninfo.fadeIn(300, function () { $(this).focus(); });
                }

            });
        });

        //Clicking anywhere else but on the session-info container will make the pop-up info fade away and the session-Item change styles
        $('.session-item-8-outer.white > .session-info-container').on('blur', function () {
            //hide pop-up
            $(this).fadeOut(300); //If too fast, Ex: fadeOut(100) Pop-up links will not respond on clicks

            //Remove the session-item's clicked style
            $(this).parent().children().removeClass("glowing-border");
            $(this).parent().children().addClass("grey");

        });

        //When the archive bar is fully loaded and we are not in the latest session
        $("div.session-archives-container").ready(function () {
            activeSessionPos = $("div.session-item-8.active").position().left;

            //If we are in current session $current session button should exist or if historical=true is in the URL parameters
            if ($("#current-session").length) {

                //Animate session into view
                makeSessionVisible();

            } else if (urlParams.historical) {

                //Animate session into view
                makeSessionVisible();

                //Change the text in #change-session button based on the page's language
                if (pageLanguage == "fr") {
                    $("#change-session").children().text("Session courante");
                } else {
                    $("#change-session").children().text("Current Session");
                }

                //Assign True to the variable which keeps track of the Session Selectors visibility
                archiveBarVisible = true;
            }

        });


        //If the archive bar is hidden and the button is pressed and we are in the latest session
        $("#change-session").click(function () {
            if (!archiveBarVisible) {

                // Notify interested containers that the Sessions Selector is open
                //$('.session-selector-notify').removeClass('session-selector-closed');
                //$('.session-selector-notify').addClass('session-selector-opened');

                //Animate session into view
                scrollPos = maxRight;
                $(".sessions-visible-container").animate({ scrollLeft: scrollPos }, 1, "linear");
                $(".years-visible-container").animate({ scrollLeft: scrollPos }, 1, "linear");

                //enable/disable buttons
                $("#right-button").prop("disabled", true);
                $("#left-button").prop("disabled", false);

                //make session selector visible
                $("div.session-archives-container").css("height", "100%");
                $("div.session-archives-container").hide();
                $("div.session-archives-container").css("visibility", "visible");
                $("div.session-archives-container").css("position", "relative");

                //animate the whole session select into view as it slides down
                $("div.session-archives-container").slideDown();

                //Change the text in #change-session button based on the page's language
                if (pageLanguage == "fr") {
                    $(this).children().text("Session courante");
                } else {
                    $(this).children().text("Current Session");
                }

                //Assign True to the variable which keeps track of the Session Selectors visibility
                archiveBarVisible = true;
            } else {

                // Notify interested containers that the Sessions Selector is open
                //$('.session-selector-notify').removeClass('session-selector-opened');
                //$('.session-selector-notify').addClass('session-selector-closed');

                //animate session selector out of view
                $("div.session-archives-container").slideUp();

                //Assign false to the variable which keeps track of the Session Selectors visibility
                archiveBarVisible = false;

                //Change the text in #change-session button based on the page's language
                if (pageLanguage == "fr") {
                    $(this).children().text("Choisir une session différente");
                } else {
                    $(this).children().text("Select a different session");
                }

            }
        });


        // in order to make responsive

        $(window).resize(function () {

            //Get rid of an open pop-up info
            $('.session-item-8-outer.white > .session-info-container').blur();

            //Wait until the window has completly been resized
            waitForFinalEvent(function () {
                $("div.session-item-8.active").ready(function () {

                    //Get Session Container's width varies per device
                    sessionContainer = $('div.session-archives-header').outerWidth() - buttonWidth2;  //cheat: uses containers header width while container remains hidden

                    //Get the hidden Session container's width
                    hiddenContainer = $('div.sessions-hidden-container').outerWidth();  //Ex: hiddenContainer = 2520

                    //Get the furthest scolling position to the right (Normally would use scrollLeft(maxRight))
                    maxRight = hiddenContainer - sessionContainer;   //Ex: maxRight = 2520 -960 = 1560

                    //The amount of pixels to be scrolled when clicking the right or left button
                    scrollPixels = (sessionContainer / 2);

                    //By default we will go to the maximum scrolling point to the Left; This could be altered by makeSessionVisible()
                    scrollPos = maxRight;

                    if (!$("#current-session").length) {
                        $(".sessions-visible-container").animate({ scrollLeft: scrollPos }, 1, "linear");
                        $(".years-visible-container").animate({ scrollLeft: scrollPos }, 1, "linear");
                        $("#right-button").prop("disabled", true);
                        $("#left-button").prop("disabled", false);
                    } else {
                        makeSessionVisible();
                    }

                });
            }, 500, "some unique string");
        });


        //To delay setting the new scrolling position and container width until window resizing is done 
        var waitForFinalEvent = (function () {
            var timers = {};
            return function (callback, ms, uniqueId) {
                if (!uniqueId) {
                    uniqueId = "Don't call this twice without a uniqueId";
                }
                if (timers[uniqueId]) {
                    clearTimeout(timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };
        })();

        //Called when not in latest-session and when screen resized
        function makeSessionVisible() {

            //animate session into view
            while (scrollPos > activeSessionPos && scrollPos > 0) {
                scrollPos -= scrollPixels
            }
            $(".sessions-visible-container").animate({ scrollLeft: scrollPos }, 1, "linear");
            $(".years-visible-container").animate({ scrollLeft: scrollPos }, 1, "linear");

            //enable/disable buttons
            if (scrollPos == maxRight) {
                $("#right-button").prop("disabled", true);
                $("#left-button").prop("disabled", false);
            } else if (scrollPos <= 0) {
                $("#right-button").prop("disabled", false);
                $("#left-button").prop("disabled", true);
            } else {
                $("#right-button").prop("disabled", false);
                $("#left-button").prop("disabled", false);
            }

            //make session selector visible 
            $("div.session-archives-container").css("height", "100%");
            $("div.session-archives-container").css("visibility", "visible");
            $("div.session-archives-container").css("position", "relative");

            //animate the whole session select into view
            $('.years-visible-container').filter(':animated').promise().done(function () {
                $("div.session-archives-container").show();
            });
        }


        //Get url parameters
        function getQueryParams(qs) {
            qs = qs.split("+").join(" ");

            var params = {}, tokens,
                re = /[?&]?([^=]+)=([^&]*)/g;

            while (tokens = re.exec(qs)) {
                params[decodeURIComponent(tokens[1])]
                    = decodeURIComponent(tokens[2]);
            }

            return params;
        }
    });

})();
