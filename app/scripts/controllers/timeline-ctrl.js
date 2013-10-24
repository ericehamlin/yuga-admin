'use strict';

function TimelineCtrl($scope, $timeout, ApplicationEvents, ApplicationState) {
    $scope.$on(ApplicationEvents.TIMELINE_MODIFIED, function() {
    });

    $timeout(function() {
        timeline("timeline-widget", ApplicationState.timeline);
    }, 100);

    function timeline(id, timelineData) {
        var SVGDocument = document.getElementById(id),
            SVGNamespace = "http://www.w3.org/2000/svg",
            all,
            dragGrab,
            minTime,
            maxTime
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
                id: "all",
                height: "100%",
                width: "100%"
            });
            SVGDocument.appendChild(all);

            updateTimelineGroup();
        }

        /**
         *
         */
        function updateTimelineGroup() {
            emptySVGElement(all);
            getTimeRange();
            drawTickMarks();
        }

        function getTimeRange() {
            var minDate = new Date(1968, 3, 4, 1, 1, 3, 0);
            var maxDate  = new Date(2013, 3, 4, 1, 1, 3, 0);
            minTime = minDate.getTime();
            maxTime = maxDate.getTime();
        }

        /**
         *
         */
        function drawTickMarks() {
            var ticks = createSVGElement("g", {
                id: "ticks"
            });

            var windowWidth = SVGDocument.clientWidth;
            console.log(windowWidth);

            var testShape = createSVGElement("circle", {
                r: "30",
                cx: "40",
                cy: "50",
                fill: "#ff0000"
            });
            all.appendChild(testShape);
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

                translate(all, currentDragX - previousDragX, 0);
            }

            function onMouseUp(e) {
                document.removeEventListener("mouseup", onMouseUp);
                document.removeEventListener("mousemove", onMouseMove);
            }
        });
    }
}

TimelineCtrl.$inject = ['$scope', '$timeout', 'ApplicationEvents', 'ApplicationState'];