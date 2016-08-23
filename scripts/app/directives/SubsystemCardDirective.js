// Subsystem Card directive
(function(){
  //Directive
  var directive = function(){
  	return{
  		restrict:'E',
  		scope:{subsystem:"="},
  		controller: 'subsystemCardController',
  		replace: true,
      // templateUrl: 'scripts/app/views/SubsystemCard.html'
      template: '<div><div>subsystem: {{subsystem.subsystem}}</div><div>{{subsystem}}</div>'+
                    '<setting ng-repeat="setting in subsystem.settings" data-setting="setting"></setting>'+
                    '<sensor ng-repeat="sensor in subsystem.sensors" data-sensor="sensor"></sensor>'+
                '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    $log.info('subsystemCardController');
    $log.info('subsystem:');
    $log.info($scope.subsystem);
  };

  angular.module('MDConsole')
  .directive('subsystemCard',[directive])
  .controller('subsystemCardController',['$scope', '$log', 'RobotService', controller]);
}());
