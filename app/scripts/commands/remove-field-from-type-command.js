(function (yuga) {

    yuga.RemoveFieldFromTypeCommand = function(type, field) {

        this.name = yuga.ResourceBundle.get("COMMAND_REMOVE_FIELD_FROM_TYPE");

        this.isUndoable = true;

        this.execute = function(ApplicationState, ApplicationEvents) {
            type.deleteField(field)

            ApplicationEvents.broadcast(ApplicationEvents.FIELD_ADDED_TO_TYPE, type);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents) {
            type.fields.push(field);
        };
    };
    yuga.AddFieldToTypeCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));