'use strict';

function TitleBarCtrl($scope, Commander, ApplicationState) {

    $scope.filters = ApplicationState.filters;

    $scope.addFilter = function(id) {
        var filterElement = ApplicationState.timeline.getElementById(id);
        var filter;
        if (filterElement instanceof yuga.Event) {
            filter = {
                filter: function(element) {
                    if (element instanceof yuga.Event) {
                        if (filterElement !== element) {
                            element.hide();
                        }
                    } else if (element instanceof yuga.Type) {

                    } else if (element instanceof yuga.Aspect) {
                        if (!filterElement.containsAspect(element)) {
                            element.hide();
                        }
                    }
                }
            };
        } else if (filterElement instanceof yuga.Type) {
            filter = {
                filter: function(element) {

                }
            };
        } else if (filterElement instanceof yuga.Aspect) {
            filter = {
                filter: function(element) {

                }
            };
        }

        $scope.$apply(function() {
            //TODO make this a command
            ApplicationState.addFilter(filter);
        });
    };

    $scope.removeFilter = function(filterId) {
        //TODO make this a command
        ApplicationState.removeFilter(filterId);
    };

    $scope.$watch("searchText", function(newValue, oldValue) {
        if (newValue !== undefined) {

            //TODO make this a command
            ApplicationState.addFilter({
                id: "searchText",
                filter: function(element) {
                    var reg = new RegExp(newValue, "i");
                    if (element.name.search(reg) === -1) {
                        element.hide();
                    }
                }
            });
        }
    });
}

TitleBarCtrl.$inject = ['$scope', 'Commander', 'ApplicationState'];