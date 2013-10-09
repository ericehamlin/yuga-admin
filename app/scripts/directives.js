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

    .directive("ygDate", function($timeout) {
        return {
            restrict: "A",
            link: function(scope, iElement, iAttrs) {
                $timeout(function() {
                    $(iElement).datepicker();
                });
            }
        }
    })

    .directive("ygDatetime", function() {
        return {
            restrict: "E",
            replace: true,
            template: "<input type='datetime'/>"
        }
    })

    .directive("ygModelObject", function($timeout, ApplicationState, ApplicationEvents, Commander) {

        return {
            restrict: "A",
            scope: {
                ygModelObject: "=",
                ygModelProperty: "@"
            },

            link: function(scope, iElement, iAttrs) {

                var wait,
                    poll,
                    oldValue = scope.ygModelObject.getProperty(scope.ygModelProperty);

                poll = setInterval(function() {
                    var newValue = $(iElement).val();
                    if (newValue != oldValue) {

                        oldValue = newValue;
                        $timeout.cancel(wait);

                        wait = $timeout(function() {

                            if (newValue != scope.ygModelObject.getProperty(scope.ygModelProperty)) {
                                scope.executeCommand(newValue);
                            }
                            wait = null;
                        }, 500);
                    }
                }, 50);

                scope.$on('$destroy', function() {
                    clearInterval(poll);
                })
            },

            controller: function($scope, $element, $attrs) {
                $scope.$watch(function($scope) { return $scope.ygModelObject.getProperty($scope.ygModelProperty)}, function(newValue, oldValue) {
                    $element.val(newValue)
                });

                $scope.executeCommand = function(newValue) {
                    $scope.$apply(function(){
                        var command = new yuga.ChangePropertyCommand($scope.ygModelObject, $scope.ygModelProperty, $scope.ygModelObject.getProperty($scope.ygModelProperty), newValue);
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
                            $(iElement).accordion(options);
                        });
                    });
                });
            }
        };
    })

    .directive("ygSortableHeader", function() {
        return {
            restrict: "A",
            replace: true,
            transclude: true,
            template: "<div ng-transclude></div>",
            scope: {
                ygSortReverse: "=",
                ygSortVar: "="
            },

            controller: function($scope, $element, $attrs) {

                this.getSortVar = function() {
                    return $scope.ygSortVar;
                };

                this.setSortVar = function(val) {
                    if (val === $scope.ygSortVar) {
                        $scope.ygSortReverse = $scope.ygSortReverse ? false : true;
                    }
                    $scope.ygSortVar = val;
                };

                this.getSortReverse = function() {
                    return $scope.ygSortReverse;
                };
            }
        };
    })


    .directive("ygSortable", function() {
        return {
            restrict: "E",
            require: "^ygSortableHeader",
            replace: true,
            transclude: true,
            template:   '<div ng-click="select()" ng-class="{asc: isAscending(), desc: isDescending()}" class="sortable"><span ng-transclude></span><i class="icon-caret-down"></i><i class="icon-caret-up"></i>' +
                        '</div>',
            scope: {
                ygSortProperty: "@"
            },
            link: function(scope, iElement, iAttrs, ygSortableHeaderCtrl) {
                scope.select = function() {
                    ygSortableHeaderCtrl.setSortVar(scope.ygSortProperty);
                }

                scope.isAscending = function() {
                    return ygSortableHeaderCtrl.getSortVar() === scope.ygSortProperty && !ygSortableHeaderCtrl.getSortReverse();
                };

                scope.isDescending = function() {
                    return ygSortableHeaderCtrl.getSortVar() === scope.ygSortProperty && ygSortableHeaderCtrl.getSortReverse();
                };
            }
        };
    })
;