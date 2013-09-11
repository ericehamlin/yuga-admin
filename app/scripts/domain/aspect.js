(function (yuga) {

    yuga.Aspect = function (initProperties) {

        this.tempData = {
            selected: false,
            selectedSecondary: false
        };

        /**
         *
         * @param event
         */
        this.inEvent = function(event) {
            return jQuery.inArray(this, event.aspects) > -1;
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
        this.getEvents = function() {

        };

        angular.extend(this, initProperties);

    };

    yuga.Aspect.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));