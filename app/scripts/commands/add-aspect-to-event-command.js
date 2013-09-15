(function (yuga) {

    yuga.AddAspectToEventCommand = function(event, aspect) {

        this.name = "add aspect to event";

        this.isUndoable = true;

        this.execute = function(ApplicationState, ApplicationEvents) {
            event.addAspect(aspect);
            aspect.addEvent(event);
            ApplicationState.timeline.selectElement(ApplicationState.selectedElement);

            ApplicationEvents.broadcast(ApplicationEvents.ASPECT_ADDED_TO_EVENT, event, aspect);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents) {
            event.removeAspect(aspect);
            aspect.removeEvent(event);
            ApplicationState.timeline.selectElement(ApplicationState.selectedElement);
        };
    };
    yuga.AddAspectToEventCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));