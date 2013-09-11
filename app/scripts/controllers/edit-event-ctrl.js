function EditEventCtrl($scope, ApplicationState, ApplicationEvents) {

    $scope.event = ApplicationState.selectedElement;

    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element.class === "yuga.Event") {
            $scope.event = element;
        }
    });

    $scope.addAspect = function(aspectId) {
        $scope.$apply(function() {
            var aspect = ApplicationState.timeline.getAspectById(aspectId);
            $scope.event.addAspect(aspect);
            aspect.selectSecondary();
        });
    };
}

EditEventCtrl.$inject = ['$scope', 'ApplicationState', 'ApplicationEvents'];