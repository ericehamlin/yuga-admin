function timelineWidget(id, timelineData) {
    var $widget = $("#" + id);
    var that = this,
        $centerLine,
        $all,
        $dragGrab,
        $ticks,
        $timeDisplay,
        pixelToTimeUnitRatio,
        timelineWindowWidth = $widget.width(),
        centerPointTime,
        margin = 2000,
        maxTime,
        minTime,

        beginningCenterPointTime,
        drawBeginningTime,
        drawEndTime
        ;

    this.widgetEvents = {};

    /**
     * @param zoomDelta
     */
    this.zoomBy = function(zoomDelta) {
        beginningCenterPointTime = centerPointTime;
        pixelToTimeUnitRatio *= Math.pow(1.5, zoomDelta);
        this.setBeginningAndEndDrawTimes();
        this.redraw();
        positionCenter();

    };

    /**
     *
     */
    this.setBeginningAndEndDrawTimes = function() {
        drawBeginningTime = centerPointTime - convertPixelsToTimeUnits((timelineWindowWidth/2) + margin);
        drawEndTime = centerPointTime + convertPixelsToTimeUnits((timelineWindowWidth/2) + margin);
    };

    /**
     *
     */
    this.init = function() {
        $dragGrab = $("<div/>");
        $dragGrab.css({width: "100%", height: "100%", "z-index": 2, position: "absolute"});
        $widget.append($dragGrab);

        $dragGrab.on("mousedown", function(e) {
            var previousDragX,
                currentDragX = e.clientX;

            $(document).on("mouseup", onMouseUp);
            $(document).on("mousemove", onMouseMove);


            /**
             * TODO: check to see whether mouse button is still down
             * @param e
             */
            function onMouseMove(e) {
                previousDragX = currentDragX;
                currentDragX = e.clientX;

                moveByPixels(currentDragX - previousDragX);
                if (needsRedrawing()) {
                    that.redraw();
                }

                $timeDisplay.html(new Date(centerPointTime));
            }

            function onMouseUp(e) {
                $(document).off("mouseup", onMouseUp);
                $(document).off("mousemove", onMouseMove);
            }
        });

        $all = $("<div/>");
        $all.css({position: "absolute", height: "100%", "z-index": 3});
        $widget.append($all);

        $ticks = $("<div/>");
        $ticks.css({position: "absolute", height: "45px", bottom: "0px"});
        $all.append($ticks);

        $timeDisplay = $("<div/>");
        $timeDisplay.css({position: "absolute", height: "45px", bottom: "0px"});
        $widget.append($timeDisplay);

        $centerLine = $("<div/>").
            css({width: "1px", position: "absolute", "background-color": "#000", height: "100%", left: (timelineWindowWidth/2) + "px"});
        $widget.append($centerLine);

        maxTime = timelineData.getLatestEventTime();
        minTime = timelineData.getEarliestEventTime();

        pixelToTimeUnitRatio =  (timelineWindowWidth + (2500 * margin))/(maxTime - minTime);
        centerPointTime = (maxTime + minTime) / 2;
        beginningCenterPointTime = centerPointTime;

        this.setBeginningAndEndDrawTimes();

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
        $all.css("left", (timelineWindowWidth / 2) + "px");
    }

    function getScale() {
        var scale;

        if (pixelToTimeUnitRatio > 0.0001) {
            scale = {
                initialize: {hour: 0, minute: 0, second: 0},
                tick : {
                    format: "MMM d, yyyy h:mmtt",
                    add: {hours: 1}
                },
                subTick : {
                    format: "h:mmtt",
                    add: {minutes: 10}
                }
            };
        }
        else if (pixelToTimeUnitRatio > 0.00001) { // 0.000013460840841860077 // labeled hours
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
        else if (pixelToTimeUnitRatio > 0.000000009) {
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
        else if (pixelToTimeUnitRatio > 0.000000002) {
            scale = {
                initialize: {month: 0, day: 1, hour: 0, minute: 0, second: 0},
                tick : {
                    format: "yyyy",
                    add: {years: 1}
                },
                subTick : {
                    format: "",
                    add: {months: 1}
                }
            };
        }
        else if (pixelToTimeUnitRatio > 0.0000000002) {
            scale = {
                initialize: {
                    year: Math.floor(new Date(centerPointTime - convertPixelsToTimeUnits((timelineWindowWidth/2) + margin)).getFullYear() / 10) * 10,
                    month: 0,
                    day: 1,
                    hour: 0,
                    minute: 0,
                    second: 0
                },
                tick : {
                    format: "yyyy",
                    add: {years: 10}
                },
                subTick : {
                    format: "",
                    add: {years: 1}
                }
            };
        }
        else if (pixelToTimeUnitRatio > 0.00000000009) {
            scale = {
                initialize: {
                    year: Math.floor(new Date(centerPointTime - convertPixelsToTimeUnits((timelineWindowWidth/2) + margin)).getFullYear() / 100) * 100,
                    month: 0,
                    day: 1,
                    hour: 0,
                    minute: 0,
                    second: 0
                },
                tick : {
                    format: "yyyy",
                    add: {years: 100}
                },
                subTick : {
                    format: "yyyy",
                    add: {years: 10}
                }
            };
        }
        else {
            scale = {
                initialize: {
                    year: Math.floor(new Date(centerPointTime - convertPixelsToTimeUnits((timelineWindowWidth/2) + margin)).getFullYear() / 100) * 100,
                    month: 0,
                    day: 1,
                    hour: 0,
                    minute: 0,
                    second: 0
                },
                tick : {
                    format: "yyyy",
                    add: {years: 100}
                },
                subTick : {
                    format: "",
                    add: {years: 10}
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
            $($ticks).append($tick);
        }
    }

    this.traverseEvents = function(callback) {
        for (var i=0; i<timelineData.events.length; i++) {
            callback(timelineData.events[i]);
        }
    }

    function drawEvents() {
        that.traverseEvents(drawEvent);
    }

    function drawEvent(event) {
        if (event.start && event.end) {
            var $eventDiv,
                $eventBarDiv,
                $eventTitle;

            if ($("#timeline-event-" + event.id).length == 0) {

                // TODO Calculate this somewhere else
                event.tempData.displayY = Math.round(Math.random() * 200);

                $eventDiv = $("<div/>");
                $eventDiv.attr("id", "timeline-event-" + event.id);
                $eventDiv.addClass("timeline-event");
                $eventDiv.css({"top": event.tempData.displayY+ "px"});

                $eventTitle = $("<div/>");
                $eventTitle.attr("id", "timeline-event-title-" + event.id);
                $eventTitle.addClass("timeline-event-title");
                $eventDiv.append($eventTitle);

                $eventBarDiv = $("<div/>");
                $eventBarDiv.attr("id", "timeline-event-bar-" + event.id);
                $eventBarDiv.addClass("timeline-event-bar");
                $eventBarDiv.css({height: "10px", "background-color": "#" + event.color});

                $eventDiv.append($eventBarDiv);


                // TODO clean this shit up

                var timeout, heldDown, mouseDown;

                $eventDiv.on("mousedown", function() {
                    mouseDown = true;
                    function onHeldDown() {
                        heldDown = true;
                        clearTimeout(timeout);
                    }
                    timeout = setTimeout(onHeldDown, 500);
                });

                $eventDiv.on("mouseup", function() {
                    clearTimeout(timeout);
                    if (!heldDown && mouseDown) {
                        that.fireEvent("selectEvent", event);
                    }
                    mouseDown = false;
                });

            }
            else {
                $eventDiv = $("#timeline-event-" + event.id);
                $eventBarDiv = $("#timeline-event-bar-" + event.id);
                $eventTitle = $("#timeline-event-title-" + event.id);
            }

            that.selectDeselectEvent(event, $eventDiv);

            var left, right;

            left = event.getStartTimeUnits() > drawBeginningTime ? event.getStartTimeUnits() : drawBeginningTime;
            right = event.getEndTimeUnits() < drawEndTime ? event.getEndTimeUnits() : drawEndTime;

            if (drawBeginningTime <= right <= drawEndTime ||  drawBeginningTime <= left <= drawEndTime) {
                $eventDiv.css({
                    left: convertTimeUnitsToPixels(left - beginningCenterPointTime) + "px",
                    width: convertTimeUnitsToPixels(right - left) + "px"
                });

                $eventTitle.html(event.name);
                $all.append($eventDiv);
            }
        }
    }

    this.selectDeselectEvent = function(event, $eventDiv) {
        if (!$eventDiv) {
            $eventDiv = $("#timeline-event-" + event.id);
        }

        if ($eventDiv.length === 0) {
            return;
        }

        if (event.isSelected()) {
            $eventDiv.addClass("selected");
        }
        else {
            $eventDiv.removeClass("selected");
        }

        if (event.isSelectedSecondary()) {
            $eventDiv.addClass("selected-secondary");
        }
        else {
            $eventDiv.removeClass("selected-secondary");
        }
    };

    /**
     *
     * @param {Number} pixels
     */
    function convertPixelsToTimeUnits(pixels) {
        return pixels / pixelToTimeUnitRatio;
    }

    /**
     *
     * @param {Number} timeUnits (most likely milliseconds)
     */
    function convertTimeUnitsToPixels(timeUnits) {
        return timeUnits * pixelToTimeUnitRatio;
    }

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
    this.redraw = function() {
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
        $all.css("left", $($all).position().left + pixelsDelta);
        centerPointTime -= convertPixelsToTimeUnits(pixelsDelta);
    }

    this.addEventListener = function(event, func) {
        if (this.widgetEvents[event] == undefined) {
            this.widgetEvents[event] = [];
        }
        this.widgetEvents[event].push(func);
    };

    this.removeEventListener = function(event, func) {
        if (this.widgetEvents[event] != undefined) {
            for (var i=0; i<this.widgetEvents[event].length; i++) {
                if (this.widgetEvents[event][i] === func) {
                    this.widgetEvents[event].splice(i, 1);
                }
            }
        }
    };

    this.fireEvent = function(event) {
        var args = Array.prototype.slice.call(arguments).slice(1);
        if (this.widgetEvents[event] != undefined) {
            for (var i=0; i<this.widgetEvents[event].length; i++) {
                this.widgetEvents[event][i](args);
            }
        }
    };


    this.init();
}