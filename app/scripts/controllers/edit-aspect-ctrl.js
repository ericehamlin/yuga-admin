function EditAspectCtrl($scope, $timeout, ApplicationState, ApplicationEvents, Commander) {

    init();

    $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
        if (element instanceof yuga.Aspect) {
            init();
        }
    });

    $scope.getTypes = function() {
        return ApplicationState.timeline.types;
    };

    $scope.setType = function(type) {
        $scope.aspect.setType(type);
    };

    $scope.addEvent = function(eventId) {
        $scope.$apply(function() {
            var event = ApplicationState.timeline.getEventById(eventId);
            var command = new yuga.AddAspectToEventCommand(event, $scope.aspect);
            Commander.execute(command);
        });
    };

    $scope.getFieldId = function(field) {
        return $scope.aspect.getType().getFieldId(field);
    };

    $scope.toggleEditName = function() {
        $scope.editName = !$scope.editName;
    };

    function init() {
        $scope.aspect = ApplicationState.selectedElement;

        $scope.editName = false;

        $timeout(function() {
            //$("#colorpicker").colorpicker("destroy");
            $("#colorpicker").colorpicker({
                parts: ['map', 'bar'],
                buttonColorize: true,
                buttonImageOnly: true,
                showOn: 'button'
            });

            $("#colorpicker").colorpicker("setColor", "#"+$("#colorpicker").val())
        });
    };
}

EditAspectCtrl.$inject = ['$scope', '$timeout', 'ApplicationState', 'ApplicationEvents', 'Commander'];