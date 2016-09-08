//declare the module and the app level controller
(function(){
	console.log('bootstrapping angular');
	//defining the application controller
	var appController = function($scope, $log, $attrs, $mdSidenav, RobotService){
		// $log.info('MDConsoleController');
		// $log.info($attrs);
		$scope.getEventsCount = function(){
			return RobotService.getEventsCount();
		}
		$scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function(){
    	    return $mdSidenav('right').isOpen();
	    }

		function buildToggler(navID) {
	      return function(mode) {
	        // Component lookup should always be available since we are not using `ng-if`
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            $log.debug("toggle " + navID + " is done");
	            $log.debug("mode:" + mode);
	          });
	      }
	    }    
	};
	var sideNavController = function($scope, $log, $attrs, $mdSidenav, RobotService){
		$scope.close = function () {
		      // Component lookup should always be available since we are not using `ng-if`
		      $mdSidenav('right').close()
		        .then(function () {
		          $log.debug("close RIGHT is done");
		        });
		};	
	};

	angular.module('MDConsole',['ngMaterial'])
	.config(['$httpProvider', function ($httpProvider) {
	            // enable http caching
	           $httpProvider.defaults.cache = false;
	      }])
  	 	.config(function($mdThemingProvider) {
 	 		$mdThemingProvider.theme('default')
		    .primaryPalette('grey')
		    .accentPalette('orange')
		    .warnPalette('red');
		})
		.controller('MDConsoleController',['$scope','$log', '$attrs', '$mdSidenav', 'RobotService', appController])
		.controller('RightCtrl', ['$scope','$log', '$attrs', '$mdSidenav', 'RobotService', sideNavController])
		;
}());
