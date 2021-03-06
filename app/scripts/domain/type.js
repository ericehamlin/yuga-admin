(function (yuga) {

    yuga.fieldTypes = {
        TEXT : "text",
        TEXTAREA : "textarea",
        DATE : "date",
        DATETIME : "datetime",
        SELECT : "select",
        NUMBER : "number"
    };

    yuga.Type = function (initProperties) {

        this.tempData = {
            hidden: false,
            selected: false,
            selectedSecondary: false
        };

        this.fields = [];
        this.icon = "&#xf04d;";


        this.addField = function() {
            this.fields[this.fields.length] = new yuga.Field({id: yuga.DomainObject.newId()});
        };

        /** TODO how does this affect all the aspects which derive from it? */
        this.deleteField = function(field) {
            var foundIndex = jQuery.inArray(field, this.fields);
            if (foundIndex > -1) {
                this.fields.splice(foundIndex, 1);
            }
        };

        /**
         * TODO -- this doesn't work because what happens when the user changes the name? duhhh....
         *
         * @param field
         */
        this.getFieldId = function(field) {
            return field.id;
        };

        /**
         *
         */
        this.getFieldTypes = function() {
            var fieldTypes = [];
            for (i in yuga.fieldTypes) {
                fieldTypes.push(yuga.fieldTypes[i]);
            }
            return fieldTypes;
        };

        /**
         * todo add type to affected aspects
         *
         * @param timeline
         */
        this.attach = function(timeline) {
            this.timeline = timeline;
        };

        /**
         * todo remove type from affected aspects
         */
        this.detach = function() {
            this.timeline = null;
        };

        /**
         *
         */
        this.clone = function() {
            var ignoreProperties = ["$$hashKey", "tempData", "fields"],
                newType = new yuga.Type();
            for (var prop in this) {
                if (this.hasOwnProperty(prop) &&
                    !(this[prop] instanceof Function) &&
                    $.inArray(prop, ignoreProperties) === -1) {
                    newType[prop] = this[prop];
                }
            }

            for (var i=0; i<this.fields.length; i++) {
                newType.fields.push(this.fields[i].clone());
            }

            newType.id = yuga.DomainObject.newId();
            return newType;
        };

        angular.extend(this, initProperties);
    };

    /**
     * TODO eliminate extraneous properties that we can't prepare for
     *
     * @param {String|Object} serializedType
     *
     * @returns {yuga.Type}
     */
    yuga.Type.deserialize = function(serializedType) {
        var type,
            ignoreProperties = ["fields"],
            serializedTypeObject = yuga.DomainObject.parseJSON(serializedType);


        type = new yuga.Type(yuga.DomainObject.deserialize(serializedType, ignoreProperties));

        for (var i=0; serializedTypeObject.fields !== undefined && i<serializedTypeObject.fields.length; i++) {
            type.fields.push(yuga.Field.deserialize(serializedTypeObject.fields[i]));
        }

        //delete serializedTypeObject.fields;
        return type;
    };

    /**
     * TODO
     * @param serializedTypeObject
     */
    yuga.Type.validateJSON = function(serializedTypeObject) {

    };

    yuga.Type.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));