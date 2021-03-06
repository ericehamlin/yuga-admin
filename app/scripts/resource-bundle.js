(function (yuga) {
    yuga.ResourceBundle = {

        /**
         *
         * @param key
         */
        get : function(key) {
            if (!this[key]) {
                throw new ReferenceError('There is no property "' + key + '" in ResourceBundle.');
            }
            return vsprintf(this[key], Array.prototype.slice.call(arguments, 1));
        },

        YES :                                   "Yes",
        NO :                                    "No",
        NEW :                                   "New",
        OPEN :                                  "Open",
        FILE :                                  "File",
        EDIT :                                  "Edit",
        UNDO :                                  "Undo",
        REDO :                                  "Redo",
        COLOR :                                 "Color",
        EVENTS :                                "Events",
        EVENT :                                 "Event",
        TYPES :                                 "Types",
        TYPE :                                  "Type",
        ASPECTS :                               "Aspects",
        ASPECT :                                "Aspect",
        FIELD :                                 "Field",
        FIELD_TYPE :                            "Field Type",
        DEFAULT :                               "Default",
        START :                                 "Start",
        END :                                   "End",
        DESCRIPTION :                           "Description",

        COMMAND_ADD_ASPECT_TO_EVENT :           "add aspect to event",
        COMMAND_REMOVE_ASPECT_FROM_EVENT :      "remove aspect from event",
        COMMAND_ADD_FIELD_TO_TYPE :             "add field to type",
        COMMAND_REMOVE_FIELD_FROM_TYPE :        "remove field from type",
        COMMAND_CHANGE_LOCAL_ASPECT_PROPERTY :  "text change",
        COMMAND_CHANGE_PROPERTY :               "text change",
        COMMAND_CHANGE_PROPERTIES :             "text change",
        COMMAND_NEW_ASPECT :                    "new aspect",
        COMMAND_NEW_EVENT :                     "new event",
        COMMAND_NEW_TYPE :                      "new type",
        COMMAND_DELETE_EVENT :                  "delete event",
        COMMAND_DELETE_ASPECT :                 "delete aspect",
        COMMAND_DELETE_TYPE :                   "delete type",
        COMMAND_CLONE_EVENT :                   "clone event",
        COMMAND_CLONE_TYPE :                    "clone type",
        COMMAND_CLONE_ASPECT :                  "clone aspect"
    };
}(window.yuga = window.yuga || {}));