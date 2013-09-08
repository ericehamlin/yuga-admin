function EditTypeCtrl($scope, ApplicationState, ApplicationEvents) {

    $scope.type = ApplicationState.selectedElement;

    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element.class === "yuga.Type") {
            $scope.type = element;
        }
    });

    $scope.addField = function() {
        if ($scope.type.fields === undefined) {
            $scope.type.fields = [];
        }
        $scope.type.fields[$scope.type.fields.length] = {};
    }

}

EditTypeCtrl.$inject = ['$scope', 'ApplicationState', 'ApplicationEvents'];