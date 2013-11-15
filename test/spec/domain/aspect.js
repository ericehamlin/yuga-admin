'use strict';

describe('yuga.Aspect', function () {
    var event1 = new yuga.Event({id:2, name:"test event 1"}),
        event2 = new yuga.Event({id:3, name:"test event 2"}),
        event3 = new yuga.Event({id:4, name:"test event 3"}),
        event4 = {id:5, name:"test event 4"},
        type1 = new yuga.Type({id:6, name:"test type 1"}),
        type2 = new yuga.Type({id:7, name:"test type 2"}),

        aspect;


    beforeEach(function() {
        aspect = new yuga.Aspect({
            id:1,
            events:[event1, event2],
            type: type1
        });
    });


    describe("inEvent", function() {
        it("should return false when the aspect is not part of the event", function() {
            expect(aspect.inEvent(event3)).toBe(false);
        });

        it("should return true when the aspect is part of the event", function() {
            expect(aspect.inEvent(event2)).toBe(true);
        });

        it("should throw an exception when the parameter is not an instance of yuga.Event", function() {
            expect(aspect.inEvent, 1).toThrow();
            expect(aspect.inEvent, event4).toThrow();
        });
    });


    describe("isType", function() {
        it("should return true when aspect is of the passed type", function() {
            expect(aspect.isType(type1)).toBe(true);
        });

        it("should return false when aspect is not of the passed type", function() {
            expect(aspect.isType(type2)).toBe(false);
        });

        it("should throw an exception when the parameter is not an instance of yuga.Type", function() {
            expect(aspect.isType, 1).toThrow();
            expect(aspect.isType, "blarrgh").toThrow();
            expect(aspect.isType, event1).toThrow();
        });
    });

    // todo should throw an error when no type set?
    describe("getType", function() {
    });

    describe("setType", function() {

    });

    describe("addEvent", function() {

    });

    describe("removeEvent", function() {

    });

    describe("getEvents", function() {

    });

    describe("getFieldValue", function() {

    });

    describe("clone", function() {
        it("should make a complete clone of the original aspect, minus references to other domain objects", function() {
            var newAspect = aspect.clone();
            //todo expect
        });
    });
});