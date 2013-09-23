function EditAspectCtrl($scope, ApplicationState, ApplicationEvents, Commander) {

    setTimeout(function() {
        $("#colorpicker").colorpicker({
            rgb: false,
            hsv: false
        });
    }, 2000);

    $scope.aspect = ApplicationState.selectedElement;

    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element instanceof yuga.Aspect) {
            $scope.aspect = element;
        }
    });

    $scope.addEvent = function(eventId) {
        $scope.$apply(function() {
            var event = ApplicationState.timeline.getEventById(eventId);
            var command = new yuga.AddAspectToEventCommand(event, $scope.aspect);
            Commander.execute(command);
        });
    };

    $scope.getFieldId = function(field) {
        return $scope.aspect.getType().getFieldId(field);
    };
}

EditAspectCtrl.$inject = ['$scope', 'ApplicationState', 'ApplicationEvents', 'Commander'];