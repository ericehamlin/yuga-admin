(function (yuga) {

    //TODO : apparently this is also firing a change property command. Why?
    yuga.NewEventCommand = function() {

        this.name = yuga.ResourceBundle.get("COMMAND_NEW_EVENT");

        this.isUndoable = true;

        // todo id for new object
        var event = new yuga.Event({id: 7777, name: "New Event"});

        this.execute = function(ApplicationState, ApplicationEvents, Commander) {
            event.timeline = ApplicationState.timeline;
            ApplicationState.timeline.events.push(event);
            ApplicationEvents.broadcast(ApplicationEvents.NEW_EVENT, event);

            var command = new yuga.SelectElementCommand(event);
            Commander.execute(command);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents, Commander) {
            ApplicationState.timeline.events.pop();

            var command = new yuga.SelectElementCommand(null);
            Commander.execute(command);
        };
    };
    yuga.NewEventCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));