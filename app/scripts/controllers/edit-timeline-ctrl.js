function EditTimelineCtrl($scope, $rootScope) {
    $scope.switchSelectedElement = function() {
        $rootScope.selectedElement = new yuga.Type();
    }
}

EditTimelineCtrl.$inject = ['$scope', '$rootScope'];