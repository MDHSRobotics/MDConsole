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
                  '<div ng-if="reading.type==\'analog\'"><span>reading: {{reading.name}}</span><span>analog</span><span class="analogReading">{{reading.value}}</span></div>'+
                  '<div ng-if="reading.type==\'digital\'"><span>reading: {{reading.name}}</span><span>digital</span><span class="ditialReading">{{reading.value}}</span></div>'+
                  '<div ng-if="reading.type==\'string\'"><span>reading: {{reading.name}}</span><span>string</span><span class="stringReading">{{reading.value}}</span></div>'+
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
