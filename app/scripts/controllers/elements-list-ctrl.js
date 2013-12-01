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

    $scope.cloneEvent = function(event) {
        var command = new yuga.CloneEventCommand(event);
        Commander.execute(command);
    };

    $scope.deleteEvent = function(event) {
        $scope.confirm({
            message: "Are you sure you want to delete this Event?",
            confirmFunction: function() {
                var command = new yuga.DeleteEventCommand(event);
                Commander.execute(command);
            }
        });
    };


    /** ASPECTS */

    $scope.newAspect = function() {
        var command = new yuga.NewAspectCommand();
        Commander.execute(command);
    };

    $scope.isAspectSelected = function() {
        return ApplicationState.selectedElement instanceof yuga.Aspect;
    };

    $scope.getSelectedAspect = function() {
        if (!$scope.isAspectSelected()) {
            return null;
        }
        return ApplicationState.selectedElement;
    };

    $scope.deleteSelectedAspect = function() {
        var aspect = $scope.getSelectedAspect();
        $scope.deleteAspect(aspect);
    };

    $scope.cloneAspect = function(aspect) {
        var command = new yuga.CloneAspectCommand(aspect);
        Commander.execute(command);
    };

    $scope.deleteAspect = function(aspect) {
        $scope.confirm({
            message: "Are you sure you want to delete this Aspect?",
            confirmFunction: function() {
                var command = new yuga.DeleteAspectCommand(aspect);
                Commander.execute(command);
            }
        });
    };


    /** TYPES */

    $scope.newType = function() {
        var command = new yuga.NewTypeCommand();
        Commander.execute(command);
    };

    $scope.isTypeSelected = function() {
        return ApplicationState.selectedElement instanceof yuga.Type;
    };

    $scope.getSelectedType = function() {
        if (!$scope.isTypeSelected()) {
            return null;
        }
        return ApplicationState.selectedElement;
    };

    $scope.deleteSelectedType = function() {
        var type = $scope.getSelectedType();
        $scope.deleteType(type);
    };

    $scope.cloneType = function(type) {
        var command = new yuga.CloneTypeCommand(type);
        Commander.execute(command);
    };

    $scope.deleteType = function(type) {
        $scope.confirm({
            message: "Are you sure you want to delete this Type?",
            confirmFunction: function() {
                var command = new yuga.DeleteTypeCommand(type);
                Commander.execute(command);
            }
        });

    };
}

ElementsListCtrl.$inject = ['$scope', 'ApplicationState', 'Commander'];