function OpenTimelineModalCtrl($scope, Timeline) {
    $scope.timelines = [];


    function loadTimelines() {
        var timelinesPromise = Timeline.query();

        timelinesPromise.then(function(timelines) {
            $scope.timelines = timelines;
        });
    }

    $scope.openTimeline = function(timelineId) {
        var timelineLoaded = Timeline.read(timelineId);
        timelineLoaded.then(function() {
            $scope.closeModal();
        })
    };

    loadTimelines();
}

OpenTimelineModalCtrl.$inject = ['$scope', 'Timeline'];