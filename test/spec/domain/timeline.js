'use strict';

describe('yuga.Timeline', function () {
    var timeline;

    beforeEach(function() {
        timeline = new yuga.Timeline();
    });

    describe("traverseElements", function() {
        it("should go through every element (event, aspect, type) and apply the callback function to that element", function() {
            //todo test
        });
    });

    describe("getLatestEventTime", function() {
        it("should get the latest event time (in specified units -- milliseconds) on the timeline (start or end)", function() {
            //todo test
        });

        it("should return null??? undefined??? if there are no events with times on the timeline", function() {
            //todo test
        });
    });

    describe("getEarliestEventTime", function() {
        it("should get the earliest event time (in specified units -- milliseconds) on the timeline (start or end)", function() {
            //todo test
        });

        it("should return null??? undefined??? if there are no events with times on the timeline", function() {
            //todo test
        });
    });

    describe("selectEvent", function() {
    });

    describe("selectType", function() {
    });

    describe("selectAspect", function() {
    });

    describe("selectElement", function() {
    });

    describe("getAspectById", function() {
    });

    describe("getEventById", function() {
    });

    describe("getTypeById", function() {
    });

    describe("getElementById", function() {
    });

    describe("clone", function() {
        it("should produce a complete clone of the timeline, with no object references to the original", function() {
            //todo test
        })
    });
});