(function (yuga) {

    yuga.Event = function (initProperties) {
        this.class = "yuga.Event";
        this.aspects = [];

        this.tempData = {
            selected: false,
            selectedSecondary: false
        };

        angular.extend(this, initProperties);
    };

    yuga.Event.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));