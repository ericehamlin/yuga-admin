'use strict';

function ElementsListCtrl($scope, ApplicationState, Commander) {

    $scope.events = ApplicationState.timeline.events;

    $scope.types = ApplicationState.timeline.types;

    $scope.aspects = ApplicationState.timeline.aspects;

    $scope.selectElement = function(element) {
        var command = new yuga.SelectElementCommand(element);
        Commander.execute(command);
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

ElementsListCtrl.$inject = ['$scope', 'ApplicationState', 'Commander'];