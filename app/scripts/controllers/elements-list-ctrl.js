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

    $scope.newEvent = function() {
        alert("new event")
    };

    $scope.newAspect = function() {
        alert("new aspect")
    };

    $scope.newType = function() {
        alert("new type")
    };
}

ElementsListCtrl.$inject = ['$scope', 'ApplicationState'];