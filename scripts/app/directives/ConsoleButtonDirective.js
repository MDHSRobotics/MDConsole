// Console OI directive
(function(){
  //Directive
  var directive = function(){
  	return{
  		restrict:'E',
  		scope:{button:"="},
  		controller: 'consoleButtonController',
  		replace: true,
      // templateUrl: 'scripts/app/views/CommandsList.html'
      template: 
      '<div>'+
        '<button class="mdl-button mdl-js-button mdl-js-ripple-effect"'+
        'ng-mousedown="mousedown(button)" ng-mouseup="mouseup(button)" ng-model="value"'
        +'>{{button.name}}</button><span>{{pressed}}</span>'+
      '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    $log.info('consoleButtonController');
    $log.info('button:');
    $log.info($scope.button);
    $scope.pressed = false;
    $scope.mousedown=function(button){
      $log.info(button.name+' mousedown');
      $scope.pressed = true;
    }
    $scope.mouseup=function(button){
      $log.info(button.name+' mouseup');
      $scope.pressed = false;
    }
  };

  angular.module('MDConsole')
  .directive('consoleButton',[directive])
  .controller('consoleButtonController',['$scope', '$log', 'RobotService', controller]);
}());
