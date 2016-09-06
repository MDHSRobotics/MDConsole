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
      template: '<div class="gameclock" layout="row" layout-wrap>'+
                  '<div flex="15">'+
                    '<div layout="column" layout-align="end start">'+
                      '<i class="material-icons" ng-class="{\'selected\':selectedIndex==0}" ng-click="onTabSelected(0,\'MATCH\')">schedule</i>'+
                      '<i class="material-icons" ng-class="{\'selected\':selectedIndex==1}" ng-click="onTabSelected(1,\'FPGA\')">timelapse</i>'+
                      '<i class="material-icons" ng-class="{\'selected\':selectedIndex==2}" ng-click="onTabSelected(2,\'CORRECTION\')">settings</i>'+
                    '</div>'+
                  '</div>'+
                  '<div flex="70">'+
                    '<div layout="column">'+
                      '<div class="clock-label" ng-show="selection===\'MATCH\'">match time</div>'+
                      '<div class="clock-label" ng-show="selection===\'FPGA\'">FPGA clock</div>'+
                      '<div class="clock-label" ng-show="selection===\'CORRECTION\'">correction</div>'+
                      '<div class="clock-time-dispay" ng-show="selection===\'MATCH\'">{{clock.matchTime}}</div>'+
                      '<div class="clock-time-dispay" ng-show="selection===\'FPGA\'">{{clock.fpgaTime}}</div>'+
                      '<div class="clock-time-dispay" ng-show="selection===\'CORRECTION\'">{{clock.correction}}</div>'+
                    '</div>'+
                  '</div>'+
                  '<div flex="15">'+
                    '<div layout="column" layout-fill layout-align="end end">'+
                      '<i class="material-icons" ng-click="increaseClock()" ng-show="selection!=\'FPGA\'" ng-class="{\'selected\':selectedIndex==0}" ng-click="onTabSelected(0,\'MATCH\')">add</i>'+
                      '<i class="material-icons" ng-click="reduceClock()"   ng-show="selection!=\'FPGA\'" ng-class="{\'selected\':selectedIndex==1}" ng-click="onTabSelected(1,\'FPGA\')">remove</i>'+
                    '</div>'+
                  '</div>'+
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
