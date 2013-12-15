function OpenTimelineModalCtrl($scope, Timeline) {
    $scope.timelines = [];


    function loadTimelines() {
        var timelinesPromise = Timeline.query();

        timelinesPromise.then(function(timelines) {
            $scope.timelines = timelines;
        });
    }

    $scope.openTimeline = function(timelineId) {
        Timeline.read(timelineId);
    };

    loadTimelines();
}

OpenTimelineModalCtrl.$inject = ['$scope', 'Timeline'];