(function (yuga) {

    yuga.CloneEventCommand = function(event) {

        var clonedEvent;

        this.name = yuga.ResourceBundle.get("COMMAND_CLONE_EVENT");

        this.isUndoable = true;

        this.execute = function(ApplicationState, ApplicationEvents, Commander) {
            clonedEvent = event.clone();
            clonedEvent.name = "Copy of " + clonedEvent.name;

            ApplicationState.timeline.attachEvent(clonedEvent);
            ApplicationEvents.broadcast(ApplicationEvents.EVENT_CLONED, event, clonedEvent);

            var command = new yuga.SelectElementCommand(clonedEvent);
            Commander.execute(command);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents, Commander) {
            ApplicationState.timeline.detachEvent(clonedEvent);

            if (ApplicationState.selectedElement === clonedEvent) {
                var command = new yuga.SelectElementCommand();
                Commander.execute(command);
            }
        };
    };
    yuga.CloneEventCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));