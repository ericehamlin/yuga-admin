(function (yuga) {

    yuga.Command = function () {

        this.unexecutable = false;
        this.parameters = {};

        this.execute = function(ApplicationState, ApplicationEvents) {

        };

        this.unexecute = function(ApplicationState, ApplicationEvents) {
            // todo exceptions
            throw "not unexecutable";
        };
    };


}(window.yuga = window.yuga || {}));