function EditEventCtrl($scope, ApplicationState, ApplicationEvents) {

    $scope.event = ApplicationState.selectedElement;

    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element.class === "yuga.Event") {
            $scope.event = element;
        }
    });
}

EditEventCtrl.$inject = ['$scope', 'ApplicationState', 'ApplicationEvents'];