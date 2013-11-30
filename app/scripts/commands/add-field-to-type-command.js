(function (yuga) {

    yuga.AddFieldToTypeCommand = function(type) {

        this.name = yuga.ResourceBundle.get("COMMAND_ADD_FIELD_TO_TYPE");

        this.isUndoable = true;

        this.execute = function(ApplicationState, ApplicationEvents) {
            type.addField();

            ApplicationEvents.broadcast(ApplicationEvents.FIELD_ADDED_TO_TYPE, type);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents) {
            type.fields.pop();
        };
    };
    yuga.AddFieldToTypeCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));