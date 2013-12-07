'use strict';

angular.module('yugaAdmin')
    .factory("Timeline", ["$http", function($http) {
        return {
            create : function(successCallback, errorCallback) {
                if (!successCallback) {
                    successCallback = function(e) {
                        console.log(e)
                    };
                }
                if (!errorCallback) {
                    errorCallback = function() {
                        console.log(e);
                    };
                }

                var deferredTimeline = $http.get('/json/default-timeline.json').
                    success(successCallback).
                    error(errorCallback);

                return deferredTimeline;
            },

            read : function() {

            },

            update : function(timeline) {

            },

            /**
             * timelineId?
             * @param timeline
             */
            remove : function(timeline) {

            }
        };
    }]);