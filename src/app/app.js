(function () {
    'use strict';

    var app = angular.module('app', [
          // Angular modules 
            'ngMaterial',

          // Custom modules 

          // 3rd Party Modules
             'ui.router',

    ]);

   // Theming
    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
         .primaryPalette('pink')
         .accentPalette('orange');

        $mdThemingProvider.theme('success-toast');
        $mdThemingProvider.theme('error-toast');
        $mdThemingProvider.theme('log-toast');
        $mdThemingProvider.theme('info-toast');
        $mdThemingProvider.theme('debug-toast');
        $mdThemingProvider.theme('warn-toast');

    });



    //Router-config
    //app.config(function ($stateProvider) {
    //    var dashboardState = {
    //        name: 'dashboard',
    //        url: '/dashboard',
    //        templateUrl: '/src/app/dashboard/dashboard.html',  // you need to write templateUrl not Template 
    //        // if you want it to ng-include itself
    //    }

    //    var profileState = {
    //        name: 'profile',
    //        url: '/profile',
    //        templateUrl: '/src/app/profile/profile.html',
    //    }

    //    $stateProvider.state(dashboardState);
    //    $stateProvider.state(profileState);
    //});


    //App Controller
    app.controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope','$http'];

    function AppCtrl($scope, $http) {
        var vm = this;
        

        //this was working with angular 1.5.3
        //$http.get("http://localhost:1903/api/Books/GetBooks")
        //    .success(function (response) {
        //        // no context issues since "vm" is in scope  
        //        console.log(response);
        //        vm.response = response;
        //    }).error(function (response) {
        //        // no context issues since "vm" is in scope  
        //        console.log(response);
        //        vm.response = response;
        //    });


        //this was working with angular 1.6.0
        $http({
            method: 'GET',
            url: 'http://localhost:1903/api/Books/GetBooks'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            vm.response = response;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            vm.response = response;
        });
    }

})();
