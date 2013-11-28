(function (yuga) {

    yuga.DeleteEventCommand = function(event) {

        this.name = yuga.ResourceBundle.COMMAND_DELETE_EVENT;

        this.isUndoable = true;

        /**
         * TODO best way to preserve state from before?
         * preserve event object and reconstitute? or save copy of whole timeline?
         *
         * @param ApplicationState
         * @param ApplicationEvents
         * @param Commander
         */
        this.execute = function(ApplicationState, ApplicationEvents, Commander) {
            ApplicationState.timeline.deleteEvent(event);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents, Commander) {
        };
    };
    yuga.NewAspectCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));