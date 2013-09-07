'use strict';

angular.module('yugaAdminApp')
  .controller('MainCtrl', function ($scope, $rootScope) {

        var editScreen = 'views/edit-timeline.html';

        $rootScope.$watch('selectedElement', function(newValue, oldValue){
            if (newValue == undefined || newValue.class == undefined) {
                editScreen = 'views/edit-timeline.html';
            } else {
                switch (newValue.class) {
                    case "yuga.Aspect":
                        editScreen = 'views/edit-aspect.html';
                        break;
                    case "yuga.Type":
                        editScreen = 'views/edit-type.html';
                        break;
                    default:
                        editScreen = 'views/edit-event.html';
                        break;
                }
            }
        });

        $scope.showEditScreen = function() {
            return editScreen;
        };

  });
