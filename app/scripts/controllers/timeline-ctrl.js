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

        widget.addEventListener("changeEventProperty", function(args) {
            var event = args[0];
            var params = args[1];

            var command;
            if (params.start && params.end) {
                command = new yuga.ChangePropertiesCommand(event, {start: (new Date(params.start)).toString("yyyy-MM-dd hh:mm:ss"), end: (new Date(params.end)).toString("yyyy-MM-dd hh:mm:ss")});
            }
            else if (params.start) {
                command = new yuga.ChangePropertiesCommand(event, {start: (new Date(params.start)).toString("yyyy-MM-dd hh:mm:ss")});
            }
            else {
                command = new yuga.ChangePropertiesCommand(event, {end: (new Date(params.end)).toString("yyyy-MM-dd hh:mm:ss")});
            }
            $scope.$apply(function() {
                Commander.execute(command);
            });

        });

        $scope.$on(ApplicationEvents.TIMELINE_MODIFIED, function() {
            widget.redraw();
        });

        $scope.$on(ApplicationEvents.NEW_TIMELINE, function() {
            widget.setTimelineData(ApplicationState.timeline);
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