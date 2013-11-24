'use strict';

/**
 * TODO:
 * respond to resized window
 * velocity scrolling
 * reconcile dates with timeline-produced data
 * error with re-creating anytime picker
 * drag edges of event
 * make sure that dragging event cannot cross over line of visibility
 * overview timeline
 * delete event, aspect, etc
 * delete field
 * fluid transitions in timeline
 * zoom with scroll wheel
 * responsive animations with drag-n-drop
 * drag-n-drop aspects into timeline
 * show local values when scrolling timeline
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

    .run(function($rootScope) {
        $rootScope.resourceBundle = function() {
            return yuga.ResourceBundle;
        };
    });
