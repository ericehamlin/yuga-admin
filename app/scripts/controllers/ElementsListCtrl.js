'use strict';

function ElementsListCtrl($scope) {
    setTimeout(function(){
        $("#elements-list .section-inner").accordion({
            header: "div.list-title",
            heightStyle: "fill",
            animate: {duration: 200}
        });
    }, 1000);
}