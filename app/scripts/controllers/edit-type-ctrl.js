function EditTypeCtrl($scope, ApplicationState, ApplicationEvents, Commander) {

    init();

    /**
     *
     */
    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element instanceof yuga.Type) {
            reset();
        }
    });

    /**
     *
     */
    $scope.addField = function() {
        var command = new yuga.AddFieldToTypeCommand($scope.type);
        Commander.execute(command);
    };

    /**
     *
     * @param field
     */
    $scope.deleteField = function(field) {
        $scope.type.deleteField(field);
    };

    /**
     *
     */
    $scope.toggleEditName = function() {
        $scope.editName = !$scope.editName;
    };

    /**
     *
     */
    function init() {
        reset();
    }

    /**
     *
     */
    function reset() {
        $scope.type = ApplicationState.selectedElement;
    }
}

EditTypeCtrl.$inject = ['$scope', 'ApplicationState', 'ApplicationEvents', 'Commander'];