'use strict';

/**
 * TODO:
 * throw exceptions
 * fix field ids based on text
 *
 * deep-linking -- USE
 *
 * velocity scrolling for timeline
 *
 * error with re-creating anytime picker
 * make sure that dragging event cannot cross over line of visibility
 * overview timeline
 * COMPLETE delete type
 * delete field
 * fluid transitions in timeline
 * zoom with scroll wheel
 * responsive animations with drag-n-drop
 * drag-n-drop aspects into timeline
 * show local values when scrolling timeline
 *
 * make sure filters are accurate
 *
 * alert popup
 *
 */

angular.module('yugaAdmin', ['Command'])

    .config(function ($routeProvider) {
        $routeProvider
        .otherwise({
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
        });
    })

    .run(function($rootScope, ApplicationEvents) {
        $rootScope.resourceBundle = function() {
            return yuga.ResourceBundle;
        };

        $rootScope.confirm = function(args) {
            ApplicationEvents.broadcast(ApplicationEvents.LAUNCH_CONFIRM_MODAL, args);
        };
    });
