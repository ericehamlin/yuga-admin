'use strict';

function ElementsListCtrl($scope, ApplicationState, Commander) {

    $scope.events = ApplicationState.timeline.events;

    $scope.types = ApplicationState.timeline.types;

    $scope.aspects = ApplicationState.timeline.aspects;

    $scope.sortEvents = "start";
    $scope.sortEventsReverse = false;

    $scope.selectElement = function(element) {
        var command = new yuga.SelectElementCommand(element);
        Commander.execute(command);
    };

    $scope.newEvent = function() {
        var command = new yuga.NewEventCommand();
        Commander.execute(command);
    };

    $scope.newAspect = function() {
        var command = new yuga.NewAspectCommand();
        Commander.execute(command);
    };

    $scope.newType = function() {
        var command = new yuga.NewTypeCommand();
        Commander.execute(command);
    };
}

ElementsListCtrl.$inject = ['$scope', 'ApplicationState', 'Commander'];