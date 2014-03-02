(function (yuga) {

    yuga.DeleteTypeCommand = function(type) {

        this.name = yuga.ResourceBundle.get("COMMAND_DELETE_TYPE");

        this.isUndoable = true;

        var aspects = [];

        /**
         * @param ApplicationState
         * @param ApplicationEvents
         * @param Commander
         */
        this.execute = function(ApplicationState, ApplicationEvents, Commander) {
            var command = new yuga.SelectElementCommand();
            Commander.execute(command);
            ApplicationState.timeline.detachType(type);
            for (var i=0; i<ApplicationState.timeline.aspects.length; i++) {
                if (ApplicationState.timeline.aspects[i].getType() == type) {
                    aspects.push(ApplicationState.timeline.aspects[i]);
                    ApplicationState.timeline.aspects[i].setType(null);
                }
            }

        };

        this.unexecute = function(ApplicationState, ApplicationEvents, Commander) {
            ApplicationState.timeline.attachType(type);
            for (var i=0; i<aspects.length; i++) {
                aspects[i].setType(type);
            }
            var command = new yuga.SelectElementCommand(type);
            Commander.execute(command);
        };
    };
    yuga.DeleteTypeCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));