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
            this.fields[this.fields.length] = new yuga.Field();
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
            return field.name.replace(/\s/, "_");
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
            var ignoreProperties = ["tempData", "fields"],
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

            // TODO: id
            newType.id = 99999;
            return newType;
        };

        angular.extend(this, initProperties);
    };

    yuga.Type.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));