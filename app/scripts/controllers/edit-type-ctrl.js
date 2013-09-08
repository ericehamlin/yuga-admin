function EditTypeCtrl($scope, ApplicationState, ApplicationEvents) {

    $scope.type = ApplicationState.selectedElement;

    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element.class === "yuga.Type") {
            $scope.type = element;
        }
    });

}

EditTypeCtrl.$inject = ['$scope', 'ApplicationState', 'ApplicationEvents'];