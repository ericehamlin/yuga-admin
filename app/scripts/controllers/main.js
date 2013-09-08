'use strict';

angular.module('yugaAdminApp')
  .controller('MainCtrl', function ($scope, ApplicationState) {

        var editScreen = 'views/edit-timeline.html';

        $scope.$on("selectedElementChanged", function($event, element){
            if (element == undefined || element.class == undefined) {
                editScreen = 'views/edit-timeline.html';
            } else {
                switch (element.class) {
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
            console.log(ApplicationState);
        });

        $scope.showEditScreen = function() {
            return editScreen;
        };

  });
