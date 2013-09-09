'use strict';

angular.module('yugaAdmin')
    .factory("ApplicationState", ['$rootScope', function($rootScope){


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
                icon: '&#xf025;',
                color: "#00f",
                typeId: 3
            }),
            new yuga.Aspect({
                id: 7,
                name: "Europe",
                icon: '&#xf041;',
                color: '#0f0',
                typeId: 4
            }),
            new yuga.Aspect({
                id: 8,
                name: "Downtown Webberville",
                icon: '&#xf041;',
                color: '#f00',
                typeId: 4
            })
        ];

        var events = [
            new yuga.Event({
                id: 1,
                name: "Event Name",
                aspects: [aspects[0], aspects[2]]
            }),
            new yuga.Event({
                id: 2,
                name: "Revent Name"
            }),
            new yuga.Event({
                id: 3,
                name: "Herve Villachez",
                aspects: [aspects[1], aspects[2]]
            })
        ];

        var timeline = new yuga.Timeline({
            name: "Default Timeline",
            events: events,
            types: types,
            aspects: aspects
        });
        return {
            timeline: timeline,
            selectElement: function(element) {
                timeline.selectElement(element);
                this.selectedElement = element;
                console.log(element);
                $rootScope.$broadcast("selectedElementChanged", element);
            },
            selectedElement: null
        };
    }]);