'use strict';

// http://goo.gl/kCI2ti

angular.module('planSelection')
    .controller('device-eligibilityCtrl', function($scope, $stateParams, $http, myservice, toaster, _) {

        console.log(' Country device-eligibilityCtrl  loaded....');

        toaster.pop('note', "Pick a country below....", null, null, 'template');
        $scope.country = {};
        $scope.countries;
        $scope.plans_list;

        $scope.countryData;
        $scope.selectedPlans;
        $scope.currentCountry;
        $scope.awesomeUrl = myservice.awesomeUrl();
        $scope.countrylist = myservice.countrylist();
        $scope.selectedPlan;


        function grabDefaultPlan(currentCountry) {
            console.log(' iffy --  grabDefaultPlan  ----  inside grab Default Plan....');
            // debugger; 
            console.log(' country selected  ->>>', currentCountry);
            var allDevice = $scope.awesomeUrl + "/marketing/eligible/device";
            var req = {
                method: 'GET',
                url: allDevice,
                headers: {
                    'apikey': 'marketingAPIkey'
                },
            }

            $http(req)
                .success(function(response) {
                    // debugger; 
                    console.log('allDevice  165 ', response);
                    console.log(' allDevice  166 response.planId  ', response.data);

                    var planCountryList = response.data;

                    console.log(' find where  = ', _.findWhere(planCountryList, {
                        serialNumber: $scope.currentCountry
                    }));

                    var findwher = _.findWhere(planCountryList, {
                        serialNumber: $scope.currentCountry
                    });
                    $scope.selectedPlan = findwher.planId;

                    console.log('selectedPlan = ', $scope.selectedPlan);

                }).error(function() {
                    console.log(' error in allDevice call ');
                })


        };








        var getUrl = $scope.countrylist;

        console.log(' 35 ---- country list ', $scope.countrylist);
        $http.get(getUrl)
            .success(function(response) {
                $scope.countries = response;
            });




        $scope.$watch("country.selected", function(customer) {
            console.log(' selected a country..........................  call default plan for that country');


            console.log(' customer = ', customer);
            console.log(' customer.name= ', customer.name);
            $scope.currentCountry = customer.code;

            grabDefaultPlan($scope.currentCountry);
        });



        $scope.$watch("currentCountry", function(currentCode) {

            console.log(' currentCountry $watch called');

            var c = $scope.currentCountry;

            console.log('  c  = ', c);
            console.log('  currentCode  = ', currentCode);

            var getUrl = $scope.awesomeUrl + "/marketing/eligible/" + c;



            var req = {
                method: 'GET',
                url: getUrl,
                headers: {
                    'apikey': 'marketingAPIkey'
                },
            }


            $http(req)
                .success(function(response) {

                    console.log('country code response  84 ', response);

                    console.log(' country code response 2 =', response.data);
                    // debugger; 
                    $scope.countryData = response.data;

                    $scope.selectedPlans = null;

                    var filtered = _.filter(response, function(item) {
                        return item.on == "true";
                    });

                    console.log(' filtered --->', filtered);
                    $scope.selectedPlans = filtered;
                    console.log(' -- 77 --  $scope.selectedPlans.length   = ', $scope.selectedPlans.length);
                    // console.clear()
                    // $scope.selectedPlans.push(awesomeThing);
                    // debugger;     
                });

        });





        $scope.planClicked = function(awesomeThing) {

            console.log(' awesomeThing = ', awesomeThing);
            $scope.selectedPlan = awesomeThing.planId;
            console.log('  make a post call here ...... ~~~~~~~~~~~~~~~');

        };


        $scope.updateCountryDefaultPlan = function() {
            console.log(' update updateCountryDefaultPlan ...........');

            var getUrl = $scope.awesomeUrl + "/marketing/eligible/device";

            var data = {}; 
            data.serialNumber = $scope.currentCountry; 
            data.planId = $scope.selectedPlan; 
            data.createdDate = "1423506085";                         

            console.log(' data for updating coutnry defualt plan = ', data);

            var req = {
                method: 'POST',
                url: getUrl,
                headers: {
                    'apikey': 'marketingAPIkey'
                },
                data: data
            }

            console.log(' device - eligi   ->  data ', data);
// debugger; 


            $http(req)
                .success(function(response) {
                    console.log(' response for update Content = ', response);
                }).error(function() {
                toaster.clear();
                toaster.pop('error', "Error found", null, '3000', 'toast-top-full-width');

                    console.log('  131 -  error  update http  ');
                });


        }


    });
