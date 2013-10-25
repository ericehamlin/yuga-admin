'use strict';

function TimelineCtrl($scope, $timeout, ApplicationEvents, ApplicationState) {
    $scope.$on(ApplicationEvents.TIMELINE_MODIFIED, function() {
    });

    $timeout(function() {
        timeline("timeline-widget", ApplicationState.timeline);
    });

    function timeline(id, timelineData) {
        var SVGDocument = document.getElementById(id),
            SVGNamespace = "http://www.w3.org/2000/svg",
            all,
            dragGrab,
            minTime,
            maxTime,
            timelineWindowWidth = SVGDocument.parentNode.clientWidth,
            viewableAreaRatio
            ;

        init();

        function init() {
            dragGrab = createSVGElement("rect", {
                id: "drag-grab",
                height: "100%",
                width: "100%",
                x: "0",
                y: "0",
                fill: "#ffff00"
            });
            SVGDocument.appendChild(dragGrab);

            all = createSVGElement("g", {
                id: "all"
            });
            SVGDocument.appendChild(all);

            updateTimelineGroup();
        }

        /**
         *
         */
        function updateTimelineGroup() {
            emptySVGElement(all);
            drawTickMarks();
        }

        function getTimeRange() {
            var minDate = new Date(1968, 3, 4, 1, 1, 3, 0);
            var maxDate  = new Date(2013, 3, 4, 1, 1, 3, 0);
            minTime = minDate.getTime();
            maxTime = maxDate.getTime();

            return maxTime - minTime;
        }

        function calculateViewableAreaRatio() {
            var minViewableDate = new Date(1969, 3, 4, 1, 1, 3, 0);
            var maxViewableDate = new Date(2010, 3, 4, 1, 1, 3, 0);

            var minViewableTime = minViewableDate.getTime();
            var maxViewableTime = maxViewableDate.getTime();

            var viewableWidth = maxViewableTime - minViewableTime;

            var ratio = timelineWindowWidth/viewableWidth;
            return ratio;


/*
            var pixelToSecond = timelineWindowWidth/(maxViewableTime-minViewableTime);

            return pixelToSecond;

            var pixelDistanceForTick = 20;
            if (pixelToSecond > pixelDistanceForTick) {
                console.log("show seconds")
            }
            else if (pixelToSecond > (pixelDistanceForTick/60) ) {
                console.log("show minutes")
            }
            else if (pixelToSecond > (pixelDistanceForTick/(60 * 60)) ) {
                console.log("show hours")
            }
            else if (pixelToSecond > (pixelDistanceForTick/(60 * 60 * 24)) ) {
                console.log("show days")
            }
            else if (pixelToSecond > (pixelDistanceForTick/(60 * 60 * 24 * 30)) ) {
                console.log("show months")
            }
            else if (pixelToSecond > (pixelDistanceForTick/(60 * 60 * 24 * 365)) ) {
                console.log("show years")
            }
            var totalWidth = (maxTime-minTime) * pixelToSecond;
            return totalWidth;
            */
        }

        /**
         *
         */
        function drawTickMarks() {
            var ticks = createSVGElement("g", {
                id: "ticks"
            });

            var totalPixelWidth = getTimeRange();

            // 8388607 is the greatest width that can be managed by Firefox --
            // due to floating-point representation (I believe)
            // so the plan is going to be -- what is the smallest, most precise unit of time we want to represent?
            // if milliseconds or seconds or minutes, it reduces the range of time we're able to represent.
            // we also need a conversion factor from unixtime seconds

            // 8388607 seconds ~= 2330 hours ~= 97 days ~= 3 months
            // 8388607 minutes ~= 139810 hours ~= 5825 days ~= 15 years
            // 8388607 hours ~= 349525 days ~= 957 years
            // 8388607 days ~= 22982 years

            // BUUUUT....
            // if the unit of time is seconds, we need more than one pixel width per second.
            // so these figures will be divided by whatever our maximum display width per unit is
            // i.e. if we can zoom down to 100px/sec, we can only fit 83886 seconds on our timeline ~= 24 hours

            //totalPixelWidth = 8388607;

            //totalPixelWidth = 100;
            //viewableAreaRatio = 100;

            var tickmarks = createSVGElement("rect", {
                x: "0",
                y: "0",
                width: totalPixelWidth,
                height: "110",
                fill: "#ff00ff"
            });

            var tickmark1 = createSVGElement("line", {
                x1: 20,
                y1: 0,
                x2: 20,
                y2: 100,
                stroke: "#ff0000",
                "vector-effect": "non-scaling-stroke",
                "stroke-width": "1px"
            });
            ticks.appendChild(tickmarks);
            ticks.appendChild(tickmark1);

            //viewableAreaRatio = calculateViewableAreaRatio();

            // greatest size calculation that can be managed by Firefox
            // maybe switch only at scale thresholds?
            // totalPixelWidth = 10000000;
             viewableAreaRatio = 0.00001;
            all.appendChild(ticks);
            scale(all, viewableAreaRatio, 1, true);
        }

        /**
         *
         * @param {SVGElement} element
         */
        function emptySVGElement(element) {
            while (element.childNodes.length > 0) {
                element.removeChild(all.childNodes[0])
            }
        }

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

        dragGrab.addEventListener("mousedown", function(e) {
            var previousDragX,
                currentDragX = e.clientX;

            document.addEventListener("mouseup", onMouseUp);

            document.addEventListener("mousemove", onMouseMove);


            function onMouseMove(e) {
                previousDragX = currentDragX;
                currentDragX = e.clientX;

                console.log(viewableAreaRatio);
                translate(all, (currentDragX - previousDragX) / viewableAreaRatio, 0);
                //translate(all, currentDragX - previousDragX, 0);
            }

            function onMouseUp(e) {
                document.removeEventListener("mouseup", onMouseUp);
                document.removeEventListener("mousemove", onMouseMove);
            }
        });
    }
}

TimelineCtrl.$inject = ['$scope', '$timeout', 'ApplicationEvents', 'ApplicationState'];