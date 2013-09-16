function EditEventCtrl($scope, ApplicationState, ApplicationEvents, Commander) {

    $scope.event = ApplicationState.selectedElement;
    $scope.refresh = 0;

    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element instanceof yuga.Event) {
            $scope.event = element;
            $scope.refresh++;
        }
    });

    $scope.$on(ApplicationEvents.ASPECT_ADDED_TO_EVENT, function($event, event, aspect){
        $scope.refresh++;
    });

    $scope.addAspect = function(aspectId) {
        $scope.$apply(function() {
            var aspect = ApplicationState.timeline.getAspectById(aspectId);
            var command = new yuga.AddAspectToEventCommand($scope.event, aspect);
            Commander.execute(command);
        });
    };


    /**
     *
     * @param globalAspect
     */
    $scope.getLocalAspect = function(globalAspect) {
        return $scope.event.getLocalAspectById(globalAspect.id);
    };

    $scope.getLocalAspectField = function(globalAspect, field) {
        //Error: Non-assignable model expression: getLocalAspectField(aspect, field) (<input ng-switch-when="text" type="text" ng-model="getLocalAspectField(aspect, field)" id="{{getFieldId(aspect, field)}}" name="{{getFieldId(aspect, field)}}" placeholder="{{field.defaultValue}}" class="ng-scope">)
        return $scope.getLocalAspect(globalAspect).getFieldValue( $scope.getFieldId(globalAspect, field) );
    };

    $scope.getFieldId = function(aspect, field) {
        return aspect.getType().getFieldId(field);
    };
}

EditEventCtrl.$inject = ['$scope', 'ApplicationState', 'ApplicationEvents', 'Commander'];