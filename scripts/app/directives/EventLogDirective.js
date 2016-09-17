// Subsystem Card directive
(function(){
  //Directive
  var directive = function(){
    return{
      restrict:'E',
      scope:{},
      controller: 'eventLogController',
      replace: true,
      template:
        '<div class="message-log" layout="column" >'+
            '<md-toolbar class="md-primary md-hue-2">'+
              '<div class="md-toolbar-tools">'+
                '<span style="width: 80px;">Events</span>'+
                '<span style="width: 80px;">({{events.length}})</span>'+
                '<span flex></span>'+
                '<md-button ng-click="toggleError()" ng-class="{\'md-warn md-raised\':showErrors, \'md-primary\':!showErrors}"><md-icon ng-show="showErrors">visibility</md-icon><md-icon ng-hide="showErrors">visibility_off</md-icon> <md-icon>error</md-icon></md-button>'+
                '<md-button ng-click="toggleWarning()"  ng-class="{\'md-accent  md-raised\':showWarnings, \'md-primary\':!showWarnings}"><md-icon ng-show="showWarnings">visibility</md-icon><md-icon ng-hide="showWarnings">visibility_off</md-icon> <md-icon>warning</md-icon></md-button>'+
                '<md-button ng-click="toggleInfo()"  ng-class="{\'md-accent  md-raised md-hue-3\':showInfo, \'md-primary\':!showInfo}"><md-icon ng-show="showInfo">visibility</md-icon><md-icon ng-hide="showInfo">visibility_off</md-icon> <md-icon>info_outline</md-icon></md-button>'+
                '<span flex></span>'+
                '<md-switch ng-model="autoscroll" aria-label="autoscroll" class="md-accent" ng-class="{\'switch-off\':!autoscroll}">autoscroll</md-switch>'+
                '<md-button ng-disabled="events.length<1" ng-click="clear()"><md-icon>delete<md-icon></md-button>'+
              '</div>'+
            '</md-toolbar>'+
            '<md-divider></md-divider>'+
          '<md-content scroll-bottom="events">'+
              '<div ng-repeat="event in events" ng-switch="event.eventType">'+
                '<log-message ng-switch-when="RobotLogNotification" data-event="event" ng-show="showEvent(event)"></log-message>'+
                '<div ng-switch-default>default: {{event.id}}</div>'+
              '</div>'+
          '</md-content>'+
        '</div>'
    }
  };

  var controller = function($scope,  $log, RobotService){
    // $log.info('eventLogController');
    $scope.events = RobotService.events;
    $scope.autoscroll = true;

    $scope.clear = function(){
      service.clearEvents();
    };

    $scope.showErrors = true;
    $scope.toggleError = function(){
      $scope.showErrors = !$scope.showErrors;
    };

    $scope.showWarnings= true;
    $scope.toggleWarning = function(){
      $scope.showWarnings = !$scope.showWarnings;
    };

    $scope.showInfo = true;
    $scope.toggleInfo = function(){
      $scope.showInfo = !$scope.showInfo;
    };

    $scope.showEvent = function(event){
      var show = false;
      if(event.eventType == 'RobotLogNotification'){
        switch(event.level){
          case 'error':
            return $scope.showErrors;
          case 'info':
            return $scope.showInfo;
          case 'warning':
            return $scope.showWarnings;
        }
      }
      return show; 
    };

  };


  angular.module('MDConsole')
  .directive('eventLog',[directive])
  .controller('eventLogController',['$scope', '$log', 'RobotService', controller]);
}());
