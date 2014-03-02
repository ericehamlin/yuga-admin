function EditTimelineCtrl($scope, ApplicationState) {
    $scope.timeline = ApplicationState.timeline;
}

EditTimelineCtrl.$inject = ['$scope', 'ApplicationState'];