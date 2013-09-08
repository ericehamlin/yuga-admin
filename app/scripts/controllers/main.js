'use strict';

angular.module('yugaAdmin')
  .controller('MainCtrl', function ($scope, ApplicationState, ApplicationEvents) {

        var editScreen = 'views/edit-timeline.html';

        $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
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
