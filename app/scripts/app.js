'use strict';

/**
 * TODO:
 * throw exceptions
 * fix field ids based on text
 * deep-linking
 * velocity scrolling
 * error with re-creating anytime picker
 * make sure that dragging event cannot cross over line of visibility
 * overview timeline
 * COMPLETE delete event, aspect, etc
 * delete field
 * fluid transitions in timeline
 * zoom with scroll wheel
 * responsive animations with drag-n-drop
 * drag-n-drop aspects into timeline
 * show local values when scrolling timeline
 *
 * alert popup
 *
 */

angular.module('yugaAdmin', ['Command'])

    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
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
