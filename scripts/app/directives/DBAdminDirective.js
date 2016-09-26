// Subsystem Card directive
(function(){
  //Directive
  var directive = function(){
    return{
      restrict:'E',
      scope:{},
      controller: 'dbAdminController',
      replace: true,
      template:
        '<div class="db-admin" layout="column" >'+
            '<md-toolbar class="md-primary md-hue-2">'+
              '<div class="md-toolbar-tools">'+
                '<span style="width: 200px;">Database Console</span>'+
                '<span flex></span>'+
              '</div>'+
            '</md-toolbar>'+
            '<md-divider></md-divider>'+
            '<md-tabs md-stretch-tabs="always" md-align-tabs="bottom" md-border-bottom md-center-tabs md-no-pagination  md-selected="selectedIndex" md-no-select-click>'+
              '<md-tab md-on-select="selectedIndex=0"><md-tab-label><i class="material-icons">play_circle_outline</i></md-tab-label></md-tab>'+
              '<md-tab md-on-select="selectedIndex=1"><md-tab-label><i class="material-icons">build</i></md-tab-label></md-tab>'+
            '</md-tabs>'+
            '<div ng-show="selectedIndex==0" layout="column" layout-align="space-between center">'+
              '<session-card ng-repeat="session in sessions" data-session="session"></session-card>'+
            '</div>'+
            '<div ng-show="selectedIndex==1">'+
              '<form name="viewForm" novalidate>'+
                '<md-input-container class="md-block">'+
                  '<label>View Name</label>'+
                  '<input ng-model="view.name" required/>'+
                '</md-input-container>'+
                '<md-content>'+
                  '<md-input-container class="md-block">'+
                    '<label for="view-content">View</label>'+
                      '<textarea id="view-content" ng-trim="false" row=13 ng-model="view.content" required></textarea>'+
                  '</md-input-container>'+
                '</md-content>'+
              '</form>'+
              '<div style="text-align:right"><md-button ng-disabled="viewForm.$invalid" ng-click="save()" class="md-raised">save</button></div>'+
            '</div>'+
        '</div>'
    }
  };

  var controller = function($scope,  $log, DatabaseService){
    // $log.info('dbAdminController');
    $scope.selectedIndex = 0;  //default to playback tab
    
    $scope.save=function(){
      $log.info('saving view');
      DatabaseService.admin.saveView($scope.view.name,$scope.view.content)
      .then(function(response){
        $log.info('saveView response:');
        $log.info(response);
      },function(error){
        $log.info('saveView error:');
        $log.info(error);
      });
    };
    $scope.sessions = DatabaseService.sessions;
    // $scope.$watch(function(){
    //   return DatabaseService.sessions;
    // },function(){
    //   $log.info('sessions has changed:');
    //   $log.info(DatabaseService.sessions);
    //   $scope.sessions = DatabaseService.sessions;
    // },true);
  };


  angular.module('MDConsole')
  .directive('dbAdmin',[directive])
  .controller('dbAdminController',['$scope', '$log', 'DatabaseService', controller]);
}());
