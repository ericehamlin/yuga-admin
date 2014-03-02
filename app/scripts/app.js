'use strict';

/**
 * TODO:
 *
 * new field -- ids are only numbers?
 *
 *
 * icons missing from types/aspects
 *
 * insertion point in edit-in-place text -- perhaps change to contenteditable as shown at http://docs.angularjs.org/api/ng/type/ngModel.NgModelController -- instead of ngModel include ygModelObject
 *
 * throw exceptions
 *
 * error with re-creating anytime picker
 * make sure that dragging event cannot cross over line of visibility
 * overview timeline
 * COMPLETE delete type so that we check for "cascade" with aspects
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
 * !popup for loading timeline
 *
 * Modals module
 * start breaking views,controllers into sub-directories
 *
 * creating new element doesn't actually result in that element being selected
 *
 */

angular.module('yugaAdmin', ['Command', 'ngRoute'])

    .config(function ($routeProvider) {
        $routeProvider
        .otherwise({
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
        });
    })

    .run(function($rootScope, $route, $location, $sce, ApplicationEvents, ApplicationState, Commander) {
        var lastRoute = $route.current;

        $rootScope.resourceBundle = function() {
            return yuga.ResourceBundle;
        };

        $rootScope.confirm = function(args) {
            ApplicationEvents.broadcast(ApplicationEvents.LAUNCH_CONFIRM_MODAL, args);
        };

        $rootScope.trustAsHtml = function(html) {
            return $sce.trustAsHtml(html);
        };

        $rootScope.$on(ApplicationEvents.TIMELINE_CHANGED, function() {
            $location.path("/");
        });

        $rootScope.$on('$locationChangeSuccess', function(event) {
            if (!lastRoute) {
                lastRoute = $route.current;
                return;
            }

            $route.current = lastRoute;

            var path = $location.path(),
                id = path.replace(new RegExp("\/.*\/"), ""),
                command;
            if ( (new RegExp("\/aspect\/|\/event\/|\/type\/")).test(path) ) {
                var element = ApplicationState.timeline.getElementById(id);
                command = new yuga.SelectElementCommand(element);
                Commander.execute(command);
            }
        });
    });
