(function (yuga) {

    yuga.DeleteTypeCommand = function(type) {

        this.name = yuga.ResourceBundle.COMMAND_DELETE_TYPE;

        this.isUndoable = true;

        /**
         * @param ApplicationState
         * @param ApplicationEvents
         * @param Commander
         */
        this.execute = function(ApplicationState, ApplicationEvents, Commander) {
            var command = new yuga.SelectElementCommand();
            Commander.execute(command);
            ApplicationState.timeline.detachType(type);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents, Commander) {
            ApplicationState.timeline.attachType(type);
            var command = new yuga.SelectElementCommand(type);
            Commander.execute(command);
        };
    };
    yuga.DeleteTypeCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));