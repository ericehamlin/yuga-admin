function GenericModalCtrl($scope, ApplicationEvents) {

    var src = "";

    $scope.$on(ApplicationEvents.LAUNCH_MODAL, function(event, args) {
        src = args.src;
        $scope.openModal();
    });

    $scope.getModalBodySrc = function() {
        return src;
    };

    $scope.openModal = function() {
        $("#generic-modal").modal("show");

    };

    $scope.closeModal = function() {
        $("#generic-modal").modal("hide");
    };
}

GenericModalCtrl.$inject = ['$scope', 'ApplicationEvents'];