//declare the module and the app level controller
(function(){
	console.log('bootstrapping angular');
	//defining the application controller
	var appController = function($scope, $log, $attrs,RobotService){
		// $log.info('MDConsoleController');
		// $log.info($attrs);
		$scope.getEventsCount = function(){
			return RobotService.getEventsCount();
		}
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
		.controller('MDConsoleController',['$scope','$log', '$attrs', 'RobotService', appController])
}());
