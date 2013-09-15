(function (yuga) {

    yuga.ChangePropertyCommand = function(obj, property, from, to) {

        this.isUndoable = true;

        this.execute = function(ApplicationState, ApplicationEvents) {
            obj[property] = to;
            ApplicationState.timeline.selectElement(ApplicationState.selectedElement);

            ApplicationEvents.broadcast(ApplicationEvents.PROPERTY_CHANGED, obj, property, from, to);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents) {
            obj[property] = from;
        };
    };
    yuga.ChangePropertyCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));