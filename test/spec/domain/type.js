'use strict';

describe('yuga.Type', function () {
    var type;

    beforeEach(function() {
        type = new yuga.Type();
    });

    describe("addField", function() {
    });

    describe("deleteField", function() {
    });

    describe("getFieldId", function() {
    });

    describe("getFieldTypes", function() {
    });

    describe("clone", function() {
        it("should make a complete clone of the original type, minus references to other domain objects", function() {
            var newType = type.clone();
            //todo test
        });
    });
});