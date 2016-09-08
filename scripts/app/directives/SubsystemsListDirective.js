// Subsystems List directive
(function(){
  //Directive
  var directive = function(){
  	return{
  		restrict:'E',
  		scope:{},
  		controller: 'subsystemListController',
  		replace: true,
      // templateUrl: 'scripts/app/views/SubsystemsList.html'
      // template: '<div><div>{{robotConfig.subsystems}}</div><subsystem-card ng-repeat="subsystem in robotConfig.subsystems" data-subsystem="subsystem"></subsystem-card></div>'
      // template: '<div><div>{{robotConfig.subsystems}}</div><div ng-repeat="subsystem in robotConfig.subsystems">{{subsystem.subsystem}}</div></div>'
      // template: '<div><subsystem-card ng-if="!subsystem.isCore" ng-repeat="subsystem in robotConfig.subsystems" data-subsystem="subsystem"></subsystem-card></div>'
      template: 
         '<div layout="row" layout-wrap>'+
            '<subsystem-card ng-repeat="subsystem in robotConfig.subsystems" data-subsystem="subsystem"></subsystem-card>'+
         '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    // $log.info('subsystemListController');
    $scope.robotConfig = RobotService.robotConfig;
    $scope.userSubsystemFilter = function (item) { 
      $log.info('filtering item:');
      $log.info(item);
      return true; 
    };
  };

  angular.module('MDConsole')
  .directive('subsystemsList',[directive])
  .controller('subsystemListController',['$scope', '$log', 'RobotService', controller]);
}());
