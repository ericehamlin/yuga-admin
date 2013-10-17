(function (yuga) {

    yuga.Timeline = function (initProperties) {

        this.events = [];
        this.types = [];
        this.aspects = [];


        /**
         * @param callback
         */
        this.traverseElements = function(callback) {
            for (var i=0; i<this.events.length; i++) {
                var event = this.events[i];
                callback(event);
            }

            for (var i=0; i<this.types.length; i++) {
                var type = this.types[i];
                callback(type);
            }

            for (var i=0; i<this.aspects.length; i++) {
                var aspect = this.aspects[i];
                callback(aspect);
            }
        };

        /**
         *
         * @param event
         */
        this.selectEvent = function(event) {
            for (var i=0; i<this.events.length; i++) {
                this.events[i].selectSecondary(false);
                this.events[i].select(event === this.events[i]);
            }

            var type;
            for (var i=0; i<this.types.length; i++) {
                type = this.types[i];
                type.select(false);
                type.selectSecondary(false);
            }

            var aspect;
            for (var i=0; i<this.aspects.length; i++) {
                aspect = this.aspects[i];
                aspect.select(false);
                aspect.selectSecondary(event.containsAspect(aspect));
            }
        };

        /**
         *
         * @param type
         */
        this.selectType = function(type) {

            var event;
            for (var i=0; i<this.events.length; i++) {
                event = this.events[i];
                event.select(false);
                event.selectSecondary(false);
            }

            for (var i=0; i<this.types.length; i++) {
                this.types[i].selectSecondary(false);
                this.types[i].select(type === this.types[i]);
            }

            var aspect;
            for (var i=0; i<this.aspects.length; i++) {
                aspect = this.aspects[i];
                aspect.select(false);
                aspect.selectSecondary(aspect.isType(type));
            }
        };

        /**
         *
         * @param aspect
         */
        this.selectAspect = function(aspect) {

            var event;
            for (var i=0; i<this.events.length; i++) {
                event = this.events[i];
                event.select(false);
                event.selectSecondary(event.containsAspect(aspect));
            }

            var type;
            for (var i=0; i<this.types.length; i++) {
                type = this.types[i];
                type.select(false);
                type.selectSecondary(aspect.isType(type));
            }

            for (var i=0; i<this.aspects.length; i++) {
                this.aspects[i].selectSecondary(false);
                this.aspects[i].select(aspect === this.aspects[i]);
            }
        };

        /**
         *
         * @param element
         */
        this.selectElement = function(element) {
            if (element instanceof yuga.Event) {
                this.selectEvent(element);
            } else if (element instanceof yuga.Type) {
                this.selectType(element);
            } else if (element instanceof yuga.Aspect) {
                this.selectAspect(element);
            }
        };

        /**
         *
         * @param aspectId
         *
         * @returns {yuga.Aspect}
         */
        this.getAspectById = function(aspectId) {
            for (var i=0; i<this.aspects.length; i++) {
                if (aspectId == this.aspects[i].id) {
                    return this.aspects[i];
                }
            }
            return null;
        };

        /**
         *
         * @param eventId
         *
         * @returns {yuga.Event}
         */
        this.getEventById = function(eventId) {
            for (var i=0; i<this.events.length; i++) {
                if (eventId == this.events[i].id) {
                    return this.events[i];
                }
            }
            return null;
        };

        /**
         *
         * @param typeId
         *
         * @returns {yuga.Type}
         */
        this.getTypeById = function(typeId) {
            for (var i=0; i<this.types.length; i++) {
                if (typeId == this.types[i].id) {
                    return this.types[i];
                }
            }
            return null;
        };

        /**
         *
         * @param id
         *
         * @returns {yuga.Aspect|yuga.Event|yuga.Type}
         */
        this.getElementById = function(id) {
            var element = this.getEventById(id);
            if (!element) {
                element = this.getTypeById(id);
                if (!element) {
                    element = this.getAspectById(id);
                }
            }

            return element;
        };

        angular.extend(this, initProperties);
    };

    yuga.Timeline.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));