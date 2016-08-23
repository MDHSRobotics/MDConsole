// Command List directive
(function(){
  //Directive
  var directive = function(){
  	return{
  		restrict:'E',
  		scope:{},
  		controller: 'commandsListController',
  		replace: true,
      // templateUrl: 'scripts/app/views/CommandsList.html'
      template: '<div><div ng-click="commandClick(command)" ng-repeat="command in robotConfig.commands">{{command.command}}</div></div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    $log.info('commandsListController');
    $scope.robotConfig =  RobotService.robotConfig;
    $scope.commandClick = function(command){
      $log.info('command clicked:');
      $log.info(command);
    }
  };

  angular.module('MDConsole')
  .directive('commandsList',[directive])
  .controller('commandsListController',['$scope', '$log', 'RobotService', controller]);
}());
