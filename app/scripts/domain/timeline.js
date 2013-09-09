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

            for (var i=0; i<this.types.length; i++) {
                this.types[i].tempData.selected = false;
            }

            for (var i=0; i<this.aspects.length; i++) {
                this.aspects[i].tempData.selected = false;

            }
        };

        this.selectType = function(type) {
            for (var i=0; i<this.events.length; i++) {
                this.events[i].tempData.selected = false;
            }

            for (var i=0; i<this.types.length; i++) {
                this.types[i].tempData.selectedSecondary = false;
                this.types[i].tempData.selected = (type === this.types[i]);
            }

            for (var i=0; i<this.aspects.length; i++) {
                this.aspects[i].tempData.selected = false;
                this.aspects[i].tempData.selectedSecondary = (this.aspects[i].typeId === type.id);
            }
        };

        this.selectAspect = function(aspect) {
            for (var i=0; i<this.events.length; i++) {
                this.events[i].tempData.selected = false;
            }
            
            for (var i=0; i<this.types.length; i++) {
                this.types[i].tempData.selected = false;
                this.types[i].tempData.selectedSecondary = (aspect.typeId === this.types[i].id);
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

            console.log("amonkey", this);
        };

        angular.extend(this, initProperties);
    };

    yuga.Timeline.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));