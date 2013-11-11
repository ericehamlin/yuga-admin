'use strict';

describe('yuga.Event', function () {
    var event;

    beforeEach(function() {
        event = new yuga.Event();
    });

    describe("containsAspect", function() {
        it("should return true if the event contains the specified person, place, thing, i.e. aspect", function() {
            //todo test
        });

        it("should return false if the event does not contain the specified aspect", function() {
            //todo test
        });

        it("should throw an exception if the parameter is not a yuga.Aspect", function() {
            //todo test
        });
    });

    describe("intersectsEvent", function() {
        it("should return true if the two events overlap in time", function() {
            //todo test
        });

        it("should return false if the two events do not overlap in time", function() {
            //todo test
        });

        it("should throw an exception if the parameter is not a yuga.Event", function() {
            //todo test
        });
    });

    describe("addAspect", function() {
        it("should add the specified aspect to the end of the aspects array property", function() {
            //todo test
        });

        it("should not add the aspect to the end of the aspects array property if the aspect is already in the event", function() {
            //todo test
        });

        it("should throw an exception if the parameter is not a yuga.Aspect", function() {
            //todo test
        });
    });

    describe("removeAspect", function() {
        it("should throw an exception if the parameter is not a yuga.Aspect", function() {
            //todo test
        });
    });

    describe("getAspects", function() {

    });

    describe("getLocalAspectById", function() {

    });

    describe("getStartTimeUnits", function() {
        it("should return the start time of the event, in units specified by the timescale (milliseconds)", function() {
            //todo test
        });

        it("should return null?????? if the event has no start time", function() {
            //todo test
        });
    });

    describe("getEndTimeUnits", function() {
        it("should return the end time of the event, in units specified by the timescale (milliseconds)", function() {
            //todo test
        });

        it("should return null?????? if the event has no end time", function() {
            //todo test
        });
    });

    describe("clone", function() {
        it("should make a complete clone of the original event, minus references to other domain objects", function() {
            var newEvent = event.clone();
            //todo test
        });
    });

});