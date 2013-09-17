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
            selected: false,
            selectedSecondary: false
        };

        this.fields = [];
        this.icon = "&#xf04d;";

        this.addField = function() {
            this.fields[this.fields.length] = {};
        };

        /** TODO how does this affect all the aspects which derive from it? */
        this.deleteField = function(field) {
            var foundIndex = jQuery.inArray(field, this.fields);
            if (foundIndex > -1) {
                this.fields.splice(foundIndex, 1);
            }
        };

        /**
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

        angular.extend(this, initProperties);
    };

    yuga.Type.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));