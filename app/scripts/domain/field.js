(function (yuga) {


    yuga.Field = function (initProperties) {

        angular.extend(this, initProperties);
    };

    yuga.Field.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));