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
         * @returns {Number} latest date on the timeline converted to atomic time units (usually milliseconds)
         */
        this.getLatestEventTime = function() {
            var latest = null;
            for (var i=0; i<this.events.length; i++) {
                var event = this.events[i];

                // TODO: what about events that only have a start
                if (event.end && (!latest || event.getEndTimeUnits() > latest)) {
                    latest = event.getEndTimeUnits();
                }
            }

            return latest;
        };

        /**
         * @returns {Number} earliest date on the timeline converted to atomic time units (usually milliseconds)
         */
        this.getEarliestEventTime = function() {
            var earliest = null;
            for (var i=0; i<this.events.length; i++) {
                var event = this.events[i];

                if (event.start && (!earliest || event.getStartTimeUnits() < earliest)) {
                    earliest = event.getStartTimeUnits();
                }
            }

            return earliest;
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
            }
            else if (element instanceof yuga.Type) {
                this.selectType(element);
            }
            else if (element instanceof yuga.Aspect) {
                this.selectAspect(element);
            }
            else {
                this.traverseElements(function(element) {
                    element.select(false);
                    element.selectSecondary(false);
                });
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

        /**
         *
         * @param event
         */
        this.attachEvent = function(event) {
            event.attach(this);
            this.events.push(event);
        };

        /**
         *
         * @param event
         */
        this.detachEvent = function(event) {
            for (var i=0; i<this.events.length; i++) {
                if (this.events[i] === event) {
                    this.events.splice(i, 1);
                    event.detach();
                    return true;
                }
            }
            return false;
        };

        /**
         *
         * @param aspect
         */
        this.attachAspect = function(aspect) {
            aspect.attach(this);
            this.aspects.push(aspect);
        };

        /**
         *
         * @param aspect
         */
        this.detachAspect = function(aspect) {
            for (var i=0; i<this.aspects.length; i++) {
                if (this.aspects[i] === aspect) {
                    this.aspects.splice(i, 1);
                    aspect.detach();
                    return true;
                }
            }
            return false;
        };

        /**
         *
         * @param type
         */
        this.attachType = function(type) {
            type.attach(this);
            this.types.push(type);
        };

        /**
         *
         * @param type
         */
        this.detachType = function(type) {
            for (var i=0; i<this.types.length; i++) {
                if (this.types[i] === type) {
                    this.types.splice(i, 1);
                    type.detach();
                    return true;
                }
            }
            return false;
        };

        /**
         *
         */
        this.clone = function() {

        };

        /**
         * 
         */
        this.serialize = function() {

        };

        angular.extend(this, initProperties);
    };

    /**
     * sample timeline JSON
     *  {
     *      id : xxx
     *      name : xxx
     *      events : [
     *          {
     *              id : xxx,
     *              name : xxx,
     *              etc : xxx,
     *              localAspect : {
     *                  id : xxx,
     *                  etc : xxx
     *              }
     *          },
     *          ...
     *      ],
     *      types : [
     *          {
     *          },
     *          ...
     *      ],
     *      aspects : [
     *          {
     *          },
     *          ...
     *      ]
     *  }
     *
     * @param serializedTimeline
     *
     * @returns {yuga.Timeline}
     */
    yuga.Timeline.deserialize = function(serializedTimeline) {
        var timeline = new yuga.Timeline(),
            ignoreProperties = ["tempData", "events", "aspects", "types"],
            serializedTimelineObject = yuga.DomainObject.parseJSON(serializedTimeline);

        for (var i=0; i<serializedTimelineObject.events.length; i++) {
            timeline.events.push(yuga.Event.deserialize(serializedTimelineObject.events[i]));
        }

        for (var i=0; i<serializedTimelineObject.types.length; i++) {
            timeline.types.push(yuga.Type.deserialize(serializedTimelineObject.types[i]));
        }

        for (var i=0; i<serializedTimelineObject.aspects.length; i++) {
            var aspect = yuga.Aspect.deserialize(serializedTimelineObject.aspects[i]);

            for (var j=0; j<timeline.types.length; j++) {
                if (timeline.types[j].id = serializedTimelineObject.aspects[i].type) {
                    aspect.type = timeline.types[j];
                    break;
                }
            }

            timeline.aspects.push(aspect);
        }

        return yuga.DomainObject.deserialize(timeline, serializedTimeline, ignoreProperties);
    };

    yuga.Timeline.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));