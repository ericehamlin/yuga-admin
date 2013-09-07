'use strict';

function ElementsListCtrl($scope) {
    setTimeout(function(){
        $("#elements-list .section-body").accordion({
            header: "div.list-title",
            heightStyle: "fill",
            animate: {duration: 200}
        });
    }, 1000);

    $scope.events = [
        {
            name: "Event Name"
        },
        {
            name: "Revent Name",
            selected: true
        },
        {
            name: "Herve Villachez",
            selectedSecondary: true
        }
    ];

    $scope.types = [
        {
            name: "Person",
            icon: '&#xf025;'
        },
        {
            name: "Place",
            icon: '&#xf041;',
            selected: true
        },
        {
            name: "Thing",
            icon: '&#xf02d;'
        }
    ];

    $scope.aspects = [
        {
            name: "Johnny",
            icon: '&#xf025;',
            selected: true,
            color: "#00f"
        },
        {
            name: "Europe",
            icon: '&#xf041;',
            color: '#0f0'
        },
        {
            name: "Downtown Webberville",
            icon: '&#xf041;',
            color: '#f00'
        }
    ];
}

ElementsListCtrl.$inject = ['$scope'];