// Subsystem Card directive
(function(){
  //Directive
  var directive = function(){
  	return{
  		restrict:'E',
  		scope:{reading:"="},
  		controller: 'sensorReadingController',
  		replace: true,
      // templateUrl: 'scripts/app/views/Sensor.html'
      template: '<div>'+
                  '<div>reading: {{reading.name}}</div>'+
                  '<div>{{reading}}</div>'+
                  '<div ng-if="reading.valueType=\'analog\'"><span class="analogReading">{{reading.value}}</span></div>'+
                '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    $log.info('sensorReadingController');
    $log.info('reading:');
    $log.info($scope.reading);

  };

  angular.module('MDConsole')
  .directive('sensorReading',[directive])
  .controller('sensorReadingController',['$scope', '$log', 'RobotService', controller]);
}());
