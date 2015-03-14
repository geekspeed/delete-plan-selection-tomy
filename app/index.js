'use strict';


var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
});






var planSelection = angular.module('planSelection', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'ui.select', 'toaster'])

planSelection.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
        })

    .state('planSelection', {
        url: '/planSelection',
        templateUrl: 'app/planselection/planSelection.html',
        controller: 'MainCtrl'
    })

    .state('home.list', {
        url: ':id',
        templateUrl: 'app/main/partial-home-list.html',
        controller: 'idctr'

    })

    .state('upgrade-eligible', {
        url: '/marketing/eligibility/:id',
        templateUrl: 'app/upgrade-eligibility/upgrade-eligibility.html',
        controller: 'upgrade-eligibilityCtrl'
    })

    .state('device-eligibility', {
        url: '/marketing/device-eligibility',
        templateUrl: 'app/device-eligibility/device-eligibility.html',
        controller: 'device-eligibilityCtrl'
    })

    .state('device-eligibility-serial', {
        url: '/marketing/device-eligibility-serial',
        templateUrl: 'app/device-eligibility-serial/device-eligibility-serial.html',
        controller: 'device-eligibility-serialCtrl'
    })


    $urlRouterProvider.otherwise('/');


});



planSelection.controller('idctr', ['$http', '$scope', '$state', '$stateParams', 'myservice',
    function($http, $scope, $state, $stateParams, myservice) {


        $scope.awesomeUrl = myservice.awesomeUrl();

        console.log(' idctr 52  - upate the plan - calling ID controller - $stateParams =', $stateParams.id);
        $scope.idResponse = {};
        $scope.formData = {};
        var id = $stateParams.id
        console.log(' $scope. awesomeUrl  = ', $scope.awesomeUrl);
        var getUrl = $scope.awesomeUrl + "/marketing/getSku/" + id;
        console.log(' get Url = ', getUrl);

        var req = {
            method: 'GET',
            url: getUrl,
            headers: {
                'apikey': 'marketingAPIkey'
            },
        }


        $http(req).success(function(response) {
            console.log(' idResponse per skuId = ', response.data);
            $scope.idResponse = response.data;
            // $scope.idResponse.comments = null; 
            // $scope.idResponse.groupNumber = null; 
        }).error(function() {
            toaster.clear();
            toaster.pop('error', "Error found", null, '3000', 'toast-top-full-width');

            console.log('  error ');
        });




        // $http.get(getUrl)
        //     .success(function(response) {
        //         // console.log(' response for first = ', response);
        //         $scope.idResponse = response;
        //     });

        $scope.postData = function(idResponse) {
            console.log(' posti= ', idResponse);

            $http.post($scope.awesomeUrl + "/event/first.json")
                .success(function(response) {
                    console.log(' response for first = ', response);
                    $scope.idResponse = response;
                });
        }



        $scope.updateContent = function() {

            console.log('  update content clicked ', $scope.idResponse);

            // $scope.idResponse.comments = " 123- hello"; 
            var data  = $scope.idResponse;
            
            delete data.id;
            
            // data.groupNumber = 111; 
            // data.planId = "11155555"; 
            
            console.log('128 - later ---> update content clicked ', $scope.idResponse);

            var req = {
                method: 'PUT',
                url: 'http://arlobat-dev.netgear.com/hmsmarketing/marketing/plan',
                headers: {
                    'apikey': 'marketingAPIkey'
                },
                data: data
            }




            $http(req)
                .success(function(response) {
                    console.log(' response for update Content = ', response);
                }).error(function() {
                                toaster.clear();
                                toaster.pop('error', "Error found", null, '3000', 'toast-top-full-width');

                    console.log('  131 -  error  update http  ');
                });

        }
    }
]);






var planSelection = angular.module('planSelection');

planSelection.factory('_', ['$http', function($http) { // new trend factory
    // debugger;
    return window._;

}]);






planSelection.run(function($rootScope) {
    // $rootScope.selectedChangeEligibilityPlan = "Basic";
    console.log(' 14 - --- index.js  --  $rootScope.selectedChangeEligibilityPlan  = ', $rootScope.selectedChangeEligibilityPlan);
});




planSelection.directive('swapit', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            active: '=',
            lol: '&'
        },
        template: '<li ng-click="active = $id; lol({param: param});" class="select-show" ng-class="{active: $id === active}" ng-transclude></li>'
    }
})






// $(document).ready(function() {
//     console.log('   doc ready =');

//     setTimeout(function() {
//         $(":button").last().click();
//     }, 200);

//     $(":button").last().click();
//     console.log(' last button clicked');
// })
