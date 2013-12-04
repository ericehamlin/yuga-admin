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
         * @returns {yuga.Field}
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

        /**
         * TODO eliminate extraneous properties that we can't prepare for
         *
         * @returns {yuga.Field}
         */
        this.serialize = function() {
            var serializedField = {},
                ignoreProperties = ["tempData","$$hashKey"];

            for (var prop in this) {
                if ($.inArray(prop, ignoreProperties) === -1 &&
                    !(this[prop] instanceof Function)) {
                    serializedField[prop] = this[prop];
                }
            }
            return JSON.stringify(serializedField);
        };

        angular.extend(this, initProperties);
    };

    /**
     * TODO eliminate extraneous properties that we can't prepare for
     *
     * @param {String|Object} serializedType
     *
     * @returns {yuga.Field}
     */
    yuga.Field.deserialize = function(serializedField) {
        var field = new yuga.Field(),
            ignoreProperties = ["tempData"];

        ignoreProperties = [];

        return yuga.DomainObject.deserialize(field, serializedField, ignoreProperties);
    };

    yuga.Field.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));