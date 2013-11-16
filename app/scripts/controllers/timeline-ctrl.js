'use strict';

function TimelineCtrl($scope, $timeout, ApplicationEvents, ApplicationState, Commander) {

    var widget;

    $timeout(function() {
        widget = new timelineWidget("timeline-widget", ApplicationState.timeline);
        widget.addEventListener("selectEvent", function(args) {
            var command = new yuga.SelectElementCommand(args[0]);
            $scope.$apply(function() {
                Commander.execute(command);
            });
        });

        $scope.$on(ApplicationEvents.TIMELINE_MODIFIED, function() {
        });
    });


    $scope.zoomIn = function() {
        widget.zoomBy(1);
    };

    $scope.zoomOut = function() {
        widget.zoomBy(-1);
    };
}

TimelineCtrl.$inject = ['$scope', '$timeout', 'ApplicationEvents', 'ApplicationState', 'Commander'];