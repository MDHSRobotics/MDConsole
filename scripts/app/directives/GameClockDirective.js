// Subsystem Card directive
(function(){
  //Directive
  var directive = function(){
  	return{
  		restrict:'E',
  		scope:{},
  		controller: 'gameClockController',
  		replace: true,
      // templateUrl: 'scripts/app/views/SubsystemCard.html'
      template: '<div>'+
                  '<span>fpgaTime<span/>'+
                  '<span>'+ '{{clock.fpgaTime}}'+
                  '</span>'+
                '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    $log.info('gameClockController');
    $log.info('fpgaTime:');
    $log.info(RobotService.clock);
    $scope.clock = RobotService.clock;
  };

  angular.module('MDConsole')
  .directive('gameClock',[directive])
  .controller('gameClockController',['$scope', '$log', 'RobotService', controller]);
}());
