'use strict';
angular.module('planSelection')
    .service('myservice', function() {

        console.log('services loaded ..... ');


        this.countrylist = function(optional) {
            var url = "https://arlo.netgear.com/json/countrycodes.json";
            return url;
        }


        this.awesomeUrl = function(optional) {
            // var url = "http://vznotify1.netgear.com";    
            var url = "http://localhost:1111";

            // var url = "https://arlodev.netgear.com/hmsmarketing" 
            var url = "http://arlobat-dev.netgear.com/hmsmarketing"
            return url;
        }

    })


.service('sharedProperties', function() {
    var property;

    return {
        getProperty: function() {
            return property;
        },
        setProperty: function(value) {
            property = value;
        }
    };
})

.service('toasterSrvc', function(toaster) {
    // debugger; 
    console.log(' loading TOASTER service ');
    console.log('27 -  tstr src - toaster dependency = ', toaster);
    var property = 9

    return {
        getProperty: function() {
            return property;
        },
        setProperty: function(value) {
            property = value;
        }
    };
});
