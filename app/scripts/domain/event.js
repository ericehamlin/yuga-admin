(function (yuga) {

    yuga.Event = function (initProperties) {
        this.class = "yuga.Event";

        angular.extend(this, initProperties);
    };

    yuga.Event.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));