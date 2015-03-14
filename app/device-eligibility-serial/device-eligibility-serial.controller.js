'use strict';
angular.module('planSelection')
    .controller('device-eligibility-serialCtrl', function($scope, $stateParams, $http, myservice, _) {

        console.log('  device-eligibilityCtrl  loaded....');
        // console.log(' underscore =' _);
        $scope.country = {};
        $scope.countries;
        $scope.plans_list;

        $scope.countryData;
        $scope.selectedPlans;
        $scope.currentCountry;
        $scope.awesomeUrl = myservice.awesomeUrl();


        $scope.countrylist = myservice.countrylist();



    var getUrl = $scope.countrylist;

    console.log(' 35 ---- country list ', $scope.countrylist);
        $http.get(getUrl)
            .success(function(response) {
                $scope.countries = response;
            });




        $scope.$watch("country.selected", function(customer) {
            console.log(' customer = ', customer);
            console.log(' customer.name= ', customer.name);
            $scope.currentCountry = customer.code;
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
                    console.log(' country code response 2 =', response.data);

                    $scope.countryData = response.data;

                    $scope.selectedPlans = null;

                    var filtered = _.filter(response, function(item) {
                        return item.on == "true";
                    });

                    console.log(' filtered --->', filtered);
                    $scope.selectedPlans = filtered;

                    console.log(' -- 77 --  $scope.selectedPlans.length   = ', $scope.selectedPlans.length);

                });

        });





        $scope.planClicked = function(awesomeThing) {




            console.log(' -- 86 --  $scope.selectedPlans.length   = ', $scope.selectedPlans.length);

            console.log('  90 _______$scope.selectedPlans.length   = ', $scope.selectedPlans.length);

            var selectedSkuId = _.pick(awesomeThing, 'skuId').skuId;

            console.log(' window.selectedSkuId = ', selectedSkuId);
            // console.log('window.awesomeThing = ', window.awesomeThing);

            var contains = _.contains($scope.selectedPlans, awesomeThing);
            console.log(' contains  =', contains);


            if (contains == true) {
                $scope.selectedPlans = _.without($scope.selectedPlans, _.findWhere($scope.selectedPlans, {
                    skuId: selectedSkuId
                }));
                console.log(' $scope.selectedPlans ~~~~~ > ', $scope.selectedPlans);

                console.log(' After $true pop   $scope.selectedPlans = ', $scope.selectedPlans);




            };
            if (contains == false) {
                $scope.selectedPlans.push(awesomeThing);
                console.log(' After $ false  push  $scope.selectedPlans = ', $scope.selectedPlans);
            };

            console.log(' -- 120 --  $scope.selectedPlans.length   = ', $scope.selectedPlans.length);


                if ($scope.selectedPlans.length >= 2) {
                    alert("fyi: You can only select one plan per country");
                    console.log(' this = ', this);
                    console.log('window.awesomeThing = ', awesomeThing);
                    return false;
                } else {};



        };





    });
