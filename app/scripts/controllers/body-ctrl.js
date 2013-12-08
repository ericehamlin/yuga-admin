function BodyCtrl($scope, $location, ApplicationEvents) {
    var editScreen;
    setEditScreen();


    function setEditScreen() {
        var path = $location.path();
        if (path.indexOf("/aspect/") > -1) {
            editScreen = 'views/edit-aspect.html';
        }
        else if (path.indexOf("/event/") > -1) {
            editScreen = 'views/edit-event.html';
        }
        else if (path.indexOf("/type/") > -1) {
            editScreen = 'views/edit-type.html';
        }
        else {
            editScreen = 'views/edit-timeline.html'
        }
    }

    $scope.$on('$locationChangeSuccess', function(event) {
        setEditScreen();
    });


    $scope.showEditScreen = function() {
        return editScreen;
    };
}