'use strict';

angular.module('Command', [])
    .factory("Commander", ['ApplicationState', 'ApplicationEvents', function(ApplicationState, ApplicationEvents){

        var commandStack = [];
        var commandStackIndex = 0;

        function execute(command) {
            command.execute(ApplicationState, ApplicationEvents, Commander);
            // TODO: move to individual commands, try to figure out how to check shallow copies
            // also, maybe different events for modifying timeline data and display
            ApplicationEvents.broadcast(ApplicationEvents.TIMELINE_MODIFIED);
        }

        function unexecute(command) {
            command.unexecute(ApplicationState, ApplicationEvents, Commander);
            // TODO: move to individual commands, try to figure out how to check shallow copies
            ApplicationEvents.broadcast(ApplicationEvents.TIMELINE_MODIFIED);
        }

        var Commander =  {
            execute: function(command) {
                execute(command);
                if (command.isUndoable) {
                    commandStack[commandStackIndex] = command;
                    commandStackIndex++;
                    commandStack.length = commandStackIndex;
                }
            },

            canUndo: function() {
                return commandStackIndex > 0;
            },

            getUndoCommand: function() {
                if (this.canUndo()) {
                    return commandStack[commandStackIndex-1];
                }
                return null;
            },

            undo: function() {
                if (this.canUndo()) {
                    unexecute(this.getUndoCommand());
                    commandStackIndex--;
                } else {
                    console.log("COULD NOT UNDO")
                }
            },

            canRedo: function() {
                return commandStackIndex < commandStack.length;
            },

            getRedoCommand: function() {
                if (this.canRedo()) {
                    return commandStack[commandStackIndex];
                }
                return null;
            },

            redo: function() {
                if (this.canRedo()) {
                    execute(this.getRedoCommand());
                    commandStackIndex++;
                }
            }
        };

        return Commander;
    }]);