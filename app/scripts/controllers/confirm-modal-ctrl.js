function ConfirmModalCtrl($scope, ApplicationEvents) {
    var confirmFunction, cancelFunction;

    $scope.$on(ApplicationEvents.LAUNCH_CONFIRM_MODAL, function(event, args) {
        $scope.confirmLabel = args.confirmLabel ? args.confirmLabel : yuga.ResourceBundle.YES;
        $scope.cancelLabel = args.cancelLabel ? args.cancelLabel : yuga.ResourceBundle.NO;
        $scope.message = args.message ? args.message : "";
        confirmFunction = args.confirmFunction ? args.confirmFunction : function(){};
        cancelFunction = args.cancelFunction ? args.cancelFunction : function(){};
        $("#confirm-modal").modal("show");
    });

    $scope.confirmFunction = function() {
        $("#confirm-modal").modal("hide");
        confirmFunction();
    };

    $scope.cancelFunction = function() {
        $("#confirm-modal").modal("hide");
        cancelFunction();
    };
}

ConfirmModalCtrl.$inject = ['$scope', 'ApplicationEvents'];