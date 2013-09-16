'use strict';

angular.module('yugaAdmin')
    .factory("ApplicationState", ['$rootScope', 'ApplicationEvents', function($rootScope, ApplicationEvents){


        var types = [
            new yuga.Type({
                id: 3,
                name: "Person",
                icon: '&#xf025;'
            }),
            new yuga.Type({
                id: 4,
                name: "Place",
                icon: '&#xf041;'
            }),
            new yuga.Type({
                id: 5,
                name: "Thing",
                icon: '&#xf02d;',
                fields: [
                    {
                        name: "boobak",
                        defaultText: "rambalamba"
                    }
                ]
            })
        ];

        var aspects = [
            new yuga.Aspect({
                id: 6,
                name: "Johnny",
                color: "#00f",
                typeId: 3
            }),
            new yuga.Aspect({
                id: 7,
                name: "Europe",
                color: '#0f0',
                typeId: 4
            }),
            new yuga.Aspect({
                id: 8,
                name: "Downtown Webberville",
                color: '#f00',
                typeId: 4
            })
        ];

        var events = [
            new yuga.Event({
                id: 1,
                name: "Event Name"
            }),
            new yuga.Event({
                id: 2,
                name: "Revent Name"
            }),
            new yuga.Event({
                id: 3,
                name: "Herve Villachez"
            })
        ];

        aspects[0].addEvent(events[0]);
        events[0].addAspect(aspects[0]);

        aspects[1].addEvent(events[2]);
        events[2].addAspect(aspects[1]);

        aspects[2].addEvent(events[0]);
        aspects[2].addEvent(events[2]);
        events[0].addAspect(aspects[2]);
        events[2].addAspect(aspects[2]);

        var timeline = new yuga.Timeline({
            name: "Default Timeline",
            events: events,
            types: types,
            aspects: aspects
        });

        for (var i=0; i<events.length; i++) {
            events[i].timeline = timeline;
        }

        for (var i=0; i<types.length; i++) {
            types[i].timeline = timeline;
        }

        for (var i=0; i<aspects.length; i++) {
            aspects[i].timeline = timeline;
        }

        return {
            timeline: timeline,
            selectElement: function(element) {
                this.selectedElement = element;
            },
            selectedElement: null
        };
    }]);