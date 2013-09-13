(function (yuga) {

    yuga.DomainObject = function () {

        this.tempData = {};

        this.select = function(selected) {
            if (selected !== false && selected !== true) {
                selected = true;
            }
            this.tempData.selected = selected;
        };

        this.selectSecondary = function(selectedSecondary) {
            if (selectedSecondary !== false) {
                selectedSecondary = true;
            }
            this.tempData.selectedSecondary = selectedSecondary;
        };

        this.isSelected = function() {
            return this.tempData.selected;
        };

        this.isSelectedSecondary = function() {
            return this.tempData.selectedSecondary;
        };

        /**
         *
         * @param {String} key
         * @throws {TypeError}
         */
        this.getProperty = function(key) {
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

        this.serialize = function() {
            return JSON.stringify(this);
        };
    }


}(window.yuga = window.yuga || {}));