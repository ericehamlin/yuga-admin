'use strict';

angular.module('yugaAdmin')
  .controller('MainCtrl', function ($scope, $location, $route, ApplicationState, ApplicationEvents, Commander) {

        var editScreen = 'views/edit-timeline.html';
        var lastRoute = $route.current;

        // TODO base this on location rather than events
        $scope.$on(ApplicationEvents.SELECTED_ELEMENT_CHANGED, function($event, element){
            if (element == undefined) {
                editScreen = 'views/edit-timeline.html';
            } else {
                if (element instanceof yuga.Aspect) {
                    $location.path("/aspect/" + element.id);
                        editScreen = 'views/edit-aspect.html';
                } else if (element instanceof yuga.Type) {
                    $location.path("/type/" + element.id);
                    editScreen = 'views/edit-type.html';
                } else if (element instanceof yuga.Event) {
                    $location.path("/event/" + element.id);
                    editScreen = 'views/edit-event.html';
                }
            }
        });

        $scope.showEditScreen = function() {
            return editScreen;
        };

        $scope.$on('$locationChangeSuccess', function(event) {
            $route.current = lastRoute;
        });

  });
