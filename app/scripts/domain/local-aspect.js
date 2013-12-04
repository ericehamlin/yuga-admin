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

        this.serialize = function() {
            var serializedLocalAspect = {},
                ignoreProperties = ["tempData", "event", "aspect"];

            for (var prop in this) {
                if ($.inArray(prop, ignoreProperties) === -1 &&
                    !(this[prop] instanceof Function)) {
                    serializedLocalAspect[prop] = this[prop];
                }
            }
            return JSON.stringify(serializedLocalAspect);
        };

        angular.extend(this, initProperties);
    };

    /**
     *
     * @param serializedLocalAspect
     *
     * @returns {yuga.LocalAspect}
     */
    yuga.LocalAspect.deserialize = function(serializedLocalAspect) {
        var localAspect = new yuga.LocalAspect(),
            ignoreProperties = [];

        return yuga.DomainObject.deserialize(localAspect, serializedLocalAspect, ignoreProperties);
    };

    yuga.LocalAspect.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));