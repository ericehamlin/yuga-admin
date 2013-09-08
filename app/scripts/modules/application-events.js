'use strict';

angular.module('yugaAdmin')
    .factory("ApplicationEvents", [function(){
        return {
            SELECTED_ELEMENT_CHANGED: "selectedElementChanged"
        }
    }]);