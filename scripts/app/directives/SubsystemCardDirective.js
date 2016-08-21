// Item Form directive
(function(){
  //Directive
  var directive = function(){
  	return{
  		restrict:'E',
  		scope:{},
  		controller: 'subsystemController',
  		replace: true,
      templateUrl: 'scripts/app/views/SubsystemCard.html'
  	}
  };

  var controller = function($scope, $log, ConfigurationService){
    $log.info('subsystemController');
    $scope.subsystems =  ConfigurationService.subsystems;
    $log.info($scope.subsystems);
  };

  angular.module('MDConsole')
  .directive('subsystem',[directive])
  .controller('subsystemController',['$scope', '$log', 'ConfigurationService', controller]);
}());
