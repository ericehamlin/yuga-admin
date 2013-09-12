(function (yuga) {

    yuga.Aspect = function (initProperties) {

        //todo -- probably eliminate this. Shouldn't have to update both arrays
        // on the other hand, shouldn't have to scrounge through two levels of arrays to get this result
        this.events = [];

        this.tempData = {
            selected: false,
            selectedSecondary: false
        };

        /**
         *
         * @param event
         */
        this.inEvent = function(event) {
            return jQuery.inArray(event, this.events) > -1;
        };

        /**
         *
         * @param type
         */
        this.isType = function(type) {
            return this.typeId === type.id;
        };

        /**
         *
         */
        this.getType = function() {
            return this.timeline.getTypeById(this.typeId);
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
         *
         */
        this.getEvents = function() {
            return this.events;
        };

        angular.extend(this, initProperties);

    };

    yuga.Aspect.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));