'use strict';

angular.module('yugaAdmin')
    .factory("ApplicationEvents", ['$rootScope', function($rootScope){
        return {
            broadcast : function() {
                $rootScope.$broadcast.apply($rootScope, arguments);
            },

            TIMELINE_MODIFIED :         "timelineModified",
            SELECTED_ELEMENT_CHANGED :  "selectedElementChanged",
            ASPECT_ADDED_TO_EVENT :     "aspectAddedToEvent",
            PROPERTY_CHANGED :          "propertyChanged",
            PROPERTIES_CHANGED :        "propertiesChanged",
            FIELD_ADDED_TO_TYPE :       "fieldAddedToType",
            NEW_EVENT :                 "newEvent",
            NEW_TYPE :                  "newType",
            NEW_ASPECT :                "newAspect",
            LAUNCH_MODAL :              "launchModal",
            LAUNCH_CONFIRM_MODAL :      "launchConfirmModal",
            LAUNCH_ALERT_MODAL :        "launchAlertModal"
        }
    }]);