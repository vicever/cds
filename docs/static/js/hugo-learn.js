// Get Parameters from some url
var getUrlParameter = function getUrlParameter(sPageURL) {
    var url = sPageURL.split('?');
    var obj = {};
    if (url.length == 2) {
        var sURLVariables = url[1].split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            obj[sParameterName[0]] = sParameterName[1];
        }
        return obj;
    } else {
        return undefined;
    }
};

jQuery(document).ready(function () {

    // Execute actions on images generated from Markdown pages
    var images = $("div#body-inner img").not(".inline");

    // Wrap image inside a featherlight (to get a full size view in a popup)
    images.wrap(function () {
        var image = $(this);
        if (!image.parent("a").length) {
            return "<a href='" + image[0].src + "' data-featherlight='image'></a>";
        }
    });

    // Change styles, depending on parameters set to the image
    images.each(function (index) {
        var image = $(this);
        var o = getUrlParameter(image[0].src);
        if (typeof o !== "undefined") {
            var h = o["height"];
            var w = o["width"];
            var c = o["classes"];
            image.css({
                width: function () {
                    if (typeof w !== "undefined") {
                        return w;
                    }
                },
                height: function () {
                    if (typeof h !== "undefined") {
                        return h;
                    }
                }
            });
            if (typeof c !== "undefined") {
                var classes = c.split(',');
                $.each(classes, function(i) {
                    image.addClass(classes[i]);
                });
            }
        }
    });

    // Add link button for every
    var text, clip = new Clipboard('.anchor');
    $("#body-inner h1,#body-inner h2,#body-inner h3,#body-inner h4,#body-inner h5, #body-inner h6").append(function (index, html) {
        var element = $(this);
        var url = document.location.origin + document.location.pathname;
        var link = url + "#" + element[0].id;
        return " <span class='anchor' data-clipboard-text='" + link + "'>" +
            "<i class='fa fa-link fa-lg'></i>" +
            "</span>";
    });

    $(".anchor").on('mouseleave', function (e) {
        $(this).attr('aria-label', null).removeClass('tooltipped tooltipped-s tooltipped-w');
    });

    clip.on('success', function (e) {
        e.clearSelection();
        $(e.trigger).attr('aria-label', 'Link copied to clipboard!').addClass('tooltipped tooltipped-s');
    });

});