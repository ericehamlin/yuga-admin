function EditEventCtrl($scope, ApplicationState, ApplicationEvents, Commander) {

    init();

    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element instanceof yuga.Event) {
            reset();
        }
    });

    $scope.$on(ApplicationEvents.ASPECT_ADDED_TO_EVENT, function($event, event, aspect){
        $scope.refresh++;
    });

    /**
     *
     * @param aspectId
     */
    $scope.addAspect = function(aspectId) {
        $scope.$apply(function() {
            var aspect = ApplicationState.timeline.getAspectById(aspectId);
            var command = new yuga.AddAspectToEventCommand($scope.event, aspect);
            Commander.execute(command);
            console.log($scope.event, aspect);
        });
    };

    /**
     *
     * @param aspect
     */
    $scope.removeAspect = function(aspect) {
        //$scope.$apply(function() {
            var command = new yuga.RemoveAspectFromEventCommand($scope.event, aspect);
            Commander.execute(command);
        //});
    };


    /**
     *
     * @param aspect
     * @param field
     */
    $scope.getFieldId = function(localAspect, field) {
        return localAspect.aspect.getType().getFieldId(field);
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
        $scope.refresh = 0;
        reset();
    }

    /**
     *
     */
    function reset() {
        $scope.event = ApplicationState.selectedElement;
        console.log(JSON.stringify($scope.event.timeline.serialize()));
        $scope.editName = false;
        $scope.refresh++;
    }
}

EditEventCtrl.$inject = ['$scope', 'ApplicationState', 'ApplicationEvents', 'Commander'];