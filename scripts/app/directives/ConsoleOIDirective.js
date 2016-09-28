// Console OI directive
(function(){
  //Directive
  var directive = function(){
  	return{
  		restrict:'E',
  		scope:{},
  		controller: 'consoleOIController',
  		replace: true,
      // templateUrl: 'scripts/app/views/CommandsList.html'
      template: 
      '<div layout="column">'+
          // '<div>Rumbles:{{robotConfig.consoleOI.rumbles}}</div>'+
          '<div>Commands:</div>'+
        // '<div>Console OI Configuration:</div><div>{{robotConfig.consoleOI}}</div>'+
          // '<div ng-repeat="rumble in robotConfig.consoleOI.rumbles">{{rumble}}</div>'+
        
          '<console-button ng-repeat="button in robotConfig.consoleOI.buttons" data-button="button"></console-button>'+
       
        // '<console-axis ng-repeat="axis in robotConfig.consoleOI.axis" data-axis="axis"></console-axis>'+
        
      '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    // $log.info('consoleOIController');
    $scope.robotConfig =  RobotService.robotConfig;

  };

  angular.module('MDConsole')
  .directive('consoleOi',[directive])
  .controller('consoleOIController',['$scope', '$log', 'RobotService', controller]);
}());
