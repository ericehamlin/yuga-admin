function GenericModalCtrl($scope, ApplicationEvents) {

    $scope.$on(ApplicationEvents.LAUNCH_MODAL, function(event, args) {
        $scope.openModal();
    });

    $scope.getModalBodySrc = function() {

    };

    $scope.openModal = function() {
        $("#generic-modal").modal("show");

    };

    $scope.closeModal = function() {
        $("#generic-modal").modal("hide");
    };
}

GenericModalCtrl.$inject = ['$scope', 'ApplicationEvents'];