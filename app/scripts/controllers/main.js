'use strict';

angular.module('yugaAdmin')
  .controller('MainCtrl', function ($scope, ApplicationState, ApplicationEvents, Commander) {

        var editScreen = 'views/edit-timeline.html';

        $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
            console.log("EVENT", $event);
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
                console.log(element);
            }
            console.log(ApplicationState);
        });

        $scope.showEditScreen = function() {
            return editScreen;
        };

        $scope.undoName = function() {
            var command = Commander.getUndoCommand();
            return command ? command.name : "";
        };

        $scope.undo = function() {
            Commander.undo();
        };

        $scope.redoName = function() {
            var command = Commander.getRedoCommand();
            return command ? command.name : "";
        };

        $scope.redo = function() {
            Commander.redo();
        };

  });
