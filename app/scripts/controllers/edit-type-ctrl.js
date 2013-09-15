function EditTypeCtrl($scope, ApplicationState, ApplicationEvents, Commander) {

    $scope.type = ApplicationState.selectedElement;

    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element instanceof yuga.Type) {
            $scope.type = element;
        }
    });

    $scope.addField = function() {
        var command = new yuga.AddFieldToTypeCommand($scope.type);
        Commander.execute(command);
    };

    $scope.deleteField = function(field) {
        $scope.type.deleteField(field);
    };

}

EditTypeCtrl.$inject = ['$scope', 'ApplicationState', 'ApplicationEvents', 'Commander'];