(function (yuga) {

    yuga.Timeline = function (initProperties) {
        this.class = "yuga.Timeline";

        this.events = [];
        this.types = [];
        this.aspects = [];

        this.selectEvent = function(event) {
            for (var i=0; i<this.events.length; i++) {
                this.events[i].tempData.selectedSecondary = false;
                this.events[i].tempData.selected = (event === this.events[i]);
            }

            var type;
            for (var i=0; i<this.types.length; i++) {
                type = this.types[i];
                type.tempData.selected = false;
                type.tempData.selectedSecondary = false;
            }

            var aspect;
            for (var i=0; i<this.aspects.length; i++) {
                aspect = this.aspects[i];
                aspect.tempData.selected = false;
                /** TODO should this be by id or by object? Consistency. event.contains(aspect)  aspect.in(event)*/
                aspect.tempData.selectedSecondary = jQuery.inArray(aspect, event.aspects) > -1;
            }
        };

        this.selectType = function(type) {

            var event;
            for (var i=0; i<this.events.length; i++) {
                event = this.events[i];
                event.tempData.selected = false;
                event.tempData.selectedSecondary = false;
            }

            for (var i=0; i<this.types.length; i++) {
                this.types[i].tempData.selectedSecondary = false;
                this.types[i].tempData.selected = (type === this.types[i]);
            }

            var aspect;
            for (var i=0; i<this.aspects.length; i++) {
                aspect = this.aspects[i];
                aspect.tempData.selected = false;
                /** TODO should this be by id or by object? Consistency. aspect.is(type)  aspect.isInstanceOf(type)*/
                aspect.tempData.selectedSecondary = (aspect.typeId === type.id);
            }
        };

        this.selectAspect = function(aspect) {

            var event;
            for (var i=0; i<this.events.length; i++) {
                event = this.events[i];
                event.tempData.selected = false;
                /** TODO should this be by id or by object? Consistency. event.contains(aspect)  aspect.in(event)*/
                event.tempData.selectedSecondary = jQuery.inArray(aspect, this.events[i].aspects) > -1;
            }

            var type;
            for (var i=0; i<this.types.length; i++) {
                type = this.types[i];
                type.tempData.selected = false;
                /** TODO should this be by id or by object? Consistency. aspect.is(type)*/
                type.tempData.selectedSecondary = (aspect.typeId === type.id);
            }

            for (var i=0; i<this.aspects.length; i++) {
                this.aspects[i].tempData.selectedSecondary = false;
                this.aspects[i].tempData.selected = (aspect === this.aspects[i]);
            }
        };

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