// Console Axis directive
(function(){
  //Directive
  var directive = function(){
  	return{
  		restrict:'E',
  		scope:{axis:"="},
  		controller: 'consoleAxisController',
  		replace: true,
      // templateUrl: 'scripts/app/views/CommandsList.html'
      template: 
      '<div>'+
        '<span>{{axis.name}}:</span><input style="width:300px;display:-ms-inline-grid" ng-model="axis.value" class="mdl-slider mdl-js-slider" type="range" min="0" max="100" value="{{axis.value}}"></input><span>{{axis.value}}</span>'+
      '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    $log.info('consoleAxisController');
    $log.info('axis:');
    $log.info($scope.axis);
  };

  angular.module('MDConsole')
  .directive('consoleAxis',[directive])
  .controller('consoleAxisController',['$scope', '$log', 'RobotService', controller]);
}());
