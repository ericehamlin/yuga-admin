(function (yuga) {

    yuga.NewTypeCommand = function() {

        this.name = yuga.ResourceBundle.get("COMMAND_NEW_TYPE");

        this.isUndoable = true;

        // todo id for new object
        var type = new yuga.Type({id: yuga.DomainObject.newId(), name: "New Type"});

        this.execute = function(ApplicationState, ApplicationEvents, Commander) {
            type.timeline = ApplicationState.timeline;
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