'use strict';

angular.module('Command', [])
    .factory("Commander", ['ApplicationState', 'ApplicationEvents', function(ApplicationState, ApplicationEvents){

        return {
            execute: function(command) {
                command.execute(ApplicationState, ApplicationEvents);
            },

            unexecute: function(command) {

            },

            undo: function() {

            },

            redo: function() {

            }
        };
    }]);