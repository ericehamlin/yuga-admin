(function (yuga) {

    yuga.CloneTypeCommand = function(type) {

        var clonedType;

        this.name = yuga.ResourceBundle.get("COMMAND_CLONE_TYPE");

        this.isUndoable = true;

        this.execute = function(ApplicationState, ApplicationEvents, Commander) {
            clonedType = type.clone();
            clonedType.name = "Copy of " + clonedType.name;

            ApplicationState.timeline.attachType(clonedType);
            ApplicationEvents.broadcast(ApplicationEvents.TYPE_CLONED, type, clonedType);

            var command = new yuga.SelectElementCommand(clonedType);
            Commander.execute(command);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents, Commander) {
            ApplicationState.timeline.detachType(clonedType);

            if (ApplicationState.selectedElement === clonedType) {
                var command = new yuga.SelectElementCommand();
                Commander.execute(command);
            }
        };
    };
    yuga.CloneTypeCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));