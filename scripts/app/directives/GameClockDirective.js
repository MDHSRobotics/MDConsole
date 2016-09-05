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
'<table style="margin-left:10px">'+
  '<tr><td><table>'+
    '<tr><td class="clock-time-label"><span>time</span></td></tr>'+
    '<tr><td style="min-width: 160px; text-align: right;">'+
      '<span ng-show="selection===\'MATCH\'" class="clock-time-dispay">{{clock.matchTime}}</span>'+
      '<span ng-show="selection===\'FPGA\'" class="clock-time-dispay">{{clock.fpgaTime}}</span>'+
      '<span ng-show="selection===\'CORRECTION\'" class="clock-time-dispay">{{clock.correction}}</span>'+
    '</td></tr>'+
  '</table></td>'+
  '<td><table>'+
    '<tr><td><div class="clock-adjust-controls">'+
      '<div ng-show="selection!=\'FPGA\'"><button ng-click="increaseClock()" class="mdl-button mdl-js-button mdl-button--icon  mdl-button--colored mdl-button--primary">'+
        '<i class="material-icons">arrow_drop_up</i>'+
      '</button></div>'+
      '<div ng-show="selection!=\'FPGA\'"><button ng-click="reduceClock()" class="mdl-button mdl-js-button mdl-button--icon  mdl-button--colored mdl-button--primary">'+
        '<i class="material-icons">arrow_drop_down</i>'+
      '</button></div>'+
      '</div>'+
    '</td></tr>'+
  '</table></td>'+
  '</tr>'+
  '<tr><td colspan="2">'+
  '<i class="material-icons" ng-class="{\'selected\':selectedIndex==0}" ng-click="onTabSelected(0,\'MATCH\')">schedule</i>'+
  '<i class="material-icons" ng-class="{\'selected\':selectedIndex==1}" ng-click="onTabSelected(1,\'FPGA\')">timelapse</i>'+
  '<i class="material-icons" ng-class="{\'selected\':selectedIndex==2}" ng-click="onTabSelected(2,\'CORRECTION\')">settings</i>'+
  '</td></tr>'+
'</table>'+
                '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    // $log.info('gameClockController');
    $scope.clock = RobotService.clock;
    $scope.isFMSAttached = RobotService.isFMSAttached;
    $scope.onTabSelected = function(index,choice,watcher){
       // $log.info('clock tab selection: '+choice);
        $scope.selection = choice;
        $scope.selectedIndex=index;
        if(!watcher && $scope.isDefault) $scope.isDefault = false;
    };  
    $scope.isDefault = true;
    $scope.onTabSelected(1,'FPGA',true);
    $scope.reduceClock = function(){
      RobotService.clockCorrectionDecrease();
    };
    $scope.increaseClock = function(){
      RobotService.clockCorrectionIncrease();
    };

    $scope.$watch(function() {
      return RobotService.isFMSAttached;
    },function(){
      if($scope.isDefault && RobotService.isFMSAttached && $scope.selection!='MATCH'){
        $scope.onTabSelected(0,'MATCH',true);
      }
      if($scope.isDefault && !RobotService.isFMSAttached && $scope.selection!='FPGA'){
        $scope.onTabSelected(1,'FPGA',true);
      }      
    });
  };

  angular.module('MDConsole')
  .directive('gameClock',[directive])
  .controller('gameClockController',['$scope', '$log', 'RobotService', controller]);
}());
