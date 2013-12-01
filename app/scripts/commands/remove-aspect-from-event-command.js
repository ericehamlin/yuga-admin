(function (yuga) {

    yuga.RemoveAspectFromEventCommand = function(event, aspect) {

        this.name = yuga.ResourceBundle.get("COMMAND_REMOVE_ASPECT_FROM_EVENT");

        this.isUndoable = true;

        this.execute = function(ApplicationState, ApplicationEvents) {
            event.removeAspect(aspect);
            aspect.removeEvent(event);
            ApplicationState.timeline.selectElement(ApplicationState.selectedElement);

            ApplicationEvents.broadcast(ApplicationEvents.ASPECT_REMOVED_FROM_EVENT, event, aspect);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents) {
            event.addAspect(aspect);
            aspect.addEvent(event);
            ApplicationState.timeline.selectElement(ApplicationState.selectedElement);
        };
    };
    yuga.RemoveAspectFromEventCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));