'use strict';

function ElementsListCtrl($scope, ApplicationState) {
    setTimeout(function(){
        $("#elements-list .section-body").accordion({
            header: "div.list-title",
            heightStyle: "fill",
            animate: {duration: 200}
        });
    }, 1000);

    $scope.events = ApplicationState.timeline.events;

    $scope.types = ApplicationState.timeline.types;

    $scope.aspects = ApplicationState.timeline.aspects;

    $scope.selectElement = function(element) {
        ApplicationState.selectElement(element);
    };

    $scope.isSelected = function(element) {
        return element === ApplicationState.selectedElement;
    };

    $scope.isSelectedSecondary = function(element) {
        return false;
    };
}

ElementsListCtrl.$inject = ['$scope', 'ApplicationState'];