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
      template: 
            '<div><div class="clock">'+
              '<div layout="row" layout-wrap  layout-align="space-between end">'+
                '<md-button class="clock-control" ng-hide="selectedIndex==1" ng-mouseenter="reduceHover = true;" ng-mouseleave="reduceHover = false;" ng-click="reduceClock()">'+
                  '<md-icon ng-hide="reduceHover">remove</md-icon>'+
                  '<md-icon ng-show="reduceHover">remove_circle_outline</md-icon>'+
                '</md-button>'+
                '<div flex layout="column">'+
                  '<div class="label" ng-show="selectedIndex==0">match time</div>'+
                  '<div class="label" ng-show="selectedIndex==1">FPGA time</div>'+
                  '<div class="label" ng-show="selectedIndex==2">time correction</div>'+
                  '<div class="display" ng-show="selectedIndex==0">{{clock.matchTime + clock.correction}}</div>'+
                  '<div class="display" ng-show="selectedIndex==1">{{clock.fpgaTime}}</div>'+
                  '<div class="display" ng-show="selectedIndex==2">{{clock.correction}}</div>'+
                '</div>'+
                '<md-button class="clock-control"  ng-hide="selectedIndex==1" ng-mouseenter="addHover = true;" ng-mouseleave="addHover = false;" ng-click="increaseClock()">'+
                  '<md-icon ng-hide="addHover">add</md-icon>'+
                  '<md-icon ng-show="addHover">add_circle_outline</md-icon>'+
              '</md-button>'+
              '</div>'+
              '<md-tabs md-stretch-tabs="always" md-align-tabs="bottom" md-border-bottom md-center-tabs md-no-pagination  md-selected="selectedIndex" md-no-select-click>'+
                '<md-tab ng-click="tabSelected()" md-on-select="selectedIndex=0"><md-tab-label><i class="material-icons">schedule</i></md-tab-label></md-tab>'+
                '<md-tab ng-click="tabSelected()" md-on-select="selectedIndex=1"><md-tab-label><i class="material-icons">timelapse</i></md-tab-label></md-tab>'+
                '<md-tab ng-click="tabSelected()" md-on-select="selectedIndex=2"><md-tab-label><i class="material-icons">build</i></md-tab-label></md-tab>'+
              '</md-tabs></div>'+
            '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    $log.info('gameClockController');
    $scope.selectedIndex = 1;  //default to FPGA tab
    $scope.clock = RobotService.clock;
    $scope.isDefault = true;
    $scope.addHover = false;
    $scope.reduceHover = false;
    $scope.isFMSAttached = RobotService.isFMSAttached;
    $scope.tabSelected = function(){
      $scope.isDefault = false;
    }

    $scope.reduceClock = function(){
      RobotService.clockCorrectionDecrease();
    };
    $scope.increaseClock = function(){
      RobotService.clockCorrectionIncrease();
    };


    $scope.$watch(function() {
      return RobotService.isFMSAttached;
    },function(){
      $scope.isFMSAttached = RobotService.isFMSAttached;
      if($scope.isDefault && RobotService.isFMSAttached && $scope.selectedIndex!=0){
        $scope.selectedIndex=0;
      }
      if($scope.isDefault && !RobotService.isFMSAttached && $scope.selectedIndex!=1){
        $scope.selectedIndex=1;
      }      
    });   
  };

  angular.module('MDConsole')
  .directive('gameClock',[directive])
  .controller('gameClockController',['$scope', '$log', 'RobotService', controller]);
}());
