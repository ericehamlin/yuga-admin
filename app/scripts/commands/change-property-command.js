(function (yuga) {

    yuga.ChangePropertyCommand = function(obj, property, from, to) {

        this.name = yuga.ResourceBundle.COMMAND_CHANGE_PROPERTY;

        this.isUndoable = true;

        this.execute = function(ApplicationState, ApplicationEvents) {
            obj.setProperty(property, to);
            ApplicationState.timeline.selectElement(ApplicationState.selectedElement);

            ApplicationEvents.broadcast(ApplicationEvents.PROPERTY_CHANGED, obj, property, from, to);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents) {
            obj.setProperty(property, from);
        };
    };
    yuga.ChangePropertyCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));