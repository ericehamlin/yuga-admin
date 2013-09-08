function EditAspectCtrl($scope, ApplicationState, ApplicationEvents) {

    $scope.aspect = ApplicationState.selectedElement;

    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element.class === "yuga.Aspect") {
            $scope.aspect = element;
        }
    });
}

EditAspectCtrl.$inject = ['$scope', 'ApplicationState', 'ApplicationEvents'];