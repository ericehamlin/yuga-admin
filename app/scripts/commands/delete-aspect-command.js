(function (yuga) {

    yuga.DeleteAspectCommand = function(aspect) {

        this.name = yuga.ResourceBundle.COMMAND_DELETE_ASPECT;

        this.isUndoable = true;

        /**
         * @param ApplicationState
         * @param ApplicationEvents
         * @param Commander
         */
        this.execute = function(ApplicationState, ApplicationEvents, Commander) {
            var command = new yuga.SelectElementCommand();
            Commander.execute(command);
            ApplicationState.timeline.detachAspect(aspect);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents, Commander) {
            ApplicationState.timeline.attachAspect(aspect);
            var command = new yuga.SelectElementCommand(aspect);
            Commander.execute(command);
        };
    };
    yuga.DeleteAspectCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));