(function (yuga) {

    yuga.Command = function () {

        this.isUndoable = false;

        this.execute = function(ApplicationState, ApplicationEvents) {
        };

        this.unexecute = function(ApplicationState, ApplicationEvents) {
            // todo exceptions
            throw "not unexecutable";
        };
    };


}(window.yuga = window.yuga || {}));