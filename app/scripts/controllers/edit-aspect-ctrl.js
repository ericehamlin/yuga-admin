function EditAspectCtrl($scope, ApplicationState) {

    $scope.aspect = ApplicationState.selectedElement;

    $scope.$on("selectedElementChanged", function($event, element){
        if (element.class === "yuga.Aspect") {
            $scope.aspect = element;
        }
    });
}

EditAspectCtrl.$inject = ['$scope', 'ApplicationState'];