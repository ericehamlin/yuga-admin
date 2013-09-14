'use strict';

angular.module('yugaAdmin')
    .factory("ApplicationEvents", ['$rootScope', function($rootScope){
        return {
            broadcast : function() {
                $rootScope.$broadcast.apply($rootScope, arguments);
            },

            SELECTED_ELEMENT_CHANGED: "selectedElementChanged",
            ASPECT_ADDED_TO_EVENT: "aspectAddedToEvent"
        }
    }]);