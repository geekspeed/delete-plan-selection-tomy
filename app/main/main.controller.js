'use strict';

angular.module('planSelection')
    .controller('MainCtrl', function($scope, $http, $resource, myservice, sharedProperties, $rootScope, toaster) {
        console.log('main controller loaded .... 2');

toaster.pop('wait', "loading....", null, null, 'template');

        // var toaster = new toaster('info', 'toast-top-full-width', 'top full width')
        // new Toast('warning', 'toast-top-left', 'This is positioned in the top left. You can also style the icon any way you like.'),
        $scope.pop = function() {
            toaster.pop('success', "title-success", null, '3000', 'toast-top-full-width');

            // toaster.pop('wait', "Retreiving data....", null, null, 'template');

            poper('success', "title-success", null, '3000', 'toast-top-full-width'); 

        };




        $scope.clearToast = function() {
            toaster.clear();
        };


        $scope.formData = {};
        $scope.awesomeUrl = myservice.awesomeUrl();
        var getUrl = $scope.awesomeUrl + "/marketing/getSku";


        var req = {
            method: 'GET',
            url: getUrl,
            headers: {
                'apikey': 'marketingAPIkey'
            },
        }


        $http(req).success(function(response) {
            console.log(' response 2 - = ', response.data);
            $scope.awesomeThings = response.data;
            toaster.clear();
        }).error(function() {
            console.log('  error 2');
            toaster.clear();
            toaster.pop('error', "Error found", null, '3000', 'toast-top-full-width');
        });


        // $http.get(getUrl)                       
        //     .success(function(response) {
        //         console.log(' response  = ', response);
        //         $scope.awesomeThings = response; 
        //     });


        $scope.logObject = function() {
            console.log('logi', $scope.awesomeThing);
        }


        $scope.saveRootPlan = function(id) {
            // debugger;
            console.log(' 40 - clicked saveRootPlan');
            sharedProperties.setProperty(id);

            // $rootScope.foo = id; 
            // console.log(' 44-  $rootScope.foo ', $rootScope.foo );

            // console.log(' main - 42 - sharedProperties ', sharedProperties.getProperty() );

            // console.log(' 455 - sharedProperties ', sharedProperties);
            console.log(' 39 main - $rootScope.selectedChangeEligibilityPlan   id =', id);
            console.log('***********************************  saveRootPlan clicked  &  id =', id.planName);
            $rootScope.selectedChangeEligibilityPlan = id;


            console.log('44 main -  $rootScope.selectedChangeEligibilityPlan =', $rootScope.selectedChangeEligibilityPlan);

            console.log(' 40   stuff  $scope.awesomeThing.planName ', $scope.awesomeThing);
            // debugger; 
        }


        console.log(' Main controller loaded ....  ');

        $scope.awesome = myservice.awesomeUrl();
        console.log('  $scope.awesome  = ', $scope.awesome);

        // console.clear()

    });
