(function (yuga) {

    yuga.NewAspectCommand = function() {

        this.name = "new aspect";

        this.isUndoable = true;

        var aspect = new yuga.Aspect({name: "New Aspect"});
        this.execute = function(ApplicationState, ApplicationEvents, Commander) {
            ApplicationState.timeline.aspects.push(aspect);
            ApplicationEvents.broadcast(ApplicationEvents.NEW_ASPECT, aspect);

            var command = new yuga.SelectElementCommand(aspect);
            Commander.execute(command);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents, Commander) {
            ApplicationState.timeline.aspects.pop();

            var command = new yuga.SelectElementCommand(null);
            Commander.execute(command);
        };
    };
    yuga.NewAspectCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));