'use strict';

angular.module('yugaAdmin')
    .factory("ApplicationEvents", ['$rootScope', function($rootScope){
        return {
            broadcast : function(event, args) {
                $rootScope.$broadcast(event, args);
            },

            SELECTED_ELEMENT_CHANGED: "selectedElementChanged"
        }
    }]);