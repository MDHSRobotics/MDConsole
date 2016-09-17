// Subsystem Card directive
(function(){
  //Directive
  var directive = function(){
    return{
      restrict:'E',
      scope:{},
      controller: 'coreSettingsController',
      replace: true,
      template:
        '<div class="core-settings" layout="column" >'+
            '<md-toolbar class="md-primary md-hue-2">'+
              '<div class="md-toolbar-tools">'+
                '<span style="width: 80px;">Settings</span>'+
              '</div>'+
            '</md-toolbar>'+
            '<md-divider></md-divider>'+
            '<md-content>'+
              '<div ng-if="subsystem.isCore" ng-repeat="subsystem in robotConfig.subsystems">'+
                    '<div ng-repeat="setting in subsystem.settings">'+
                      '<setting data-setting="setting"></setting>'+
                      '<md-divider></md-divider>'+
                    '</div>'+
              '</div>'+
              '<div>'+
                '<md-switch ng-disabled="!isDBConnected" class="md-primary" aria-label="Record Events" ng-model="recordSwitch"  ng-change="recordChange()">Record Events</md-switch>'+
             '</div>'+
            '</md-content>'+
        '</div>'
    }
  };

           '<md-content><div layout="row" layout-wrap>'+
            '<subsystem-card ng-repeat="subsystem in robotConfig.subsystems" data-subsystem="subsystem"></subsystem-card>'+
         '</div></md-content>'

  var controller = function($scope,  $log, RobotService, DatabaseService){
    // $log.info('coreSettingsController');
    $scope.robotConfig = RobotService.robotConfig;
    $scope.isDBConnected = DatabaseService.db.isConnected;
    $scope.recordSwitch = false;
    DatabaseService.stopRecording();
    $scope.recordChange = function(){
      $log.info('record switch flipped');
      $log.info('record is now '+$scope.recordSwitch);
      if($scope.recordSwitch){
        DatabaseService.startRecording();
      }
      else{
        DatabaseService.stopRecording();  
      }

    };
    $scope.$watch(function(){return DatabaseService.db.isConnected;},function(){$scope.isDBConnected = DatabaseService.db.isConnected;});
    $scope.$watch(function(){return DatabaseService.db.isRecording;},function(){$scope.recordSwitch = DatabaseService.db.isRecording;});
  };


  angular.module('MDConsole')
  .directive('coreSettings',[directive])
  .controller('coreSettingsController',['$scope', '$log', 'RobotService', 'DatabaseService', controller]);
}());
