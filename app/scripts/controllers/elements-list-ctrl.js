'use strict';

function ElementsListCtrl($scope, ApplicationState, Commander) {
    setTimeout(function(){
        $("#elements-list .section-body").accordion({
            header: "div.list-title",
            heightStyle: "fill",
            animate: {duration: 200}
        });

    }, 1000);

    $scope.events = ApplicationState.timeline.events;

    $scope.types = ApplicationState.timeline.types;

    $scope.aspects = ApplicationState.timeline.aspects;

    $scope.selectElement = function(element) {
        var command = new yuga.SelectElementCommand(element);
        console.log("COMMAND", command);
        Commander.execute(command);
    };

    $scope.newEvent = function() {
        alert("new event")
    };

    $scope.newAspect = function() {
        alert("new aspect")
    };

    $scope.newType = function() {
        alert("new type")
    };
}

ElementsListCtrl.$inject = ['$scope', 'ApplicationState', 'Commander'];