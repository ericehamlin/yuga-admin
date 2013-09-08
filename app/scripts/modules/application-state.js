'use strict';

angular.module('yugaAdmin')
    .factory("ApplicationState", ['$rootScope', function($rootScope){


        var events = [
            new yuga.Event({
                name: "Event Name"
            }),
            new yuga.Event({
                name: "Revent Name",
                selected: true
            }),
            new yuga.Event({
                name: "Herve Villachez",
                selectedSecondary: true
            })
        ];

        var types = [
            new yuga.Type({
                name: "Person",
                icon: '&#xf025;'
            }),
            new yuga.Type({
                name: "Place",
                icon: '&#xf041;',
                selected: true
            }),
            new yuga.Type({
                name: "Thing",
                icon: '&#xf02d;'
            })
        ];

        var aspects = [
            new yuga.Aspect({
                name: "Johnny",
                icon: '&#xf025;',
                selected: true,
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