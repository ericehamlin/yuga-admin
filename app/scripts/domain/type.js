(function (yuga) {

    yuga.Type = function (initProperties) {
        this.class = "yuga.Type";

        angular.extend(this, initProperties);
    };

    yuga.Type.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));