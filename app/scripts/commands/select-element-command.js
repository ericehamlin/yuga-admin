(function (yuga) {

    yuga.SelectElementCommand = function(element) {

        this.execute = function(ApplicationState, ApplicationEvents) {
            ApplicationState.timeline.selectElement(element);
            ApplicationState.selectElement(element);
            ApplicationEvents.broadcast(ApplicationEvents.SELECTED_ELEMENT_CHANGED, element);
        };
    };
    yuga.SelectElementCommand.prototype = new yuga.Command();

}(window.yuga = window.yuga || {}));