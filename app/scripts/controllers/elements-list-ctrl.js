'use strict';

function ElementsListCtrl($scope, ApplicationState, Commander) {

    $scope.events = ApplicationState.timeline.events;

    $scope.types = ApplicationState.timeline.types;

    $scope.aspects = ApplicationState.timeline.aspects;

    $scope.sortEvents = "start";
    $scope.sortEventsReverse = false;
    $scope.sortTypes = "name";
    $scope.sortTypesReverse = false;

    $scope.selectElement = function(element) {
        var command = new yuga.SelectElementCommand(element);
        Commander.execute(command);
    };


    /** EVENTS */

    $scope.newEvent = function() {
        var command = new yuga.NewEventCommand();
        Commander.execute(command);
    };

    $scope.isEventSelected = function() {
        return ApplicationState.selectedElement instanceof yuga.Event;
    };

    $scope.getSelectedEvent = function() {
        if (!$scope.isEventSelected()) {
            return null;
        }
        return ApplicationState.selectedElement;
    };

    $scope.deleteSelectedEvent = function() {
        var event = $scope.getSelectedEvent();
        $scope.deleteEvent(event);
    };

    $scope.deleteEvent = function(event) {
        var command = new yuga.DeleteEventCommand(event);
        Commander.execute(command);
    };


    /** ASPECTS */

    $scope.newAspect = function() {
        var command = new yuga.NewAspectCommand();
        Commander.execute(command);
    };

    $scope.isAspectSelected = function() {
        return ApplicationState.selectedElement instanceof yuga.Aspect;
    };


    /** TYPES */

    $scope.newType = function() {
        var command = new yuga.NewTypeCommand();
        Commander.execute(command);
    };

    $scope.isTypeSelected = function() {
        return ApplicationState.selectedElement instanceof yuga.Type;
    };
}

ElementsListCtrl.$inject = ['$scope', 'ApplicationState', 'Commander'];