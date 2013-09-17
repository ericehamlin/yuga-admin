(function (yuga) {

    yuga.NewEventCommand = function() {

        this.name = "new event";

        this.isUndoable = true;

        // todo id for new object
        var event = new yuga.Event({name: "New Event"});

        this.execute = function(ApplicationState, ApplicationEvents, Commander) {
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