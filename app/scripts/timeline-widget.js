/**
 *
 * @param id
 * @param timelineData
 */
function timelineWidget(id, timelineData) {
    var that = this;
    var $widget = $("#" + id),
        $centerLine,
        $all,
        $eventGuideLeft,
        $eventGuideLeftLabel,
        $eventGuideRight,
        $eventGuideRightLabel,
        $dragGrab,
        $ticks,
        $events,
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

    this.timelineData = timelineData;
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
        $dragGrab.addClass("timeline-drag-grab");
        $widget.append($dragGrab);

        $dragGrab.on("mousedown", function(e) {
            var previousDragX,
                previousTimeStamp,
                currentDragX = e.clientX,
                currentTimeStamp = e.timeStamp,
                velocity,
                scrollTimeout;

            $(document).on("mouseup", onMouseUp);
            $(document).on("mousemove", onMouseMove);


            /**
             * TODO: check to see whether mouse button is still down
             * @param e
             */
            function onMouseMove(e) {
                previousDragX = currentDragX;
                currentDragX = e.clientX;
                previousTimeStamp = currentTimeStamp;
                currentTimeStamp = e.timeStamp;


                moveByPixels(currentDragX - previousDragX);
                if (needsRedrawing()) {
                    that.redraw();
                }

                $timeDisplay.html(new Date(centerPointTime));
            }

            function velocityScroll() {
                moveByPixels(velocity * 10);
                if (needsRedrawing()) {
                    that.redraw();
                }
                velocity *= 0.8;
                if (Math.abs(velocity) > 0.1) {
                    scrollTimeout = setTimeout(velocityScroll, 10);
                }
            }

            function onMouseUp(e) {
                $(document).off("mouseup", onMouseUp);
                $(document).off("mousemove", onMouseMove);

                velocity = (currentDragX - previousDragX)/(currentTimeStamp - previousTimeStamp) * 0.9;

                if (Math.abs(velocity) > 1) {
                    velocityScroll()
                }
            }
        });

        $all = $("<div/>");
        $all.css({position: "absolute", height: "100%", "z-index": 3});
        $widget.append($all);

        $ticks = $("<div/>");
        $ticks.css({position: "absolute", height: "45px", bottom: "0px"});
        $all.append($ticks);

        $events = $("<div/>");
        $events.css({position: "absolute", top: "0px", bottom: "45px"});
        $all.append($events);

        $eventGuideLeftLabel = $("<div/>").addClass("timeline-event-guide-label");
        $eventGuideLeft = $("<div/>").
                            attr("id", "timeline-event-guide-left").
                            addClass("timeline-event-guide-left").
                            append($eventGuideLeftLabel);
        $all.append($eventGuideLeft);

        $eventGuideRightLabel = $("<div/>").addClass("timeline-event-guide-label");
        $eventGuideRight = $("<div/>").
                            attr("id", "timeline-event-guide-right").
                            addClass("timeline-event-guide-right").
                            append($eventGuideRightLabel);
        $all.append($eventGuideRight);

        $timeDisplay = $("<div/>");
        $timeDisplay.css({position: "absolute", height: "45px", bottom: "0px"});
        $widget.append($timeDisplay);

        $centerLine = $("<div/>").
            css({width: "1px", position: "absolute", "background-color": "#000", height: "100%", left: "50%"});
        $widget.append($centerLine);

        console.log(that);

        maxTime = that.timelineData.getLatestEventTime();
        minTime = that.timelineData.getEarliestEventTime();

        pixelToTimeUnitRatio =  (timelineWindowWidth + (2500 * margin))/(maxTime - minTime);
        centerPointTime = (maxTime + minTime) / 2;
        beginningCenterPointTime = centerPointTime;

        this.setBeginningAndEndDrawTimes();

        this.assignEventsToYs();

        positionCenter();
        updateTimelineGroup();

        $(window).on("resize", function() {
            timelineWindowWidth = $widget.width();
            beginningCenterPointTime = centerPointTime;
            that.setBeginningAndEndDrawTimes();
            that.redraw();
            positionCenter();
        });
    }

    this.assignEventsToYs = function() {
        var eventHeight = 30;
        var numSlots = Math.round($events.height()/eventHeight);
        var slots = [];
        for (var i=0; i<that.timelineData.events.length; i++) {
            var event = that.timelineData.events[i];
            for (var j=0; j<numSlots; j++) {
                if (slots[j] === undefined) {
                    slots[j] = event;
                    event.tempData.displayY = eventHeight * j;
                    break;
                }
            }
        }
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
        for (var i=0; i<that.timelineData.events.length; i++) {
            callback(that.timelineData.events[i]);
        }
    }

    function drawEvents() {
        $(".timeline-event").detach();
        that.traverseEvents(drawEvent);
    }

    function drawEvent(event) {
        if (event.start && event.end) {
            var $eventDiv,
                $eventBarDiv,
                $eventTitle,
                $eventBarCoverDiv,
                $eventBarDragLeft,
                $eventBarDragRight
                ;

            if ($("#timeline-event-" + event.id).length == 0) {

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
                $eventBarDiv.css({"background-color": "#" + event.color});
                $eventDiv.append($eventBarDiv);

                $eventBarCoverDiv = $("<div/>");
                $eventBarCoverDiv.attr("id", "timeline-event-bar-cover-" + event.id);
                $eventBarCoverDiv.addClass("timeline-event-bar-cover");
                $eventBarCoverDiv.css({"background-color": "#" + desaturate(event.color, 0 )});
                $eventBarDiv.append($eventBarCoverDiv);

                $eventBarDragLeft = $("<div/>");
                $eventBarDragLeft.attr("id", "timeline-event-bar-drag-left-" + event.id);
                $eventBarDragLeft.addClass("timeline-event-bar-drag-left");
                $eventBarDiv.append($eventBarDragLeft);

                $eventBarDragRight = $("<div/>");
                $eventBarDragRight.attr("id", "timeline-event-bar-drag-right-" + event.id);
                $eventBarDragRight.addClass("timeline-event-bar-drag-right");
                $eventBarDiv.append($eventBarDragRight);


                /**
                 * TODO: finish drop on event
                 *
                function isAppropriateDroppable($element) {
                    console.log($element.originalEvent.dataTransfer.getData('text/plain'));
                    return true;
                }

                $eventDiv.on('dragenter', function(e) { console.log("enter")});
                $eventDiv.on('dragover', function(e) {
                    if (e.preventDefault && isAppropriateDroppable(e)) {
                        e.preventDefault(); // Necessary. Allows us to drop.
                        console.log("over");
                    }
                });
                $eventDiv.on('dragleave', function(e) { console.log("leave")});
                $eventDiv.on('drop', function(e) { console.log("drop")});
                */

                // TODO clean this shit up
                // also TODO don't recreate these functions for each damn event
                // also TODO make sure start time doesn't exceed end time
                var timeout,
                    isDraggingEvent,
                    isMouseDown,
                    startDragX,
                    previousDragX,
                    currentDragX,
                    $dragDiv,
                    totalTimeDifference;

                function onAnyDragCycle(e) {
                    previousDragX = currentDragX;
                    currentDragX = e.clientX;
                    totalTimeDifference = convertPixelsToTimeUnits(currentDragX - startDragX);
                }

                function onDragEvent(e) {
                    onAnyDragCycle(e);
                    $dragDiv.css("left", $dragDiv.position().left + currentDragX - previousDragX);
                    drawLeftGuide($dragDiv, event.getStartTimeUnits() + totalTimeDifference);
                    drawRightGuide($dragDiv, event.getEndTimeUnits() + totalTimeDifference);
                }

                function onHeldDown(e) {
                    currentDragX = startDragX = e.clientX;
                    isDraggingEvent = true;
                    clearTimeout(timeout);
                    $dragDiv = $eventDiv.clone();
                    $dragDiv.attr("id", "timeline-event-drag-" + event.id);
                    $dragDiv.addClass("selected timeline-event-drag");
                    $events.append($dragDiv);


                    drawLeftGuide($dragDiv, event.getStartTimeUnits() + convertPixelsToTimeUnits(currentDragX - startDragX));
                    $eventGuideLeft.css({display: "block"});
                    drawRightGuide($dragDiv, event.getEndTimeUnits() + convertPixelsToTimeUnits(currentDragX - startDragX));
                    $eventGuideRight.css({display: "block"});

                    $eventDiv.removeClass("selected");
                    $eventDiv.css({opacity: 0.5});
                    $(document).off("mousemove", onHeldDown);
                    $(document).on("mousemove", onDragEvent);
                }

                function onMouseUp(e) {
                    clearTimeout(timeout);
                    $(document).off("mousemove", onDragEvent);
                    $(document).off("mousemove", onHeldDown);
                    $eventGuideLeft.css({display: "none"});
                    $eventGuideRight.css({display: "none"});
                    if (!isDraggingEvent && isMouseDown) {
                        that.fireEvent("selectEvent", event);
                    }
                    else if (isMouseDown && isDraggingEvent) {
                        $eventDiv.css({opacity: 1, left: $dragDiv.position().left});
                        $dragDiv.remove();
                        that.fireEvent("changeEventProperty", event, {start: event.getStartTimeUnits() + totalTimeDifference, end: event.getEndTimeUnits() + totalTimeDifference});
                    }
                    isMouseDown = false;
                    isDraggingEvent = false;
                }

                $eventDiv.on("mousedown", function(e) {
                    isMouseDown = true;
                    timeout = setTimeout(function() { onHeldDown(e); }, 500);
                    $(document).on("mousemove", onHeldDown);
                    $(document).on("mouseup", onMouseUp);
                });


                function onDragLeft(e) {
                    onAnyDragCycle(e);
                    $eventDiv.css({left: $eventDiv.position().left + currentDragX - previousDragX, width: $eventDiv.width() + previousDragX - currentDragX});
                    drawLeftGuide($eventDiv, event.getStartTimeUnits() + totalTimeDifference);
                }

                function onDropLeft(e) {
                    $(document).off("mousemove", onDragLeft);
                    $(document).off("mouseup", onDropLeft);
                    $eventGuideLeft.css({display: "none"});
                    that.fireEvent("changeEventProperty", event, {start: event.getStartTimeUnits() + totalTimeDifference});
                }

                $eventBarDragLeft.on("mousedown", function(e) {
                    e.stopPropagation();
                    currentDragX = startDragX = e.clientX;
                    drawLeftGuide($eventDiv, event.getStartTimeUnits() + totalTimeDifference);
                    $eventGuideLeft.css({display: "block"});

                    $(document).on("mousemove", onDragLeft);
                    $(document).on("mouseup", onDropLeft);
                });


                function onDragRight(e) {
                    onAnyDragCycle(e);
                    drawRightGuide($eventDiv, event.getEndTimeUnits() + totalTimeDifference);
                    $eventDiv.css({width: $eventDiv.width() - previousDragX + currentDragX});
                }

                function onDropRight(e) {
                    $(document).off("mousemove", onDragRight);
                    $(document).off("mouseup", onDropRight);
                    $eventGuideRight.css({display: "none"});
                    that.fireEvent("changeEventProperty", event, {end: event.getEndTimeUnits() + totalTimeDifference});
                }

                $eventBarDragRight.on("mousedown", function(e) {
                    e.stopPropagation();
                    currentDragX = startDragX = e.clientX;
                    drawRightGuide($eventDiv, event.getEndTimeUnits() + totalTimeDifference);
                    $eventGuideRight.css({display: "block"});
                    $(document).on("mousemove", onDragRight);
                    $(document).on("mouseup", onDropRight);
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
                $events.append($eventDiv);
            }

            // TODO should probably short-circuit all of this
            if (event.isHidden()) {
                $eventDiv.css({display: "none"});
            }
            else {
                $eventDiv.css({display: "block"});
            }
        }
    }

    function desaturate(color, sat) {
        var col = hexToRgb(color);
        var gray = col.r * 0.3086 + col.g * 0.6094 + col.b * 0.0820;

        col.r = Math.round(col.r * sat + gray * (1-sat));
        col.g = Math.round(col.g * sat + gray * (1-sat));
        col.b = Math.round(col.b * sat + gray * (1-sat));

        var out = rgbToHex(col.r,col.g,col.b);

        return out;
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function drawLeftGuide($div, time) {
        $eventGuideLeftLabel.html(new Date(time));
        $eventGuideLeft.css({left: $div.position().left - $eventGuideLeft.width()});
    }

    function drawRightGuide($div, time) {
        $eventGuideRight.css({left: $div.position().left + $div.width()});
        $eventGuideRightLabel.html(new Date(time));
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

    /**
     *
     * @param timelineData
     */
    this.setTimelineData = function(timelineData) {
        this.timelineData = timelineData;
        this.setBeginningAndEndDrawTimes();

        this.assignEventsToYs();
        this.redraw();
        positionCenter();
    };

    this.init();
}