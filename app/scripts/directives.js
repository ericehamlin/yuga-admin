'use strict';

var dragSrcEl = null;

angular.module('yugaAdmin')

    .directive('ygDraggable', function() {


        function handleDragStart(e) {
            dragSrcEl = this;
            $(this).addClass("dragging");
        }

        function handleDragEnd(e) {
            $(this).removeClass("dragging");
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
            return true;
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

        function handleDrop(e) {
            if (e.stopPropagation) {
                e.stopPropagation(); // Stops some browsers from redirecting.
            }
            jQuery(this).removeClass("drag-over");

            // if we can drop the current dragee here
            if (isAppropriateDropTarget(this)) {
                //
            }

            return false;
        }

        return {
            restrict:'A',
            replace:false,
            link:function (scope, iElement, iAttrs) {
                var element = iElement[0];
                element.addEventListener('dragenter', handleDragEnter, false);
                element.addEventListener('dragover', handleDragOver, false);
                element.addEventListener('dragleave', handleDragLeave, false);
                element.addEventListener('drop', handleDrop, false);
            }
        }
    })

;