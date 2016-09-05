(function(){
	var controller = function ($scope, $log, RobotService){
		// $log.info('EventLogDirectiveController');
	    $scope.events = RobotService.events;
	    $scope.clear = function(){
	    	$log.info('clearing...');
	    	RobotService.clearEvents();
	    }
	};

    var directive= function (){
		return {
			restrict:'E',
			scope:{},
			controller: 'EventLogDirectiveController',
			replace: true,
			// templateUrl: "scripts/app/events/view/EventLog.html"
			template:
'<div class="mdl-layout mdl-js-layout">'+
  '<header class="mdl-layout__header mdl-layout__header--transparent">'+
    '<div class="mdl-layout__header-row">'+
      '<!-- Title -->'+
      '<span class="mdl-layout-title">Events ({{events.length}}) </span>'+
      '<!-- Add spacer, to align navigation to the right -->'+
      '<div class="mdl-layout-spacer"></div>'+
      '<!-- Navigation -->'+
      '<nav class="mdl-navigation">'+
      	'<i ng-click="clear()" class="material-icons">delete_forever</i>'+
      '</nav>'+
    '</div>'+
'</header>'+
'<main class="mdl-layout__content">'+
'<notification ng-repeat="event in events" event="event"></notification>'+
'</main>'+
'</div>'
		}
    };

	angular.module('MDConsole')
		.directive('eventLog', [directive])
		.controller('EventLogDirectiveController', ["$scope","$log",'RobotService', controller]);

}());