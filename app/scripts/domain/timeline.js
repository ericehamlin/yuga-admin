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
                aspect.selectSecondary(event.contains(aspect));
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
                event.selectSecondary(event.contains(aspect));
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

        angular.extend(this, initProperties);
    };

    yuga.Timeline.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));