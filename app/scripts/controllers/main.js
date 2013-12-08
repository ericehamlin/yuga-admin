'use strict';

angular.module('yugaAdmin')
  .controller('MainCtrl', function ($scope, $location, $route, ApplicationState, ApplicationEvents, Commander) {

        var lastRoute = $route.current;

        $scope.getBodyScreen = function() {
            if (!ApplicationState.timeline) {
                return 'views/body-no-timeline.html';
            }
            else {
                console.log("goo");
                return 'views/body.html';
            }
        };

        $scope.$on('$locationChangeSuccess', function(event) {
            $route.current = lastRoute;
        });

  });
