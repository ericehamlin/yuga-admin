'use strict';

function ElementsListCtrl($scope) {
    setTimeout(function(){
        alert("he");
        $("#elements-list").accordion({
            header:"h5",
            animate: {duration: 100}
        });
    }, 2000);
}