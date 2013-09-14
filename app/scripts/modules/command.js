'use strict';

angular.module('Command', [])
    .factory("Commander", ['ApplicationState', 'ApplicationEvents', function(ApplicationState, ApplicationEvents){

        var commandStack = [];
        var commandStackIndex = 0;

        var execute = function(command) {
            command.execute(ApplicationState, ApplicationEvents);
        };

        var unexecute = function(command) {
            command.unexecute(ApplicationState, ApplicationEvents);
        };

        return {
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

            undo: function() {
                if (this.canUndo()) {
                    commandStackIndex--;
                    unexecute(commandStack[commandStackIndex]);
                } else {
                    console.log("COULD NOT UNDO")
                }
            },

            canRedo: function() {
                return commandStackIndex < commandStack.length;
            },

            redo: function() {
                if (this.canRedo()) {
                    execute(commandStack[commandStackIndex]);
                    commandStackIndex++;
                }
            }
        };
    }]);