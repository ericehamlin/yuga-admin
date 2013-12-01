(function (yuga) {

    yuga.CloneAspectCommand = function(aspect) {

        var clonedAspect;

        this.name = yuga.ResourceBundle.get("COMMAND_CLONE_ASPECT");

        this.isUndoable = true;

        this.execute = function(ApplicationState, ApplicationEvents, Commander) {
            clonedAspect = aspect.clone();
            clonedAspect.name = "Copy of " + clonedAspect.name;

            ApplicationState.timeline.attachAspect(clonedAspect);
            ApplicationEvents.broadcast(ApplicationEvents.ASPECT_CLONED, aspect, clonedAspect);

            var command = new yuga.SelectElementCommand(clonedAspect);
            Commander.execute(command);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents, Commander) {
            ApplicationState.timeline.detachAspect(clonedAspect);

            if (ApplicationState.selectedElement === clonedAspect) {
                var command = new yuga.SelectElementCommand();
                Commander.execute(command);
            }
        };
    };
    yuga.CloneAspectCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));