'use strict';

/**
 * TODO:
 * throw exceptions
 * fix field ids based on text
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

    .run(function($rootScope, $route, $location, ApplicationEvents, ApplicationState, Commander) {
        var lastRoute = $route.current;

        $rootScope.resourceBundle = function() {
            return yuga.ResourceBundle;
        };

        $rootScope.confirm = function(args) {
            ApplicationEvents.broadcast(ApplicationEvents.LAUNCH_CONFIRM_MODAL, args);
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
