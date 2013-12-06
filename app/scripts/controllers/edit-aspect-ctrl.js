function EditAspectCtrl($scope, $timeout, ApplicationState, ApplicationEvents, Commander) {

    init();

    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element instanceof yuga.Aspect) {
            reset();
        }
    });

    /**
     *
     */
    $scope.getTypes = function() {
        return ApplicationState.timeline.types;
    };

    /**
     *
     * @param type
     */
    $scope.setType = function(type) {
        $scope.aspect.setType(type);
    };

    /**
     *
     * @param eventId
     */
    $scope.addEvent = function(eventId) {
        $scope.$apply(function() {
            var event = ApplicationState.timeline.getEventById(eventId);
            var command = new yuga.AddAspectToEventCommand(event, $scope.aspect);
            Commander.execute(command);
        });
    };

    /**
     *
     * @param field
     */
    $scope.getFieldId = function(field) {
        return $scope.aspect.getType().getFieldId(field);
    };

    /**
     *
     */
    $scope.toggleEditName = function() {
        $scope.editName = !$scope.editName;
    };

    function init() {
        reset();
    }

    function reset() {
        $scope.aspect = ApplicationState.selectedElement;

        console.log(yuga.Timeline.deserialize('{"name":"Default Timeline","events":[{"aspects":[{"id":6,"localAspect":{}},{"id":8,"localAspect":{}}],"description":"","id":1,"name":"Event Name","start":"1972-05-05 05:06:23","end":"1999-06-07 01:30:30","color":"ff0000"},{"aspects":[],"description":"","id":2,"name":"Revent Name","start":"1990-05-05 05:06:23","end":"2012-06-07 01:30:30","color":"00ff00"},{"aspects":[{"id":7,"localAspect":{}},{"id":8,"localAspect":{}}],"description":"","id":3,"name":"Herve Villachez","start":"1965-05-05 05:06:23","end":"2000-06-07 01:30:30","color":"0000ff"}],"types":[{"fields":[],"icon":"&#xf025;","id":3,"name":"Person"},{"fields":[],"icon":"&#xf041;","id":4,"name":"Place"},{"fields":[{"name":"boobak","type":"text","defaultText":"rambalamba"}],"icon":"&#xf02d;","id":5,"name":"Thing"}],"aspects":[{"name":"Johnny","color":"00f","description":"","id":6,"type":3},{"name":"Europe","color":"0f0","description":"","id":7,"type":4},{"name":"Downtown Webberville","color":"f00","description":"","id":8,"type":5}]} '));

        $scope.editName = false;

        $timeout(function() {
            //$("#colorpicker").colorpicker("destroy");
            $("#colorpicker").colorpicker({
                parts: ['map', 'bar'],
                buttonColorize: true,
                buttonImageOnly: true,
                showOn: 'button'
            });

            $("#colorpicker").colorpicker("setColor", "#"+$("#colorpicker").val())
        });
    }
}

EditAspectCtrl.$inject = ['$scope', '$timeout', 'ApplicationState', 'ApplicationEvents', 'Commander'];