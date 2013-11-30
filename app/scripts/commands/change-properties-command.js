(function (yuga) {

    yuga.ChangePropertiesCommand = function(obj, toProperties) {

        this.name = yuga.ResourceBundle.get("COMMAND_CHANGE_PROPERTIES");

        this.isUndoable = true;

        var fromProperties = {};

        this.execute = function(ApplicationState, ApplicationEvents) {
            for (property in toProperties) {
                fromProperties[property] = obj.getProperty(property);
                obj.setProperty(property, toProperties[property]);
            }
            ApplicationState.timeline.selectElement(ApplicationState.selectedElement);

            ApplicationEvents.broadcast(ApplicationEvents.PROPERTIES_CHANGED, obj, toProperties);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents) {
            for (property in fromProperties) {
                obj.setProperty(property, fromProperties[property]);
            }
        };
    };
    yuga.ChangePropertyCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));