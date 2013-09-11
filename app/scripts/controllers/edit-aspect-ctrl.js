function EditAspectCtrl($scope, ApplicationState, ApplicationEvents) {

    $scope.aspect = ApplicationState.selectedElement;

    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element instanceof yuga.Aspect) {
            $scope.aspect = element;
        }
    });

    $scope.addEvent = function(eventId) {
        $scope.$apply(function() {
            var event = ApplicationState.timeline.getEventById(eventId);
            console.log(event);
            event.addAspect($scope.aspect);
            event.selectSecondary();
        });
    };
}

EditAspectCtrl.$inject = ['$scope', 'ApplicationState', 'ApplicationEvents'];