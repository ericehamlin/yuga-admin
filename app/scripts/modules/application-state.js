'use strict';

angular.module('yugaAdmin')
    .factory("ApplicationState", ['$rootScope', function($rootScope){


        var events = [
            new yuga.Event({
                name: "Event Name"
            }),
            new yuga.Event({
                name: "Revent Name"
            }),
            new yuga.Event({
                name: "Herve Villachez"
            })
        ];

        var types = [
            new yuga.Type({
                name: "Person",
                icon: '&#xf025;'
            }),
            new yuga.Type({
                name: "Place",
                icon: '&#xf041;'
            }),
            new yuga.Type({
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
                name: "Johnny",
                icon: '&#xf025;',
                color: "#00f"
            }),
            new yuga.Aspect({
                name: "Europe",
                icon: '&#xf041;',
                color: '#0f0'
            }),
            new yuga.Aspect({
                name: "Downtown Webberville",
                icon: '&#xf041;',
                color: '#f00'
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
                this.selectedElement = element;
                console.log(element);
                $rootScope.$broadcast("selectedElementChanged", element);
            },
            selectedElement: null
        };
    }]);