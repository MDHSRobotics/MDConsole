// Subsystem Card directive
(function(){
  //Directive
  var directive = function(){
    return{
      restrict:'E',
      scope:{},
      controller: 'diagnosticsController',
      replace: true,
      template:
        '<div class="diagnostics" layout="column" >'+
            '<md-toolbar class="md-primary md-hue-2">'+
              '<div class="md-toolbar-tools">'+
                '<span style="width: 80px;">Diagnostics</span>'+
              '</div>'+
            '</md-toolbar>'+
            '<md-divider></md-divider>'+
            '<md-content>'+
              '<div>'+
                '<div ng-if="subsystem.isCore" ng-repeat="subsystem in robotConfig.subsystems">'+
                    '<div ng-repeat="sensor in subsystem.sensors">'+
                      '<sensor data-sensor="sensor"></sensor>'+
                      '<md-divider></md-divider>'+
                    '</div>'+
                '</div>'+              
              '</div>'+
            '</md-content>'+
        '</div>'
    }
  };

  var controller = function($scope,  $log, RobotService){
    // $log.info('diagnosticsController');
    $scope.robotConfig = RobotService.robotConfig;
  };


  angular.module('MDConsole')
  .directive('diagnostics',[directive])
  .controller('diagnosticsController',['$scope', '$log', 'RobotService', controller]);
}());
