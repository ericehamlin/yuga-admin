function OpenTimelineModalCtrl($scope, Timeline) {
    $scope.timelines = [];

    var selectedTimelineId = undefined;

    function loadTimelines() {
        var timelinesPromise = Timeline.query();

        timelinesPromise.then(function(timelines) {
            $scope.timelines = timelines;
        });
    }

    $scope.isTimelineSelected = function(timelineId) {
        if (timelineId) {
            return selectedTimelineId == timelineId;
        }
        return selectedTimelineId;
    };

    $scope.selectTimeline = function(timelineId) {
        selectedTimelineId = timelineId;
    };

    $scope.openTimeline = function() {
        var timelineLoaded = Timeline.read(selectedTimelineId);
        timelineLoaded.then(function() {
            $scope.closeModal();
        })
    };

    loadTimelines();
}

OpenTimelineModalCtrl.$inject = ['$scope', 'Timeline'];