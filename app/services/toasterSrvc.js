'use strict';
angular.module('planSelection')
    .service('toasterSrvc', function (toaster) {
        console.log('27 -  tstr src - toaster dependency = ', toaster);
        var property;

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
    });


    