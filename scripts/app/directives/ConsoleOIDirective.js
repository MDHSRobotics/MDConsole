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
      '<div>'+
        '<div>Console OI Configuration:</div><div>{{robotConfig.consoleOI}}</div>'+
        '<console-button ng-repeat="button in robotConfig.consoleOI.buttons" data-button="button"></console-button>'+
        '<console-axis ng-repeat="axis in robotConfig.consoleOI.axis" data-axis="axis"></console-axis>'+
      '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    $log.info('consoleOIController');
    $scope.robotConfig =  RobotService.robotConfig;
    $scope.commandClick = function(command){
      $log.info('command clicked:');
      $log.info(command);
    }
  };

  angular.module('MDConsole')
  .directive('consoleOi',[directive])
  .controller('consoleOIController',['$scope', '$log', 'RobotService', controller]);
}());
