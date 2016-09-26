// POS directive
(function(){
  //Directive
  var directive = function(){
    return{
      restrict:'E',
      scope:{session:"="},
      controller: 'sessionCardController',
      replace: true,
      template:
          '<div class="session-card" layout="row">'+
            '<div  flex="none" class="id-panel" layout="column">'+
                '<div class="recording-name" ng-if="session.name">{{session.name}}</div>'+
                '<div class="recording-name" ng-if="!session.name">unnamed</div>'+
                '<div class="recording-time-label">recorded on</div>'+
                '<div class="recording-time">{{formatDate(session.id)}}</div>'+
            '</div>'+
            '<div flex class="stat-panel" layout="column">'+
                '<div ng-repeat="stat in stats"><span>{{stat.name}}:</span> <span>{{stat.value}}</span></div>'+
            '</div>'+
            '<div flex="none" class="control-panel" layout="column"><md-button ng-click="play()"><md-icon>play_circle_outline</md-icon></md-button></div>'+
            '<div flex="none" class="control-panel" layout="column"><md-button ng-click="delete()"><md-icon>not_interested</md-icon></md-button></div>'+
          '</div>'
    }
  };

  var controller = function($scope,  $log, DatabaseService, RobotService){
    // $log.info('sessionCardController');
    // $log.info($scope.session);
    var props = Object.keys($scope.session);
    $scope.stats = [];
    props.forEach(function(key){
      if(key!='name' && key!='id' && key!="$$hashKey"){
        $scope.stats.push({name:key,value:$scope.session[key]});
      }
    });
    // $log.info($scope.stats);
    $scope.formatDate = function(longDateTime){
      var date = new Date(longDateTime);
      return date.toLocaleDateString()+" "+date.toLocaleTimeString();
    };
    $scope.play = function(){
        DatabaseService.getRecording($scope.session.id)
        .then(function(){RobotService.play();});
        
    };
    $scope.delete = function(){
        DatabaseService.deleteRecording($scope.session.id);
    };
  };

  angular.module('MDConsole')
  .directive('sessionCard',[directive])
  .controller('sessionCardController',['$scope', '$log', 'DatabaseService', 'RobotService', controller]);
}());