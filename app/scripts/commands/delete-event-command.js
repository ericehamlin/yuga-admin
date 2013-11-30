(function (yuga) {

    yuga.DeleteEventCommand = function(event) {

        this.name = yuga.ResourceBundle.get("COMMAND_DELETE_EVENT");

        this.isUndoable = true;

        /**
         * @param ApplicationState
         * @param ApplicationEvents
         * @param Commander
         */
        this.execute = function(ApplicationState, ApplicationEvents, Commander) {
            var command = new yuga.SelectElementCommand();
            Commander.execute(command);
            ApplicationState.timeline.detachEvent(event);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents, Commander) {
            ApplicationState.timeline.attachEvent(event);
            var command = new yuga.SelectElementCommand(event);
            Commander.execute(command);
        };
    };
    yuga.DeleteEventCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));