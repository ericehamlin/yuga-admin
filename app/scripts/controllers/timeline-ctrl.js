'use strict';

function TimelineCtrl($scope, $timeout, ApplicationEvents, ApplicationState) {
    $scope.$on(ApplicationEvents.TIMELINE_MODIFIED, function() {
    });

    var widget;

    $timeout(function() {
        widget = new timelineWidget("timeline-widget", ApplicationState.timeline);
    });


    $scope.zoomIn = function() {
        widget.zoomBy(1);
    };

    $scope.zoomOut = function() {
        widget.zoomBy(-1);
    };

    /** HTML VERSION */

    function timelineWidget(id, timelineData) {
        var widget = document.getElementById(id);
        var all,
            dragGrab,
            ticks,
            timeDisplay,
            pixelToTimeUnitRatio,
            timelineWindowWidth = $(widget).width(),
            centerPointTime,
            margin = 2000,
            maxTime,
            minTime,

            beginningCenterPointTime,
            drawBeginningTime,
            drawEndTime
            ;

        init();

        /**
         * @param zoomDelta
         */
        this.zoomBy = function(zoomDelta) {
            beginningCenterPointTime = centerPointTime;
            pixelToTimeUnitRatio *= Math.pow(1.5, zoomDelta);
            drawBeginningTime = centerPointTime - convertPixelsToTimeUnits((timelineWindowWidth/2) + margin);
            drawEndTime = centerPointTime + convertPixelsToTimeUnits((timelineWindowWidth/2) + margin);
            redraw();
            positionCenter();

        };

        function init() {
            dragGrab = document.createElement("div");
            dragGrab.setAttribute("style", "width:100%; height:100%; z-index: 2; position:absolute;");
            widget.appendChild(dragGrab);

            all = document.createElement("div");
            all.setAttribute("style", "position:absolute; height:100%; z-index: 3;");
            widget.appendChild(all);

            ticks = document.createElement("div");
            ticks.setAttribute("style", "position:absolute; height:45px; bottom:0px;");
            all.appendChild(ticks);

            timeDisplay = document.createElement("div");
            timeDisplay.setAttribute("style", "position:absolute; height:45px; bottom:0px;");
            widget.appendChild(timeDisplay);

            var $centerLine = $("<div/>").
                css({width: "1px", position: "absolute", "background-color": "#000", height: "100%", left: (timelineWindowWidth/2) + "px"});

            $(widget).append($centerLine);

            maxTime = timelineData.getLatestEventTime();
            minTime = timelineData.getEarliestEventTime();

            pixelToTimeUnitRatio =  (timelineWindowWidth + (2500 * margin))/(maxTime - minTime);
            centerPointTime = (maxTime + minTime) / 2;
            beginningCenterPointTime = centerPointTime;


            drawBeginningTime = centerPointTime - convertPixelsToTimeUnits((timelineWindowWidth/2) + margin);
            drawEndTime = centerPointTime + convertPixelsToTimeUnits((timelineWindowWidth/2) + margin);

            positionCenter();
            updateTimelineGroup();
        }

        /**
         *
         */
        function updateTimelineGroup() {
            //pixelToTimeUnitRatio = calculatePixelsToTimeUnitRatio();
            drawTickMarks();
            drawEvents();
        }

        function positionCenter() {
            $(all).css("left", (timelineWindowWidth / 2) + "px");
        }

        function getScale() {
            var scale;

            if (pixelToTimeUnitRatio > 0.00001) { // 0.000013460840841860077 // labeled hours
                scale = {
                    initialize: {hour: 0, minute: 0, second: 0},
                    tick : {
                        format: "MMM d, yyyy",
                        add: {days: 1}
                    },
                    subTick : {
                        format: "h:mmtt",
                        add: {hours: 1} // why doesn't this work on webkit?
                    }
                };

            }
            else if (pixelToTimeUnitRatio > 0.000001) { //0.0000033652102104650194
                scale = {
                    initialize: {hour: 0, minute: 0, second: 0},
                    tick : {
                        format: "MMM d, yyyy",
                        add: {days: 1}
                    },
                    subTick : {
                        format: "",
                        add: {hours: 1} // why doesn't this work on webkit?
                    }
                };
            }
            else if (pixelToTimeUnitRatio > 0.0000003) { //8.413025526162548e-7
                scale = {
                    initialize: {day: 1, hour: 0, minute: 0, second: 0},
                    tick : {
                        format: "MMMM, yyyy",
                        add: {months: 1}
                    },
                    subTick : {
                        format: "ddd d",
                        add: {days: 1}
                    }
                };
            }
            else if (pixelToTimeUnitRatio > 0.00000005) {
                scale = {
                    initialize: {day: 1, hour: 0, minute: 0, second: 0},
                    tick : {
                        format: "MMMM, yyyy",
                        add: {months: 1}
                    },
                    subTick : {
                        format: "",
                        add: {days: 1}
                    }
                };
            }
            else {
                scale = {
                    initialize: {month: 0, day: 1, hour: 0, minute: 0, second: 0},
                    tick : {
                        format: "yyyy",
                        add: {years: 1}
                    },
                    subTick : {
                        format: "MMM",
                        add: {months: 1}
                    }
                };
            }

            return scale;
        }

        /**
         *
         */
        function drawTickMarks() {
            var scale = getScale();

            var drawBeginningDate = new Date(drawBeginningTime);
            drawBeginningDate.set(scale.initialize);

            var leftPixels, widthPixels;

            while (drawBeginningDate.getTime() < drawEndTime) {
                var beginTickTime = drawBeginningDate.getTime();
                var tickLabel = drawBeginningDate.toString(scale.tick.format);
                leftPixels = convertTimeUnitsToPixels(beginTickTime - beginningCenterPointTime);
                var nextTickDate = drawBeginningDate.clone().add(scale.tick.add);
                widthPixels = convertTimeUnitsToPixels(nextTickDate.getTime() - beginTickTime);

                var $tick = $("<div/>").
                    addClass("tick").
                    css({left: leftPixels + "px", width: widthPixels + "px"}).
                    html(tickLabel);


                while (drawBeginningDate.getTime() <= nextTickDate.getTime()) {
                    var subTickLeftPixels = convertTimeUnitsToPixels(drawBeginningDate.getTime() - beginTickTime),
                        nextSubTickDate = drawBeginningDate.clone().add(scale.subTick.add),
                        subTickWidth = convertTimeUnitsToPixels(nextSubTickDate.getTime() - drawBeginningDate.getTime())
                        ;
                    var $subTick = $("<div/>").
                        addClass("sub-tick").
                        css({left: subTickLeftPixels +"px", width: subTickWidth + ""});
                    if (scale.subTick.format) {
                        $subTick.html(drawBeginningDate.toString(scale.subTick.format));
                    }
                    $tick.append($subTick);
                    drawBeginningDate.setTime(nextSubTickDate.getTime());
                }

                drawBeginningDate = nextTickDate;
                $(ticks).append($tick);
            }
        }

        function drawEvents() {
            for (var i=0; i<timelineData.events.length; i++) {
                timelineData.events[i].tempData.displayY = Math.round(Math.random() * 200);
                drawEvent(timelineData.events[i]);
            }
        }

        function drawEvent(event) {
            if (event.start && event.end) {
                var $eventDiv;
                if ($("#timeline-event-" + event.id).length == 0) {
                    var $eventDiv = $("<div/>");
                    $eventDiv.css({position: "absolute", height: "25px", "background-color": "#ff0000", "top": event.tempData.displayY+ "px"});
                    $eventDiv.attr("id", "timeline-event-" + event.id);
                }
                else {
                    $eventDiv = $("#timeline-event-" + event.id);
                }

                var left, right;

                left = event.getStartTimeUnits() > drawBeginningTime ? event.getStartTimeUnits() : drawBeginningTime;
                right = event.getEndTimeUnits() < drawEndTime ? event.getEndTimeUnits() : drawEndTime;

                if (drawBeginningTime <= right <= drawEndTime ||  drawBeginningTime <= left <= drawEndTime) {
                    $eventDiv.css({
                        left: convertTimeUnitsToPixels(left - beginningCenterPointTime) + "px",
                        width: convertTimeUnitsToPixels(right - left) + "px"
                    });

                    $eventDiv.html(event.name);
                    $(all).append($eventDiv);
                }
            }
        }

        /**
         *
         * @param {Number} pixels
         */
        function convertPixelsToTimeUnits(pixels) {
            return pixels / pixelToTimeUnitRatio;
        };

        /**
         *
         * @param {Number} timeUnits (most likely milliseconds)
         */
        function convertTimeUnitsToPixels(timeUnits) {
            return timeUnits * pixelToTimeUnitRatio;
        };

        /**
         *
         */
        function needsRedrawing() {
            return convertTimeUnitsToPixels(centerPointTime - drawBeginningTime) < timelineWindowWidth/2 ||
                   convertTimeUnitsToPixels(drawEndTime - centerPointTime) < timelineWindowWidth/2 ;
        }

        /**
         *
         */
        function redraw() {
            if (convertTimeUnitsToPixels(drawEndTime - centerPointTime) < timelineWindowWidth/2) {
                drawEndTime += convertPixelsToTimeUnits(margin);
                console.log("END TIME");
            }
            else if (convertTimeUnitsToPixels(centerPointTime - drawBeginningTime) < timelineWindowWidth/2) {
                drawBeginningTime -= convertPixelsToTimeUnits(margin);
                console.log("BEGINNING TIME");
            }
            drawEvents();
            drawTickMarks();
        }

        /**
         *
         * @param {Number} timeUnitsDelta
         */
        function moveByTime(timeUnitsDelta) {
        }

        /**
         *
         * @param {Number} pixelsDelta
         */
        function moveByPixels(pixelsDelta) {
            $(all).css("left", $(all).position().left+pixelsDelta);
            centerPointTime -= convertPixelsToTimeUnits(pixelsDelta);
        }

        dragGrab.addEventListener("mousedown", function(e) {
            var previousDragX,
                currentDragX = e.clientX;

            document.addEventListener("mouseup", onMouseUp);
            document.addEventListener("mousemove", onMouseMove);


            function onMouseMove(e) {
                previousDragX = currentDragX;
                currentDragX = e.clientX;

                moveByPixels(currentDragX - previousDragX);
                if (needsRedrawing()) {
                    redraw();
                }

                timeDisplay.innerHTML = new Date(centerPointTime);
            }

            function onMouseUp(e) {
                document.removeEventListener("mouseup", onMouseUp);
                document.removeEventListener("mousemove", onMouseMove);
            }
        });
    }


    /** SVG VERSION */
    function timeline(id, timelineData) {


        /**
         *
         * @param {String} type
         * @param {Object} attributes
         *
         * @returns {SVGElement}
         */
        function createSVGElement(type, attributes) {
            var element = document.createElementNS(SVGNamespace, type);
            for (var i in attributes) {
                element.setAttribute(i, attributes[i]);
            }
            return element;
        }

        /**
         *
         * @param {SVGElement} svgElement
         * @param {Number} x
         * @param {Number} y
         * @param {Boolean} replaceTransform
         */
        function translate(svgElement, x, y, replaceTransform) {
            var matrix = getTranslateMatrix(x,y);
            setTransformMatrix(svgElement, matrix, replaceTransform);
        }

        /**
         *
         * @param {Number} x
         * @param {Number} y
         *
         * @returns {Array}
         */
        function getTranslateMatrix(x, y) {
            return [1, 0, 0, 1, x, y];
        }

        /**
         *
         * @param {SVGElement} svgElement
         * @param {Number} degrees
         * @param {Boolean} replaceTransform
         */
        function rotate(svgElement, degrees, replaceTransform) {
            var matrix = getRotateMatrix(degrees);
            setTransformMatrix(svgElement, matrix, replaceTransform);
        }

        /**
         *
         * @param {Number} degrees
         *
         * @returns {Array}
         */
        function getRotateMatrix(degrees) {
            return [Math.cos(degrees), Math.sin(degrees), -Math.sin(degrees), Math.cos(degrees), 0, 0];
        }

        /**
         *
         * @param {SVGElement} svgElement
         * @param {Number} x
         * @param {Number} y
         * @param {Boolean} replaceTransform
         */
        function scale(svgElement, x, y, replaceTransform) {
            var matrix = getScaleMatrix(x,y);
            setTransformMatrix(svgElement, matrix, replaceTransform);
        }

        /**
         *
         * @param {Number} x
         * @param {Number} y
         *
         * @returns {Array}
         */
        function getScaleMatrix(x, y) {
            return [x, 0, 0, y, 0, 0];
        }

        /**
         *
         * @param {SVGElement} svgElement
         * @param {Number} x
         * @param {Number} y
         * @param {Boolean} replaceTransform
         */
        function skew(svgElement, x, y, replaceTransform) {
            var matrix = getSkewMatrix(x,y);
            setTransformMatrix(svgElement, matrix, replaceTransform);
        }

        /**
         * TODO: this
         *
         * @param x
         * @param y
         */
        function getSkewMatrix(x, y) {

        }

        /**
         *
         * @param svgElement
         * @param matrix
         * @param replaceTransform
         */
        function matrix(svgElement, matrix, replaceTransform) {
            setTransformMatrix(svgElement, matrix, replaceTransform);
        }


        /**
         * [  a0  a2  a4 ]     [  b0  b2  b4 ]      [  (a0*b0)+(a2*b1)  (a0*b2)+(a2*b3)  (a0*b4)+(a2*b5)+a4  ]
         * [  a1  a3  a5 ]  *  [  b1  b3  b5 ]  =   [  (a1*b0)+(a3*b1)  (a1*b2)+(a3*b3)  (a1*b4)+(a3*b5)+a5  ]
         * [  0   0   1  ]     [  0   0   1  ]      [         0                0                    1        ]
         *
         * @param {Array} matrixA
         * @param {Array} matrixB
         *
         * @returns {Array}
         */
        function multiplyMatrices(matrixA, matrixB) {

            var resultMatrix = [];
            resultMatrix[0] = (matrixA[0] * matrixB[0]) + (matrixA[2] * matrixB[1]);
            resultMatrix[1] = (matrixA[1] * matrixB[0]) + (matrixA[3] * matrixB[1]);
            resultMatrix[2] = (matrixA[0] * matrixB[2]) + (matrixA[2] * matrixB[3]);
            resultMatrix[3] = (matrixA[1] * matrixB[2]) + (matrixA[3] * matrixB[3]);
            resultMatrix[4] = (matrixA[0] * matrixB[4]) + (matrixA[2] * matrixB[5]) + matrixA[4];
            resultMatrix[5] = (matrixA[1] * matrixB[4]) + (matrixA[3] * matrixB[5]) + matrixA[5];

            return resultMatrix;
        }

        /**
         *
         * @param {SVGElement} svgElement
         * @param {Array} matrix
         *
         * @returns {Array}
         */
        function calculateTransformMatrix(svgElement, matrix) {
            var matrices = [],
                resultMatrix = [],
                transform = svgElement.getAttribute("transform");

            if (transform) {
                var transforms = transform.trim().split(/\)\s*/g);

                transforms.length -= 1; // don't know why my regex creates a blank entry at the end

                if (transforms.length === 0) {
                    return matrix;
                }


                for (var i=0; i<transforms.length; i++) {
                    matrices[i] = parseTransformString(transforms[i]);
                }
            }

            matrices.push(matrix);

            resultMatrix = matrices[0];
            for (var i=1; i<matrices.length; i++) {
                resultMatrix = multiplyMatrices(resultMatrix, matrices[i]);
            }
            return resultMatrix;
        }

        /**
         *
         * @param {String} transformString
         *
         * @returns {Array}
         */
        function parseTransformString(transformString) {
            var values, matrix;

            if (transformString.match(/translate/i)){
                transformString = transformString.replace(/translate\s*\(\s*/i, "");
                values = transformString.trim().split(/\s*,\s*/);
                matrix = getTranslateMatrix(parseFloat(values[0]), parseFloat(values[1]));
                console.log("TRANSLATE!", matrix);
            }

            else if (transformString.match(/rotate/i)) {
                transformString = transformString.replace(/rotate\s*\(\s*/i, "");
                values = transformString.trim().split(/\s*,\s*/);
                matrix = getRotateMatrix(parseFloat(values[0]));
                console.log("ROTATE!", matrix);
            }

            else if (transformString.match(/scale/i)) {
                transformString = transformString.replace(/scale\s*\(\s*/i, "");
                values = transformString.trim().split(/\s*,\s*/);
                matrix = getScaleMatrix(parseFloat(values[0]), parseFloat(values[1]));
                console.log("SCALE!", matrix);
            }

            else if (transformString.match(/matrix/i)) {
                transformString = transformString.replace(/matrix\s*\(\s*/i, "");
                values = transformString.trim().split(/\s*,\s*/);
                matrix = [parseFloat(values[0]), parseFloat(values[1]), parseFloat(values[2]), parseFloat(values[3]), parseFloat(values[4]), parseFloat(values[5])];
                console.log("MATRIX!", matrix);
            }

            // todo skew
            return matrix;
        }


        /**
         *
         * @param {SVGElement} svgElement
         * @param {Array} matrix
         * @param {Boolean} replaceTransform
         */
        function setTransformMatrix(svgElement, matrix, replaceTransform) {
            if (replaceTransform) {
                svgElement.setAttribute("transform", "matrix(" + matrix.join(",") + ")");
            }
            else {
                var calculatedMatrix = calculateTransformMatrix(svgElement, matrix);
                svgElement.setAttribute("transform", "matrix(" + calculatedMatrix.join(",") + ")");
            }
        }
    }
}

TimelineCtrl.$inject = ['$scope', '$timeout', 'ApplicationEvents', 'ApplicationState'];