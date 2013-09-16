'use strict';

var dragSrcEl = null;

angular.module('yugaAdmin')

    .directive('ygDraggable', function() {

        function handleDragStart(e) {

            var dragId = jQuery(this).data("yg-drag-id");
            dragSrcEl = this;
            e.dataTransfer.setData('text/plain', dragId);
            jQuery(this).addClass("dragging");
        }

        function handleDragEnd(e) {
            jQuery(this).removeClass("dragging");
            dragSrcEl = null;
        }

        return {
            restrict: 'A',
            replace: false,
            link: function(scope, iElement, iAttrs) {

                var element = iElement[0];
                element.addEventListener('dragstart', handleDragStart, false);
                element.addEventListener('dragend', handleDragEnd, false);
            }
        }
    })

    .directive("ygDropTarget", function() {

        function isAppropriateDropTarget(target) {
            var accept = jQuery(target).data("yg-drop-accept");

            return jQuery(dragSrcEl).filter(accept).length > 0;
        }

        function handleDragOver(e) {
            // if we can drop the current dragee here
            if (e.preventDefault && isAppropriateDropTarget(this)) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }
        }

        function handleDragEnter(e) {
            // if we can drop the current dragee here
            if (isAppropriateDropTarget(this)) {
                jQuery(this).addClass("drag-over");
            }
        }

        function handleDragLeave(e) {
            jQuery(this).removeClass("drag-over");
        }



        return {
            restrict:'E',
            replace: true,
            transclude: true,
            template: "<div ng-transclude></div>",
            scope: {
                ygDropCallback: "="
            },
            link: function (scope, iElement, iAttrs) {

                function handleDrop(e) {
                    if (e.stopPropagation) {
                        e.stopPropagation(); // Stops some browsers from redirecting.
                    }
                    jQuery(this).removeClass("drag-over");

                    // if we can drop the current dragee here
                    if (isAppropriateDropTarget(this)) {
                        scope.ygDropCallback(e.dataTransfer.getData('text/plain'));
                    }

                    return false;
                }

                var element = iElement[0];
                element.addEventListener('dragenter', handleDragEnter, false);
                element.addEventListener('dragover', handleDragOver, false);
                element.addEventListener('dragleave', handleDragLeave, false);
                element.addEventListener('drop', handleDrop, false);
            }
        }
    })

    .directive("ygDate", function() {
        return {
            restrict: "E",
            replace: true,
            template: "<input type='date'/>"
        }
    })

    .directive("ygDatetime", function() {
        return {
            restrict: "E",
            replace: true,
            template: "<input type='datetime'/>"
        }
    })

    .directive("ygModel", function($timeout, ApplicationState, ApplicationEvents, Commander) {

        return {
            restrict: "A",
            scope: {
                ygModel: "=",
                ygModelElement: "="
            },

            link: function(scope, iElement, iAttrs) {

                var wait;
                scope.property = iAttrs.ygModel.replace(/^.*?(\.|\[)/, "");

                $(iElement).on("change, keyup", function() {
                    $timeout.cancel(wait);

                    wait = $timeout(function() {
                        var newValue = $(iElement).val();
                        if (newValue != scope.ygModel) {
                            scope.executeCommand(newValue);
                        }
                        wait = null;
                    }, 500);
                });
            },

            controller: function($scope, $element, $attrs) {
                $scope.$watch("ygModel", function(newValue, oldValue) {
                    $element.val(newValue)
                });

                $scope.executeCommand = function(newValue) {
                    $scope.$apply(function(){
                        var command = new yuga.ChangePropertyCommand($scope.ygModelElement, $scope.property, $scope.ygModel, newValue);
                        Commander.execute(command);
                    });
                };
            }
        }
    })

    .directive("ygAccordion", function($timeout) {
        return {
            restrict: "A",
            replace: true,
            transclude: true,
            template: "<div ng-transclude></div>",
            scope: {
                ygAccordionRefresh: "="
            },
            link: function(scope, iElement, iAttrs) {

                var options = {
                    header: iAttrs.ygAccordionHeader,
                    animate: {duration: 100}
                };

                if (iAttrs.ygAccordionHeightStyle) {
                    options.heightStyle = iAttrs.ygAccordionHeightStyle;
                }

                $timeout(function(){
                    $(iElement).accordion(options);
                    scope.$watch('ygAccordionRefresh', function(newValue, oldValue) {
                        $(iElement).accordion('destroy');
                        $timeout(function() {
                            console.log(angular.version);
                            $(iElement).accordion(options);
                        });
                    });
                });
            }
        };
    })
;