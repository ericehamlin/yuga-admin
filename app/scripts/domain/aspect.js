(function (yuga) {

    yuga.Aspect = function (initProperties) {
        this.class = "yuga.Aspect";

        this.tempData = {
            selected: false,
            selectedSecondary: false
        };

        /**
         *
         * @param event
         */
        this.in = function(event) {
            return jQuery.inArray(this, event.aspects) > -1;
        };

        /**
         *
         * @param type
         */
        this.is = function(type) {
            return this.typeId === type.id;
        };

        angular.extend(this, initProperties);
    };

    yuga.Aspect.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));