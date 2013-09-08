function EditTypeCtrl($scope, ApplicationState) {

    $scope.type = ApplicationState.selectedElement;

    $scope.$on("selectedElementChanged", function($event, element){
        if (element.class === "yuga.Type") {
            $scope.type = element;
        }
    });

}

EditTypeCtrl.$inject = ['$scope', 'ApplicationState'];