'use strict';

angular.module('yugaAdmin')
  .controller('MainCtrl', function ($scope, ApplicationState, ApplicationEvents, Commander) {

        var editScreen = 'views/edit-timeline.html';

        $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
            if (element == undefined) {
                editScreen = 'views/edit-timeline.html';
            } else {
                if (element instanceof yuga.Aspect) {
                    editScreen = 'views/edit-aspect.html';
                } else if (element instanceof yuga.Type) {
                    editScreen = 'views/edit-type.html';
                } else if (element instanceof yuga.Event) {
                    editScreen = 'views/edit-event.html';
                }
            }
        });

        $scope.showEditScreen = function() {
            return editScreen;
        };

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

  });
