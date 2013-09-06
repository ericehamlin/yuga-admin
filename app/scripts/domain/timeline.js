(function (yuga) {

    yuga.Timeline = function (initProperties) {
        this.class = "yuga.Timeline";

        angular.extend(this, initProperties);
    };

    yuga.Timeline.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));