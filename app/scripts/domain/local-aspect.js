(function (yuga) {


    yuga.LocalAspect = function (initProperties) {

        this.aspect = null;
        this.event = null;

        /**
         *
         * @param fieldId
         */
        this.getFieldValue = function(fieldId) {
            return this[fieldId] !== undefined ? this[fieldId] : "";
        };

        angular.extend(this, initProperties);
    };

    yuga.LocalAspect.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));