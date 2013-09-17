(function (yuga) {

    yuga.ChangeLocalAspectPropertyCommand = function(localAspect, property, from, to) {

        this.name = "text change";

        this.isUndoable = true;

        this.execute = function(ApplicationState, ApplicationEvents) {
            localAspect[property] = to;
            ApplicationState.timeline.selectElement(ApplicationState.selectedElement);

            ApplicationEvents.broadcast(ApplicationEvents.LOCAL_ASPECT_PROPERTY_CHANGED, localAspect, property, from, to);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents) {
            localAspect[property] = from;
        };
    };
    yuga.ChangeLocalAspectPropertyCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));