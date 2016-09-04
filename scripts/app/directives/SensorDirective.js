// Subsystem Card directive
(function(){
  //Directive
  var directive = function(){
  	return{
  		restrict:'E',
  		scope:{sensor:"="},
  		controller: 'sensorController',
  		replace: true,
      // templateUrl: 'scripts/app/views/Sensor.html'
      template: '<div>'+
                  // '<div>sensor: {{sensor.name}}</div>'+
                  // '<div>{{sensor}}</div>'+
                  '<sensor-reading ng-if="reading.show" ng-repeat="reading in sensor.readings" data-reading="reading"></sensor-reading>'+
                '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    // $log.info('sensorController');
    // $log.info('sensor:');
    // $log.info($scope.sensor);

  };

  angular.module('MDConsole')
  .directive('sensor',[directive])
  .controller('sensorController',['$scope', '$log', 'RobotService', controller]);
}());
