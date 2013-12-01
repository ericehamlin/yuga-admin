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

        /**
         *
         */
        this.clone = function() {
            var ignoreProperties = [],
                newField = new yuga.Field();
            for (var prop in this) {
                if (this.hasOwnProperty(prop) &&
                    !(this[prop] instanceof Function) &&
                    $.inArray(prop, ignoreProperties) === -1) {
                    newField[prop] = this[prop];
                }
            }
            return newField;
        };

        angular.extend(this, initProperties);
    };

    yuga.Field.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));