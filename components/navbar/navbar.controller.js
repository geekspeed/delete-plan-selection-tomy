'use strict';

angular.module('planSelection')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.date = new Date();


    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };


  });
