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

            undo: function() {
                if (commandStackIndex > 0) {
                    commandStackIndex--;
                    unexecute(commandStack[commandStackIndex]);
                } else {
                    console.log("COULD NOT UNDO")
                }
            },

            redo: function() {
                if (commandStackIndex < commandStack.length) {
                    execute(commandStack[commandStackIndex]);
                    commandStackIndex++;
                }
            }
        };
    }]);