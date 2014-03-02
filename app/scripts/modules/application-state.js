'use strict';

angular.module('yugaAdmin')
    .factory("ApplicationState", ['$rootScope', 'ApplicationEvents', function($rootScope, ApplicationEvents){

        var timeline = null;
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
            ApplicationEvents.broadcast(ApplicationEvents.TIMELINE_MODIFIED);
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
            setTimeline: function(tl) {
                this.timeline = tl;
                timeline = tl;
            },
            timeline: timeline,
            selectElement: function(element) {
                this.selectedElement = element;
            },
            filters: filters,
            addFilter: addFilter,
            removeFilter: removeFilter,
            selectedElement: null,
        };
    }]);