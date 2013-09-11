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
                console.log(element)
                element.addEventListener('dragenter', handleDragEnter, false);
                element.addEventListener('dragover', handleDragOver, false);
                element.addEventListener('dragleave', handleDragLeave, false);
                element.addEventListener('drop', handleDrop, false);
            }
        }
    })

;