(function (yuga) {

    yuga.Timeline = function (initProperties) {
        this.class = "yuga.Timeline";

        this.events = [];
        this.types = [];
        this.aspects = [];

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
                aspect.selectSecondary(aspect.is(type));
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
                type.selectSecondary(aspect.is(type));
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
            switch (element.class) {
                case "yuga.Event" :
                    this.selectEvent(element);
                    break;
                case "yuga.Type" :
                    this.selectType(element);
                    break;
                case "yuga.Aspect" :
                    this.selectAspect(element);
                    break;
            }
        };

        /**
         *
         * @param aspectId
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
         */
        this.getTypeById = function(typeId) {
            for (var i=0; i<this.types.length; i++) {
                if (typeId == this.types[i].id) {
                    return this.types[i];
                }
            }
            return null;
        };

        angular.extend(this, initProperties);
    };

    yuga.Timeline.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));