//declare the module and the app level controller
(function(){
	console.log('bootstrapping angular');
	//defining the application controller
	var appController = function($scope, $log, $attrs,RobotService){
		$log.info('MDConsoleController');
		$log.info($attrs);
	};

	angular.module('MDConsole',['ngMaterial'])
	 //  	.config(function($mdThemingProvider) {
	 //  		$mdThemingProvider.theme('default')
		// 	    .primaryPalette('grey')
		// 	    .accentPalette('orange')
		// 	    .warnPalette('red')
		// 	    .backgroundPalette('white')
		// 	    ;
		// })
		.controller('MDConsoleController',['$scope','$log', '$attrs', 'RobotService', appController])
}());
