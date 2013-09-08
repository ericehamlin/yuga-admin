'use strict';

angular.module('Command', [])
    .factory("Commander", [function(){
        return {
            execute: function(command) {

            },

            unexecute: function(command) {

            },

            undo: function() {

            },

            redo: function() {

            }
        };
    }])

    .factory("Commands", [function() {
        return {

        }
    }]);