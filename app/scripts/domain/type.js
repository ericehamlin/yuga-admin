(function (yuga) {

    yuga.Type = function (initProperties) {

        this.tempData = {
            selected: false,
            selectedSecondary: false
        };

        this.fields = [];

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

        angular.extend(this, initProperties);
    };

    yuga.Type.prototype = new yuga.DomainObject();

}(window.yuga = window.yuga || {}));