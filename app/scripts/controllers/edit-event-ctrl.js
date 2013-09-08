function EditEventCtrl($scope, ApplicationState) {

    $scope.event = ApplicationState.selectedElement;

    $scope.$on("selectedElementChanged", function($event, element){
        if (element.class === "yuga.Event") {
            $scope.event = element;
        }
    });
}

EditEventCtrl.$inject = ['$scope', 'ApplicationState'];