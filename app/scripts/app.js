'use strict';

angular.module('yugaAdmin', ['Command', 'ResourceBundle'])

    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    })

    .run(function($rootScope, ResourceBundle) {
        $rootScope.resourceBundle = function() {
            return ResourceBundle;
        };
    });
