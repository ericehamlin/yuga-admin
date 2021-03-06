(function (yuga) {

    yuga.DomainObject = function () {

        var ignoreProperties = ["$$hashKey", "tempData", "timeline", "events", "types", "type", "aspects", "localAspects"];


        this.tempData = {
        };

        /**
         *
         * @param selected
         */
        this.select = function(selected) {
            if (selected !== false && selected !== true) {
                selected = true;
            }
            this.tempData.selected = selected;
        };

        /**
         *
         * @param selectedSecondary
         */
        this.selectSecondary = function(selectedSecondary) {
            if (selectedSecondary !== false) {
                selectedSecondary = true;
            }
            this.tempData.selectedSecondary = selectedSecondary;
        };

        /**
         *
         */
        this.isSelected = function() {
            return this.tempData.selected;
        };

        /**
         *
         */
        this.isSelectedSecondary = function() {
            return this.tempData.selectedSecondary;
        };

        /**
         *
         */
        this.show = function() {
            this.tempData.hidden = false;
        };

        /**
         *
         */
        this.hide = function() {
            this.tempData.hidden = true;
        };

        /**
         *
         */
        this.isHidden = function() {
            return this.tempData.hidden;
        }

        /**
         *
         * @param {String} key
         * @throws {TypeError}
         */
        this.getProperty = function(key) {
            if (!key) {
                return null;
            }

            var keys = key.split(".");
            if (keys.length === 1) {
                return this[key];
            }
            else {
                var propertyRef = this;
                for (var i=0; i<keys.length-1; i++) {
                    if (!angular.isDefined(propertyRef[keys[i]])) {
                        throw new TypeError("Cannot read property '" + keys[i+1] + "' of undefined property '" + keys.slice(0,i+1).join(".") + "' \n on " + this.class + ": " + JSON.stringify(this));
                    }
                    propertyRef = propertyRef[keys[i]];
                }
                return propertyRef[keys[keys.length-1]];

            }
        };

        /**
         *
         * @param {String}  key
         * @param {*}       val
         */
        this.setProperty = function(key, val) {
            var keys = key.split(".");
            if (keys.length === 1) {
                this[key] = val;
            }
            else {
                var propertyRef = this;
                for (var i=0; i<keys.length-1; i++) {
                    if (!angular.isDefined(propertyRef[keys[i]])) {
                        // create the intervening properties
                        propertyRef[keys[i]] = {};
                    }
                    propertyRef = propertyRef[keys[i]];
                }
                propertyRef[keys[keys.length-1]] = val;
            }
        };

        /**
         *
         * @param properties
         */
        this.addProperties = function(properties) {
            angular.extend(this, properties);
        };

        /**
         *
         */
        this.clone = function() {

        };


        /**
         *
         * @param ignoreAdditionalProperties
         */
        this.serialize = function(ignoreAdditionalProperties) {
            var ignore,
                serializedObject = {};

            if (!ignoreAdditionalProperties) {
                ignoreAdditionalProperties = [];
            }
            ignore = ignoreProperties.concat(ignoreAdditionalProperties);

            for (var prop in this) {
                if ($.inArray(prop, ignore) === -1 &&
                    !(this[prop] instanceof Function)) {
                    serializedObject[prop] = this[prop];
                }
            }
            return serializedObject;
        };
    }

    /**
     * @param {String|Object} json
     *
     * @returns {Object}
     */
    yuga.DomainObject.parseJSON = function(json) {
        if (typeof json === "string") {
            json = JSON.parse(json);
        }
        return json;
    };

    /**
     * TODO eliminate extraneous properties that we can't prepare for
     *
     * @param {String|Object} serializedObject
     * @param {Array} ignoreProperties
     *
     * @returns {yuga.DomainObject}
     */
    yuga.DomainObject.deserialize = function(serializedObject, ignoreProperties) {

        var newObject = {};

        serializedObject = yuga.DomainObject.parseJSON(serializedObject);

        for (var prop in serializedObject) {
            if ($.inArray(prop, ignoreProperties) === -1) {
                newObject[prop] = serializedObject[prop];
            }
        }

        return newObject;
    };

    var maxId = 6666;
    /**
     * TODO: I can't even count the number of things that are wrong with this
     */
    yuga.DomainObject.newId = function() {
        return maxId++;
    };


}(window.yuga = window.yuga || {}));