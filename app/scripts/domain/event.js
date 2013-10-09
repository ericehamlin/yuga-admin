(function (yuga) {

    yuga.Event = function (initProperties) {

        this.description = "";

        this.aspects = [];
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
         * @param aspect
         */
        this.addAspect = function(aspect) {
            if (!this.containsAspect(aspect)) {
                this.aspects[this.aspects.length] = aspect;
                var localAspect = new yuga.LocalAspect({aspect: aspect, event: this});
                this.localAspects[aspect.id] = localAspect;
            }
        };

        /**
         *
         * @param aspect
         */
        this.removeAspect = function(aspect) {
            for (var i=0; i<this.aspects.length; i++) {
                if (this.aspects[i] === aspect) {
                    this.aspects.splice(i, 1);
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

        angular.extend(this, initProperties);
    };

    yuga.Event.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));