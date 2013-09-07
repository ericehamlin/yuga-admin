'use strict';

angular.module('ResourceBundle', [])
    .factory('ResourceBundle', [function() {
        return {
            EVENTS:     "Events",
            TYPES:      "Types",
            ASPECTS:    "Aspects"
        };
    }]);