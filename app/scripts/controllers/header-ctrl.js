'use strict';

function HeaderCtrl($scope, ApplicationEvents, ApplicationState, Commander, Timeline) {

    $scope.canUndo = function() {
        return Commander.canUndo();
    };

    $scope.undoName = function() {
        var command = Commander.getUndoCommand();
        return command ? command.name : "";
    };

    $scope.undo = function() {
        Commander.undo();
    };

    $scope.canRedo = function() {
        return Commander.canRedo();
    };

    $scope.redoName = function() {
        var command = Commander.getRedoCommand();
        return command ? command.name : "";
    };

    $scope.redo = function() {
        Commander.redo();
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

    $scope.newTimeline = function() {
        var timelinePromise =  Timeline.create();
        timelinePromise.then(function(result){
            ApplicationState.timeline = yuga.Timeline.deserialize(result.data);
            ApplicationEvents.broadcast(ApplicationEvents.NEW_TIMELINE);
        });
    };
}

HeaderCtrl.$inject = ['$scope', 'ApplicationEvents', 'ApplicationState', 'Commander', 'Timeline'];