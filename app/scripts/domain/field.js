(function (yuga) {


    yuga.Field = function (initProperties) {

        /**
         *
         * @param key
         * @param val
         */
        this.setProperty = function(key, val) {
            yuga.Field.prototype.setProperty.call(this, key, val);
        };

        angular.extend(this, initProperties);
    };

    yuga.Field.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));