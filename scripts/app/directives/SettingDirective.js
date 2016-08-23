// Subsystem Card directive
(function(){
  //Directive
  var directive = function(){
  	return{
  		restrict:'E',
  		scope:{setting:"="},
  		controller: 'settingController',
  		replace: true,
      // templateUrl: 'scripts/app/views/SubsystemCard.html'
      template: '<div>'+
                  '<div>setting: {{setting.name}}<div/><div>{{setting}}</div>'+
                  '<div ng-if="setting.valueType==\'string\'" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'+
                    '<input class="mdl-textfield__input" type="text" id="{{setting.path}}" ng-model="setting.value">'+
                    '<label class="mdl-textfield__label" for="{{setting.path}}">{{setting.name}}</label>'+
                  '</div>'+
                  '<div ng-if="setting.valueType==\'doubleNumber\'">'+
                    '<input class="mdl-slider mdl-js-slider" type="range" min="{{setting.min}}" max="{{setting.max}}" value="{{setting.value}}" ng-model="setting.value" step="{{setting.step}}"></input>'+
                  '</div>'+
                  '<div ng-if="setting.valueType==\'binary\'">'+
                    '<md-switch class="md-primary" aria-label="{{setting.name}} setting" ng-model="setting.value">{{setting.name}}</md-switch>'+
                  '</div>'+
                '</div>'
  	}
  };

  var controller = function($scope, $log, RobotService){
    $log.info('settingController');
    $log.info('setting:');
    $log.info($scope.setting);
    if($scope.setting.valueType == 'doubleNumber' || $scope.setting.valueType == 'integer' )
      $scope.setting.step = ($scope.setting.max - $scope.setting.min)/100;
  };

  angular.module('MDConsole')
  .directive('setting',[directive])
  .controller('settingController',['$scope', '$log', 'RobotService', controller]);
}());
