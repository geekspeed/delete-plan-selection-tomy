planSelection.controller('upgrade-eligibilityCtrl', function($scope, $state, $http, $modal, $log, $stateParams, _, myservice,toaster, sharedProperties, $q, $rootScope) {


    console.log('  upgrade eligibilityCtrl  loaded....  &  $stateParams', $stateParams.id);

    console.log('6 ---$stateParams.id  in upgrade - eligibility controller    = ', $stateParams.id);

    console.log('8 - upgrade-eli-Ctrl |  $rootScope.selectedChangeEligibilityPlan = ', $rootScope.selectedChangeEligibilityPlan);

    
   toaster.pop('wait', "loading....", null, null, 'template');

    $scope.currentPlan = $stateParams.id;
    // console.log('5 --- underscore ='_);
    $scope.country = {};
    $scope.countries;
    $scope.plans_list;
    $scope.individualData;
    $scope.selectedPlans;
    $scope.currentCountry;
    $scope.awesomeUrl = myservice.awesomeUrl();

    $scope.countrylist = myservice.countrylist();
    $scope.test = null;

    $scope.array_of_plansIds = null;
    $scope.array_of_plansNames = null;
    $scope.finalData = [];

    $scope.selectedBlue = null; 


    var getUrl = $scope.countrylist;
    console.log(' 35 ---- country list ', $scope.countrylist);

    $http.get(getUrl)
        .success(function(response) {
            $scope.countries = response;
        });

    function callPlanId(obj, planid) {
        // debugger;
        console.log(' ~~~~~~~~~~~~~~~~~~~ called planid = ', planid);
        var getUrl = $scope.awesomeUrl + "/marketing/Get_Eligibility/" + planid;
        console.log(' 32 -- planNames = ', planNames);
        var planNames = [];
        $http.get(getUrl)
            .success(function(response) {
                // debugger;
                console.log(' 30-- -response from Get Eli  response = ', response);
                console.log(' 30-- -response from Get Eli  plan id = +', planid);
                _.each(response.data, function(val, i) {
                    var current = response.data;
                    console.log(' 46 each   val =', val);
                    console.log(' 48 each   val.planName =', val.planName);
                    console.log(' 49 each   i =', i);
                    planNames.push(val.planName);
                })
                console.log(' 53 ----- planNames  = ', planNames);
                obj['list'] = planNames;
                $scope.finalData.push(obj);
                console.log(' 64 ---- $scope.finalData  = ', $scope.finalData);
            });
    }








function callCountryData () {
    // toaster.pop('success', "Loading Plans", null, '3000', 'toast-top-full-width');
        //  CALL starts here  i.e get all the plans for that country. 
    var CE_Url = $scope.awesomeUrl + "/marketing/eligible/" + $stateParams.id;
    console.log(' 73 CE_Url  = ', CE_Url);
    $scope.items = null;

    var req = {
        method: 'GET',
        url: CE_Url,
        headers: {
            'apikey': 'marketingAPIkey'
        },
    }

    $http(req).success(function(response) {

        console.log(' response 4 fewThings = ', response.data);
        $scope.bluePlans = response.data;
        console.log(' 86 - bluePlans = ', $scope.bluePlans);
        $scope.fewThings = response.data;
        console.log(' 88 ----- INITIAL  $scope.fewThings  = ', $scope.fewThings);
        console.log(' 89 -----  $scope.individualData  = ', $scope.individualData);
        console.log(' ****************************************************************************************************************');
        // debugger; 
        
        _.each($scope.fewThings, function(post) {
            console.log(' ============================  each few-things start ========================'); console.log(' fewThings each post = ', post); console.log(' fewThings post - post.planId = ', post.planId);
            // get the post id from here awesomeThings
            var filteredPlanId = post.planId;
            console.log(' filteredPlanId  = ', filteredPlanId);
            //  search for the same id in individualData list. 
            var filteredPlanName = _.where($scope.individualData, { planId: filteredPlanId })[0].planName;

            console.log('103 -  filteredObj = ', filteredPlanName);
            post.planName = filteredPlanName;
            post.innerPlan = {};
            post.innerPlan.planIds = post.planIds;    console.log(' 111 -  post.innerPlanIds', post.innerPlanIds);   console.log(' ---------------------------------- Midd  ----------------------------------');
            var planNames_arr = [];
            _.each(post.planIds, function(pId) {
                console.log('114 post.planIds  = ', post.planIds);
                console.log('111 - current planId =', pId);
                var innerPlanName = _.where($scope.individualData, {
                    planId: pId
                })[0].planName;
                console.log('114 -  filteredObj = ', innerPlanName);
                planNames_arr.push(innerPlanName);
                console.log('118 -  planNames = ', planNames_arr);
                post.planNames = planNames_arr;
                console.log(' 121 - post = ', post);
            });
            post.innerPlan.planNames = planNames_arr;
            console.log(' ++++++++++++++++++++++++++++ each finished ++++++++++++++++++++++ post =', post);
            toaster.clear();
        });
           
            // $state.reload(); 

    }).error(function() {
        console.log('error 2');
        toaster.pop('error', "Error found", null, '3000', 'toast-top-full-width');
    });
}




    console.log('158 - --- $rootScope  =  ', $rootScope);
    console.log('92 - --- $rootScope.selectedChangeEligibilityPlan = ', $rootScope.selectedChangeEligibilityPlan);
    $scope.test = $rootScope.selectedChangeEligibilityPlan;

    console.log(' 96 -  $scope.test  = ', $scope.test);





    $scope.blueDeleteClick = function(item) {
        console.log(' delete blueDeleteClick ', item);
    }


    $scope.editClick = function(item, $event) {
        console.log(' 131 - edit this plan', item);

    }

    $scope.addClick = function(item) {
        console.log(' add a new plan', item);
    }


    $scope.selectedIndex = 0;


    $scope.pinkClicked = function(item, plan) {
        // console.log(' ~~~~~~~ inside pinkClicked ~~~~~~~~~');
        // console.log('2 - pink - item =', item);
        // console.log('2 - pink - plan =', plan);
        // $scope.selectedIndex = item;
    };





    $scope.addPlanEligibility = function() {
        console.log(' $rootScope.selectedChangeEligibilityPlan  = ', $rootScope.selectedChangeEligibilityPlan);

        console.log('179 -  blue plans = ', $scope.bluePlans);

        var foundPink = _.findWhere($scope.bluePlans, {
            planId: $scope.selectedBlue
        });
        console.log(' foundPink from the list of pinks under that blue plan= ', foundPink);

        var blues = foundPink.planIds;
        console.log(' blue  - = ', blues);

        var blueInners = blues.slice();
        console.log(' brand  new  blue-Inners ', blueInners);

        // blueInners.pop(item);
        blueInners.push($scope.chkSelectedPlan); 

        // var rem_blueInners = _.without(blueInners, item)
        console.log(' after adding  blueInners = ', blueInners);


        var data = {};

         if(! $rootScope.selectedChangeEligibilityPlan.id){
            var a = 'hola'; 
            console.log('  id is undefined ');
            debugger; 
         }

        console.log(' $rootScope.selectedChangeEligibilityPlan.id;  = ', $rootScope.selectedChangeEligibilityPlan.id);

        data.id = $rootScope.selectedChangeEligibilityPlan.id;
        // console.log(' $rootScope selected  = ', $rootScope.selectedChangeEligibilityPlan.id);
        // console.log(' data.id = ', data.id);
        data.planId = $scope.selectedBlue;
        // console.log('200 -> blue Inners = ', blueInners);
        data.planIds = blueInners.slice(); 
        var getUrl = $scope.awesomeUrl + "/marketing/eligible/" + $rootScope.selectedChangeEligibilityPlan.id;
        console.log(' geturl = ', getUrl);

        console.log(' *********************** ');

        var req = {
            method: 'POST',
            url: getUrl,
            headers: {
                'apikey': 'marketingAPIkey'
            },
            data: data
        }

console.log('addPlanEligibility  -> data  = ', data );
// debugger; 
        $http(req).success(function(response) {
            toaster.pop('success', "Plans-Added Successfully", null, '3000', 'toast-top-full-width');
            $state.reload();  
            console.log(' state. not reload called....'); 

        }).error(function() {
            console.log(' error delete pink plan');

        });
    }








    $scope.pinkDeleteClick = function(item, plan) {

        console.log(' ~~~~~~~~ inside pink Delete ~~~~~~~~~');

        console.log('2 - pink - item full =', item);
        console.log('2 - blue - plan full =', plan);

        console.log(' $rootScope.selectedChangeEligibilityPlan  = ', $rootScope.selectedChangeEligibilityPlan);

        var foundPink = _.findWhere($scope.bluePlans, {
            planId: plan.planId
        });
        console.log(' foundPink from the list of pinks under that blue plan= ', foundPink);

        var blue = foundPink;
        console.log(' blue  - = ', blue);

        var blueInners = blue.planIds.slice();
        console.log(' brand  new  blue-Inners ', blueInners);

        // blueInners.pop(item);
        var rem_blueInners = _.without(blueInners, item)
        console.log(' after removing  rem_blueInners = ', rem_blueInners);

// debugger; 

        var data = {};
        data.id = $rootScope.selectedChangeEligibilityPlan.id;
        console.log(' $rootScope selected  = ', $rootScope.selectedChangeEligibilityPlan.id);
        console.log(' data.id = ', data.id);
        data.planId = blue.planId;
        data.planIds = rem_blueInners;

        console.log(' 231 data   ---> ', data);

        // var   = $rootScope.selectedChangeEligibilityPlan.planId;
        var getUrl = $scope.awesomeUrl + "/marketing/eligible/" + $rootScope.selectedChangeEligibilityPlan.id;
        console.log(' geturl = ', getUrl);

        console.log(' *********************** ');

        var req = {
            method: 'POST',
            url: getUrl,
            headers: {
                'apikey': 'marketingAPIkey'
            },
            data: data
        }
        $http(req).success(function(response) {
            toaster.clear(); 
            toaster.pop('success', "plan successfully deleted", null, '3000', 'toast-top-full-width');

            console.log(' initial individualData response 187 = ', response);
             $state.reload();  //refres

        }).error(function() {
            toaster.clear();
            toaster.pop('error', "Error found", null, '3000', 'toast-top-full-width');
            console.log(' error delete pink plan');
        });
    }



    $scope.blueClicked = function(item) {
        console.log(' blue clicked ', item);

        $scope.selectedBlue = item.planId; 
        console.log(' $scope.selectedBlue  = ', $scope.selectedBlue);
        
        toaster.clear();
        toaster.pop('note', "Hi :-)", "please pick a plan from below");
    }

    $scope.blueselectedIndex = 0;


    $scope.blueitemClicked = function(item) {
        console.log('blueitemClicked =', item);
        $scope.blueselectedIndex = item;
    };


// iffi 

    (function() {    // get data for individualData  = 
        // var getUrl = $scope.awesomeUrl + "/marketing/eligible/" + c;  
        var getUrl = $scope.awesomeUrl + "/marketing/plan/" + $stateParams.id;

        var req = {
            method: 'GET',
            url: getUrl,
            headers: {
                'apikey': 'marketingAPIkey'
            },
        }

        $http(req).success(function(response) {
            console.log(' initial individualData response 187 = ', response.data);
            $scope.individualData = response.data;
            $scope.selectedPlans = null;

            var filtered = _.filter(response, function(item) {
                return item.on == "true";
            });

            console.log(' filtered --->', filtered);
            $scope.selectedPlans = filtered;

            callCountryData(); 

        }).error(function() {
            console.log('  error 2');
        });



        $http.get(getUrl)
            .success(function(response) {
                console.log(' country code response 2 =', response);
                $scope.individualData = response;
                $scope.selectedPlans = null;

                var filtered = _.filter(response, function(item) {
                    return item.on == "true";
                });

                console.log(' filtered --->', filtered);
                $scope.selectedPlans = filtered;
            });
    }());




        $scope.planClicked = function(awesomeThing) {
        
            toaster.clear();
            toaster.pop('note', "Right on !", "Click confirm Add !!");

            console.log(' awesomeThing = ', awesomeThing);
            $scope.chkSelectedPlan = awesomeThing.planId;
            console.log(' plan check clicked fun called .......~~~~~~~~~~~~~~~  $scope.chkSelectedPlan', $scope.chkSelectedPlan);

        };









    $scope.resetPlanEligibility = function() {
        console.log(' clicked resetPlanEligibility()');

        var getUrl = $scope.awesomeUrl + "/marketing/eligible/planId";
        console.log(' reset -> get url = ', getUrl);
        var data = {};
        data.id = "planId";
        data.planId = "10980421";
        // data.planIds = [
        //     "10980423",
        //     "10980422",
        //     "10980421",
        //     "11060425"
        // ];

        data.planIds = [
            "10980423",
            "10980422",
            "11060425",
            "10980421"
        ];

        console.log(' reset  data =  >   ', data);

        var req = {
            method: 'POST',
            url: getUrl,
            headers: {
                'apikey': 'marketingAPIkey'
            },
            data: data
        }


        $http(req)
            .success(function(response) {
                console.log(' response for update Content = ', response);
                $state.reload(); 
                console.log(' state. reload called....');

            }).error(function() {
                console.log('  131 -  error  update http  ');
            });


    }









    console.log(' 451 - myservice.awesomeUrl(); ', myservice.awesomeUrl());

    console.log(' 451 - sharedProperties ', sharedProperties.getProperty());
    // debugger; 
    $scope.sharedProperties = sharedProperties.getProperty();

    console.log(' 455 - sharedProperties ', sharedProperties);

});
