(function(){
	var controller = function ($scope, $log, EventService){
	    $scope.events = EventService.events;
	    $scope.clear = function(){
	    	// $log.info('clearing...');
	    	EventService.clear();
	    }
	};

    var directive= function (){
		return {
			restrict:'E',
			scope:{},
			controller: 'EventLogDirectiveController',
			replace: true,
			templateUrl: "scripts/app/events/view/EventLog.html"
		}
    };

	angular.module('events')
		.directive('eventLog', [directive])
		.controller('EventLogDirectiveController', ["$scope","$log",'EventService', controller]);

}());