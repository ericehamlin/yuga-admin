(function (yuga) {

    yuga.NewTypeCommand = function() {

        this.name = "new type";

        this.isUndoable = true;

        var type = new yuga.Type({name: "New Type"});
        this.execute = function(ApplicationState, ApplicationEvents, Commander) {
            ApplicationState.timeline.types.push(type);
            ApplicationEvents.broadcast(ApplicationEvents.NEW_TYPE, type);

            var command = new yuga.SelectElementCommand(type);
            Commander.execute(command);
        };

        this.unexecute = function(ApplicationState, ApplicationEvents, Commander) {
            ApplicationState.timeline.type.pop();

            var command = new yuga.SelectElementCommand(null);
            Commander.execute(command);
        };
    };
    yuga.NewAspectCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));