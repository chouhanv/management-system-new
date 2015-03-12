(function (module) {
    
    var notificationMessage = (function() {
        "use strict";
        var elem,
            hideHandler,
            that = {};

        that.init = function(options) {
            elem = $(options.selector);
            console.log(options);
        };

        that.show = function(text) {
            clearTimeout(hideHandler);
            if(!elem)
                that.init({
                    "selector": ".bb-alert"
                });
            elem.find("span").html(text);
            elem.delay(200).fadeIn().delay(4000).fadeOut();
        };

        return that;
    });
 
    module.factory("notificationMessage",["$q", "$log", notificationMessage]);
 
}(angular.module("myApp")));