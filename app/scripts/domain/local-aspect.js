(function (yuga) {


    yuga.LocalAspect = function (initProperties) {

        this.aspect = null;
        this.event = null;

        /**
         *
         * @param fieldId
         */
        this.getFieldValue = function(fieldId, returnGlobal, returnDefault) {
            if (this[fieldId] !== undefined) {
                return this[fieldId];
            }
            else if (returnGlobal) {
                return this.aspect.getFieldValue(fieldId, returnDefault);
            }
            else {
                return null;
            }
        };

        angular.extend(this, initProperties);
    };

    yuga.LocalAspect.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));