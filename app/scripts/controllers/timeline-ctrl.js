'use strict';

function TimelineCtrl($scope, $timeout, ApplicationEvents, ApplicationState) {
    $scope.$on(ApplicationEvents.TIMELINE_MODIFIED, function() {
    });

    $timeout(function() {
        var svgDocument = document.getElementById("timeline-widget"),
            all = svgDocument.getElementById("all"),
            dragGrab = svgDocument.getElementById("drag-grab")
            ;


        all.setAttribute("transform", "scale(2, 1)");

        //all.setAttribute("transform", "matrix(2, 0, 0, 1, -50, 20)");
        console.log("CALCULATED", multiplyMatrices(getTranslateMatrix(-50,20), getScaleMatrix(2,1)));

        function translate(svgElement, x, y, replaceTransform) {
            var matrix = getTranslateMatrix(x,y);
            setTransformMatrix(svgElement, matrix, replaceTransform);
        }

        function getTranslateMatrix(x, y) {
            return [1, 0, 0, 1, x, y];
        }

        function rotate(svgElement, degrees, replaceTransform) {
            var matrix = getRotateMatrix(degrees);
            setTransformMatrix(svgElement, matrix, replaceTransform);
        }

        function getRotateMatrix(degrees) {
            return [Math.cos(degrees), Math.sin(degrees), -Math.sin(degrees), Math.cos(degrees), 0, 0];
        }

        function scale(svgElement, x, y, replaceTransform) {
            var matrix = getScaleMatrix(x,y);
            setTransformMatrix(svgElement, matrix, replaceTransform);
        }

        function getScaleMatrix(x, y) {
            return [x, 0, 0, y, 0, 0];
        }

        function skew(svgElement, x, y, replaceTransform) {
            var matrix = getSkewMatrix(x,y);
            setTransformMatrix(svgElement, matrix, replaceTransform);
        }

        function getSkewMatrix(x, y) {

        }

        function matrix(svgElement, matrix, replaceTransform) {
            setTransformMatrix(svgElement, matrix, replaceTransform);
        }


        /**
         * [  a0  a2  a4 ]     [  b0  b2  b4 ]      [  (a0*b0)+(a2*b1)  (a0*b2)+(a1*b3)  (a0*b4)+(a2*b5)+a4  ]
         * [  a1  a3  a5 ]  *  [  b1  b3  b5 ]  =   [  (a1*b0)+(a3*b1)  (a1*b2)+(a3*b3)  (a1*b4)+(a3*b5)+a5  ]
         * [  0   0   1  ]     [  0   0   1  ]      [         0                0                    1        ]
         *
         * @param matrixA
         * @param matrixB
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

        function calculateTransformMatrix(svgElement, matrix) {
            var transform = svgElement.getAttribute("transform");
            var transforms = transform.trim().split(/\)\s*/g);

            transforms.length -= 1; // don't know why my regex creates a blank entry at the end

            if (transforms.length === 0) {
                return matrix;
            }

            var matrices = [];
            for (var i=0; i<transforms.length; i++) {
                matrices[i] = parseTransformString(transforms[i]);
            }
            matrices.push(matrix);

            var resultMatrix = matrices[0];
            for (var i=0; i<matrices.length; i++) {
                resultMatrix = multiplyMatrices(resultMatrix, matrices[i]);
            }

            return resultMatrix;
        }

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
                currentDragX = e.x;

            document.addEventListener("mouseup", onMouseUp);
            svgDocument.addEventListener("mouseup", onMouseUp);

            document.addEventListener("mousemove", onMouseMove);
            svgDocument.addEventListener("mousemove", onMouseMove);


            function onMouseMove(e) {
                previousDragX = currentDragX;
                currentDragX = e.x;
                console.log(previousDragX, currentDragX);
            }

            function onMouseUp(e) {
                document.removeEventListener("mouseup", onMouseUp);
                svgDocument.removeEventListener("mouseup", onMouseUp);

                translate(all, 20, 0);
            }
        });
    });
}

TimelineCtrl.$inject = ['$scope', '$timeout', 'ApplicationEvents', 'ApplicationState'];