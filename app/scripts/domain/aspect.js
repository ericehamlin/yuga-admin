(function (yuga) {

    yuga.Aspect = function (initProperties) {
        this.class = "yuga.Aspect";

        this.tempData = {
            selected: false,
            selectedSecondary: false
        };

        angular.extend(this, initProperties);
    };

    yuga.Aspect.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));