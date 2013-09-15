function EditEventCtrl($scope, ApplicationState, ApplicationEvents, Commander) {

    $scope.event = ApplicationState.selectedElement;

    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element instanceof yuga.Event) {
            $scope.event = element;
        }
    });

    $scope.$on(ApplicationEvents.PROPERTY_CHANGED, function(event, element, property, from, to){
        /*if (element instanceof yuga.Event) {
            $scope.event = element;
        }*/
    });

    $scope.addAspect = function(aspectId) {
        $scope.$apply(function() {
            var aspect = ApplicationState.timeline.getAspectById(aspectId);
            var command = new yuga.AddAspectToEventCommand($scope.event, aspect);
            Commander.execute(command);
        });
    };
}

EditEventCtrl.$inject = ['$scope', 'ApplicationState', 'ApplicationEvents', 'Commander'];