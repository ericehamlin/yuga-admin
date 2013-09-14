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

        angular.extend(this, initProperties);

    };

    yuga.Aspect.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));