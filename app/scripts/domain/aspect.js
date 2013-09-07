(function (yuga) {

    yuga.Aspect = function (initProperties) {
        this.class = "yuga.Aspect";

        angular.extend(this, initProperties);
    };

    yuga.Aspect.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));