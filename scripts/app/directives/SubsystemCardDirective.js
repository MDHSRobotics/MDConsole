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
      template: '<div class="subsystem-card" flex="30" md-whiteframe="5">'+
                    '<md-toolbar class="md-theme-light">'+
                      '<div class="md-toolbar-tools">'+
                         '<md-icon class="avatar">memory</md-icon>'+
                         '<span flex></span>'+
                         '<span class="title">{{subsystem.subsystem}}</span>'+
                      '</div>'+
                    '</md-toolbar>'+
                    '<div class="card-body">'+
                      '<setting ng-repeat="setting in subsystem.settings" data-setting="setting"></setting>'+
                      '<md-divider ng-show="showDivider()"></md-divider>'+   // '<div>{{subsystem}}</div>'+
                      '<sensor ng-repeat="sensor in subsystem.sensors" data-sensor="sensor"></sensor>'+
                    '</div>'+
                '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    // $log.info('subsystemCardController');
    // $log.info('subsystem:');
    // $log.info($scope.subsystem);
    $scope.showDivider = function(){
      if(!$scope.subsystem.hasOwnProperty('sensors')) return false;
      if(!$scope.subsystem.hasOwnProperty('settings')) return false;
      var hasSettings = $scope.subsystem.settings.length>0;
      var result = false;
      var keys= Object.getOwnPropertyNames($scope.subsystem.sensors);
      if(keys.length>0){
        keys.forEach(function(key){
          // $log.info($scope.subsystem.sensors[key]);
          if($scope.subsystem.sensors[key].hasOwnProperty('readings') && Object.getOwnPropertyNames($scope.subsystem.sensors[key].readings).length>0 ){
            // $log.info($scope.subsystem.subsystem+' has both settings('+hasSettings+') and readings');
            result = hasSettings;
          }
        });
      }
      return result;
    };
  };

  angular.module('MDConsole')
  .directive('subsystemCard',[directive])
  .controller('subsystemCardController',['$scope', '$log', 'RobotService', controller]);
}());
