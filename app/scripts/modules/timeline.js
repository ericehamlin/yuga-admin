'use strict';

angular.module('yugaAdmin').

    factory("Timeline", ["$http", "$q", "$timeout", "ApplicationEvents", "ApplicationState", function($http, $q, $timeout, ApplicationEvents, ApplicationState) {

        // TODO
        var timelineId = 34;

        /**
         *
         * @param successCallback
         */
        function setSuccessCallback(successCallback) {
            if (!successCallback) {
                successCallback = function(e) {
                    console.log(e)
                };
            }
            return successCallback;
        }

        /**
         *
         * @param errorCallback
         */
        function setErrorCallback(errorCallback) {
            if (!errorCallback) {
                errorCallback = function(e) {
                    console.log(e)
                };
            }
            return errorCallback;
        }

        /**
         *
         * @param successCallback
         * @param errorCallback
         */
        function getNextTimelineId(successCallback, errorCallback) {
            return timelineId++;
        }


        return {

            /**
             *
             * @param successCallback
             * @param errorCallback
             *
             * @returns {Promise}
             */
            "create" : function(successCallback, errorCallback) {
                successCallback = setSuccessCallback(successCallback);
                errorCallback = setErrorCallback(errorCallback);

                var loadData = $http.get('/json/default-timeline.json').
                    success(successCallback).
                    error(errorCallback);

                var deferredTimeline = $q.defer();

                loadData.then(function(result){
                    var timeline = yuga.Timeline.deserialize(result.data);
                    timeline.id = getNextTimelineId();

                    // TODO -- this is probably not the right place for these next 2 lines
                    ApplicationState.setTimeline(timeline);
                    ApplicationEvents.broadcast(ApplicationEvents.TIMELINE_CHANGED);

                    deferredTimeline.resolve(timeline);
                });

                return deferredTimeline.promise;
            },

            /**
             *
             * @param timelineId
             * @param successCallback
             * @param errorCallback
             */
            "read" : function(timelineId, successCallback, errorCallback) {
                successCallback = setSuccessCallback(successCallback);
                errorCallback = setErrorCallback(errorCallback);

                var deferredTimeline = $q.defer();
                var loadData = $http.get('/json/timeline-'+ timelineId + '.json').
                    success(successCallback).
                    error(errorCallback);

                loadData.then(function(result) {
                    var timeline = yuga.Timeline.deserialize(result.data);
                    timeline.id = getNextTimelineId();

                    // TODO -- this is probably not the right place for these next 2 lines
                    ApplicationState.setTimeline(timeline);
                    ApplicationEvents.broadcast(ApplicationEvents.TIMELINE_CHANGED);

                    deferredTimeline.resolve(timeline);
                });
                return deferredTimeline.promise;
            },

            /**
             *
             * @param timeline
             * @param successCallback
             * @param errorCallback
             */
            "update" : function(timeline, successCallback, errorCallback) {
                successCallback = setSuccessCallback(successCallback);
                errorCallback = setErrorCallback(errorCallback);
            },

            /**
             *
             * @param timelineId
             * @param successCallback
             * @param errorCallback
             */
            "delete" : function(timelineId, successCallback, errorCallback) {
                successCallback = setSuccessCallback(successCallback);
                errorCallback = setErrorCallback(errorCallback);
            },

            /**
             *
             * @param successCallback
             * @param errorCallback
             */
            "query" : function(successCallback, errorCallback) {
                successCallback = setSuccessCallback(successCallback);
                errorCallback = setErrorCallback(errorCallback);

                var deferredTimelineList = $q.defer();
                    /*
                    success(successCallback).
                    error(errorCallback)
                    */


                $timeout(function() {
                    deferredTimelineList.resolve([
                        {id: 20, name: "Hey This is my Timeline"},
                        {id: 21, name: "Lookee here"},
                        {id: 22, name: "Shooop"}
                    ]);
                });

                return deferredTimelineList.promise;
            },

            "getNextTimelineId" : getNextTimelineId
        };

    }]);