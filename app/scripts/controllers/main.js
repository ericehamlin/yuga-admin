'use strict';

angular.module('yugaAdmin')
  .controller('MainCtrl', function ($scope, ApplicationState) {


        $scope.getBodyScreen = function() {
            if (!ApplicationState.timeline) {
                return 'views/body-no-timeline.html';
            }
            else {
                return 'views/body.html';
            }
        };

  });
