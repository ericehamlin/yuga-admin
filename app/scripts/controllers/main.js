'use strict';

angular.module('yugaAdminApp')
  .controller('MainCtrl', function ($scope) {

        $scope.selectEditScreen = function() {
            return 'views/edit-timeline.html';
        };

  });
