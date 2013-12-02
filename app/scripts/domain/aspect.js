(function (yuga) {

    yuga.Aspect = function (initProperties) {

        this.name = "";
        this.color = "000000";
        this.description = "";

        this.events = [];

        /** indexed by event id */
        this.localAspects = {};

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
                var localAspect;
                this.events[this.events.length] = event;
                if (event.localAspects[this.id] != undefined) {
                    localAspect = event.localAspects[this.id];
                }
                else {
                    localAspect = new yuga.LocalAspect({aspect: this, event: event});
                }
                this.localAspects[event.id] = localAspect;
            }
        };

        /**
         * @param event
         */
        this.removeEvent = function(event) {
            for (var i=0; i<this.events.length; i++) {
                if (this.events[i] === event) {
                    this.events.splice(i, 1);
                    delete this.localAspects[event.id];
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
         * @param timeline
         */
        this.attach = function(timeline) {
            this.timeline = timeline;
            for (var i=0; i<this.events.length; i++) {
                this.events[i].addAspect(this);
            }
        };

        /**
         * TODO remove localAspect
         */
        this.detach = function() {
            this.timeline = null;
            for (var i=0; i<this.events.length; i++) {
                this.events[i].removeAspect(this);
            }
        };

        /**
         *
         * @return {yuga.Aspect}
         */
        this.clone = function() {
            var ignoreProperties = ["tempData", "events", "localAspects"],
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

            // TODO: id
            newAspect.id = 0980980;

            return newAspect;
        };

        /**
         * TODO eliminate extraneous properties that we can't prepare for
         *
         * @returns {String}
         */
        this.serialize = function() {
            var serializedAspect = {},
                ignoreProperties = ["timeline", "type", "tempData", "events", "localAspects"];

            for (var prop in this) {
                if ($.inArray(prop, ignoreProperties) === -1 &&
                    !(this[prop] instanceof Function)) {
                    serializedAspect[prop] = this[prop];
                }
            }
            return JSON.stringify(serializedAspect);
        };

        angular.extend(this, initProperties);

    };

    /**
     * TODO eliminate extraneous properties that we can't prepare for
     *
     * @param {String|Object} serializedAspect
     *
     * @returns {yuga.Aspect}
     */
    yuga.Aspect.deserialize = function(serializedAspect) {
        var aspect = new yuga.Aspect(),
            ignoreProperties = ["tempData", "events", "localAspects"];

        aspect.tempData.events = yuga.DomainObject.parseJSON(serializedAspect).events;
        return yuga.DomainObject.deserialize(aspect, serializedAspect, ignoreProperties);
    };

    yuga.Aspect.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));