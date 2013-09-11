'use strict';

angular.module('yugaAdmin')
  .controller('MainCtrl', function ($scope, ApplicationState, ApplicationEvents) {

        var editScreen = 'views/edit-timeline.html';

        $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
            if (element == undefined) {
                editScreen = 'views/edit-timeline.html';
            } else {
                if (element instanceof yuga.Aspect) {
                    editScreen = 'views/edit-aspect.html';
                } else if (element instanceof yuga.Type) {
                    editScreen = 'views/edit-type.html';
                } else if (element instanceof yuga.Event) {
                    editScreen = 'views/edit-event.html';
                }
                console.log(element);
            }
            console.log(ApplicationState);
        });

        $scope.showEditScreen = function() {
            return editScreen;
        };

  });
