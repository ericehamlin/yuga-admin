'use strict';

function TitleBarCtrl($scope, Commander, ApplicationState) {

    $scope.removeFilter = function() {
        ApplicationState.removeFilter(filterId);
    };

    $scope.$watch("searchText", function(newValue, oldValue) {
        if (newValue !== undefined) {
            ApplicationState.addFilter({
                id: "searchText",
                filter: function(element) {
                    var reg = new RegExp(newValue, "i");
                    if (element.name.search(reg) === -1) {
                        element.hide();
                    }
                }
            });
        }
    });
}

TitleBarCtrl.$inject = ['$scope', 'Commander', 'ApplicationState'];