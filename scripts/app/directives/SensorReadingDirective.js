// Subsystem Card directive
(function(){
  //Directive
  var directive = function(){
  	return{
  		restrict:'E',
  		scope:{reading:"=",index:"="},
  		controller: 'sensorReadingController',
  		replace: true,
      // templateUrl: 'scripts/app/views/Sensor.html'
      template: '<div>'+
                  '<md-divider ng-show="index>0"></md-divider>'+
                  '<div layout="row">'+
                     '<div flex="65" class="truncate">{{reading.name}}</div>'+
                     '<div flex="35" class="truncate">{{reading.value}}</div>'+
                  '</div>'+
                '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    // $log.info('sensorReadingController');
    // $log.info('reading:');
    // $log.info($scope.reading);

  };

  angular.module('MDConsole')
  .directive('sensorReading',[directive])
  .controller('sensorReadingController',['$scope', '$log', 'RobotService', controller]);
}());
