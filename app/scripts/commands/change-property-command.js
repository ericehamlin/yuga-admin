(function (yuga) {

    yuga.ChangePropertyCommand = function(obj, property, from, to) {

        this.name = "text change";

        this.isUndoable = true;

        this.execute = function(ApplicationState, ApplicationEvents) {
            obj[property] = to;
            console.log("OBJ", obj, property);
            ApplicationState.timeline.selectElement(ApplicationState.selectedElement);

            ApplicationEvents.broadcast(ApplicationEvents.PROPERTY_CHANGED, obj, property, from, to);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents) {
            obj[property] = from;
        };
    };
    yuga.ChangePropertyCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));