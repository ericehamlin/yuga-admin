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
                color: "00f",
                type: types[0]
            }),
            new yuga.Aspect({
                id: 7,
                name: "Europe",
                color: '0f0',
                type: types[1]
            }),
            new yuga.Aspect({
                id: 8,
                name: "Downtown Webberville",
                color: 'f00',
                type: types[2]
            })
        ];

        var events = [
            new yuga.Event({
                id: 1,
                name: "Event Name",
                start: "1972-05-05 05:06:23",
                end: "1999-06-07 01:30:30",
                color: "ff0000"
            }),
            new yuga.Event({
                id: 2,
                name: "Revent Name",
                start: "1990-05-05 05:06:23",
                end: "2012-06-07 01:30:30",
                color: "00ff00"
            }),
            new yuga.Event({
                id: 3,
                name: "Herve Villachez",
                start: "1965-05-05 05:06:23",
                end: "2000-06-07 01:30:30",
                color: "0000ff"
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


        var filters = [];

        /**
         *
         */
        function search() {
            timeline.traverseElements(function(element){
                element.show();
            });
            for (var i=0; i<filters.length; i++) {
                timeline.traverseElements(filters[i].filter);
                console.log("filters", i, filters[i])
            }
        }

        /**
         *
         * @param filter
         *
         * @returns {String|Number} filter id
         */
        function addFilter(filter) {
            if (filter.id == undefined) {
                filter.id = Math.ceil(Math.random() * 100);
                console.log("GENERATING FILTER ID");
            } else {
                for (var i=0; i<filters.length; i++) {
                    if (filters[i].id == filter.id) {
                        filters.splice(i, 1);
                        break;
                    }
                }
            }
            filters.push(filter);
            search();

            return filter.id;
        }

        /**
         *
         * @param id
         */
        function removeFilter(id) {
            for (var i=0; i<filters.length; i++) {
                if (filters[i].id == id) {
                    filters.splice(i, 1);
                    break;
                }
            }
            search();
        }

        return {
            timeline: timeline,
            selectElement: function(element) {
                this.selectedElement = element;
            },
            filters: filters,
            addFilter: addFilter,
            removeFilter: removeFilter,
            selectedElement: null
        };
    }]);