function GenericModalCtrl($scope, ApplicationEvents) {

    var src = "",
        title = "";

    $scope.$on(ApplicationEvents.LAUNCH_MODAL, function(event, args) {
        src = args.src;
        title = args.title;
        $scope.openModal();
    });

    $scope.getModalBodySrc = function() {
        return src;
    };

    $scope.getModalTitle = function() {
        return title;
    };

    $scope.openModal = function() {
        $("#generic-modal").modal("show");

    };

    $scope.closeModal = function() {
        $("#generic-modal").modal("hide");
    };
}

GenericModalCtrl.$inject = ['$scope', 'ApplicationEvents'];