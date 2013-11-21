(function (yuga) {

    yuga.Aspect = function (initProperties) {

        this.name = "";
        this.color = "000000";
        this.description = "";

        //todo -- probably eliminate this. Shouldn't have to update both arrays
        // on the other hand, shouldn't have to scrounge through two levels of arrays to get this result
        this.events = [];

        this.tempData = {
            hidden: false,
            selected: false,
            selectedSecondary: false
        };

        /**
         *
         * @param event
         */
        this.inEvent = function(event) {
            if (!(event instanceof yuga.Event)) {
                throw new TypeError("argument to yuga.Aspect.inEvent() must be a yuga.Event");
            }
            return jQuery.inArray(event, this.events) > -1;
        };

        /**
         *
         * @param type
         */
        this.isType = function(type) {
            if (!(type instanceof yuga.Type)) {
                throw new TypeError("argument to yuga.Aspect.isType() must be a yuga.Type");
            }
            return this.type === type;
        };

        /**
         * todo should throw an error when no type set?
         */
        this.getType = function() {
            return this.type;
        };

        /**
         *
         * @param type
         */
        this.setType = function(type) {
            this.type = type;
        };

        /**
         *
         * @param event
         */
        this.addEvent = function(event) {
            if (!this.inEvent(event)) {
                this.events[this.events.length] = event;
            }
        };

        /**
         * todo -- should reciprocate on event side?
         * @param event
         */
        this.removeEvent = function(event) {
            for (var i=0; i<this.events.length; i++) {
                if (this.events[i] === event) {
                    this.events.splice(i, 1);
                    return true;
                }
            }
            return false;
        };

        /**
         *
         */
        this.getEvents = function() {
            return this.events;
        };

        /**
         *
         * @param key
         * @param val
         */
        this.setProperty = function(key, val) {
            yuga.Aspect.prototype.setProperty.call(this, key, val);
        };

        /**
         *
         * @param fieldId
         * @param returnDefault
         */
        this.getFieldValue = function(fieldId, returnDefault) {
            if (this[fieldId] !== undefined) {
                return this[fieldId]
            }
            else if (returnDefault) {
                return field.defaultValue; // todo: say what? this doesn't work.
            }
            else {
                return null;
            }
        };

        /**
         *
         */
        this.clone = function() {
            var ignoreProperties = ["tempData", "events"],
                newAspect = new yuga.Aspect();
            for (var prop in this) {
                if (
                    this.hasOwnProperty(prop) &&
                    !(this[prop] instanceof Function) &&
                    $.inArray(prop, ignoreProperties) === -1
                    ) {
                    newAspect[prop] = this[prop];
                }
            }
            return newAspect;
        };

        angular.extend(this, initProperties);

    };

    yuga.Aspect.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));