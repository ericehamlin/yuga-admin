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

        console.log(yuga.Timeline.deserialize({
            "name": "bag",
            "id": 132,
            "aspects": [
                {"id": 1, "name": "John", type: 5},
                {"id": 2, "name": "India"}
            ],
            "events": [
                {"id": 3, "name": "alert"},
                {"id": 4, "name": "boom"}
            ],
            "types" : [
                {"id": 5, "name": "person"},
                {"id": 6, "name": "place"}
            ]
        }));


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