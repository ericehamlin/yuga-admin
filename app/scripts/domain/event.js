(function (yuga) {

    yuga.Event = function (initProperties) {

        this.description = "";

        this.aspects = [];

        /** indexed by aspect id */
        this.localAspects = {};

        this.tempData = {
            hidden: false,
            selected: false,
            selectedSecondary: false
        };

        /**
         *
         * @param aspect
         */
        this.containsAspect = function(aspect) {
            return jQuery.inArray(aspect, this.aspects) > -1;
        };

        /**
         *
         * @param event
         *
         * ALSO containsEvent // temporallyContainsEvent
         */
        this.intersectsEvent = function(event) {

        };

        /**
         *
         * @param aspect
         */
        this.addAspect = function(aspect) {
            if (!this.containsAspect(aspect)) {
                var localAspect;

                this.aspects[this.aspects.length] = aspect;
                if (aspect.localAspects[this.id] != undefined) {
                    localAspect = aspect.localAspects[this.id];
                }
                else {
                    localAspect = new yuga.LocalAspect({aspect: aspect, event: this});
                }
                this.localAspects[aspect.id] = localAspect;
            }
        };

        /**
         * todo remove local aspect in such a way that it can be undone
         *
         * @param aspect
         */
        this.removeAspect = function(aspect) {
            for (var i=0; i<this.aspects.length; i++) {
                if (this.aspects[i] === aspect) {
                    this.aspects.splice(i, 1);
                    delete this.localAspects[aspect.id];
                    return true;
                }
            }
            return false;
        };

        /**
         *
         */
        this.getAspects = function() {
            var aspects = [];
            for (var i=0; i<this.aspects.length; i++) {
                var aspect = this.aspects[i];
                aspects.push(aspect)
            }
            return aspects;
        };

        /**
         *
         * @param aspectId
         */
        this.getLocalAspectById = function(aspectId) {
            return this.localAspects[aspectId];
        };

        /**
         *
         * @param {String} date
         */
        this.getTimeUnits = function(date) {
            return Date.parse(date).getTime();
        };

        /**
         * @returns {Number} (usually milliseconds)
         */
        this.getStartTimeUnits = function() {
            return this.getTimeUnits(this.start);
        };


        /**
         * @returns {Number} (usually milliseconds)
         */
        this.getEndTimeUnits = function() {
            return this.getTimeUnits(this.end);
        };

        /**
         *
         * @param key
         * @param val
         */
        this.setProperty = function(key, val) {
            yuga.Event.prototype.setProperty.call(this, key, val);
        };

        /**
         *
         * @param timeline
         */
        this.attach = function(timeline) {
            this.timeline = timeline;
            for (var i=0; i<this.aspects.length; i++) {
                this.aspects[i].addEvent(this);
            }
        };

        /**
         *
         */
        this.detach = function() {
            this.timeline = null;
            for (var i=0; i<this.aspects.length; i++) {
                this.aspects[i].removeEvent(this);
            }
        };

        /**
         *
         */
        this.clone = function() {
            var ignoreProperties = ["tempData", "aspects", "localAspects"],
                newEvent = new yuga.Event();
            for (var prop in this) {
                if (this.hasOwnProperty(prop) &&
                    !(this[prop] instanceof Function) &&
                    $.inArray(prop, ignoreProperties) === -1) {
                    newEvent[prop] = this[prop];
                }
            }

            // TODO: id
            newEvent.id = 9898;
            return newEvent;
        };

        angular.extend(this, initProperties);
    };

    yuga.Event.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));