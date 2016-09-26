// Subsystem Card directive
(function(){
  //Directive
  var directive = function(){
    return{
      restrict:'E',
      scope:{event:"="},
      controller: 'logRumbleController',
      replace: true,
      template: 
            '<div layout="row" ng-class="{\'selected\':hovering}" class="log-message" ng-mouseenter="hovering = true;" ng-mouseleave="hovering = false;">'+
              '<div style="width:20px;" flex="none"><md-icon>videogame_asset</md-icon></div>'+
              '<div flex="initial">{{event.fpgaTime}}:</div>'+
              '<div flex="fill" class="truncate" title="heartbeat">side:{{side()}} value:{{event.value}}</div>'+
              '<div style="width:30px;position:relative" flex="none" ng-show="hovering" ng-click="copy(\$event)" title="Copy to Clipboard">'+
                 '<md-icon>content_copy</md-icon>'+
              '</div>'+
            '</div>'
    }
  };



  var controller = function($scope, $log, service){
    // $log.info('logRumbleController');
    // $log.info($scope.event);
    $scope.hovering = false;

    $scope.side = function(){
      if($scope.event.hand==0){
        return 'left';
      }
      else{
        return 'right';
      }
    }

    $scope.copy = function(event){
      event.stopPropagation();

      var t = document.createElement('textarea')
      t.id = 't'
      // Optional step to make less noise in the page, if any!
      t.style.height = 0
      // You have to append it to your page somewhere, I chose <body>
      document.body.appendChild(t)
      // Copy whatever is in your div to our new textarea
      t.value = JSON.stringify($scope.event);
      // $log.info(t.value);
      // Now copy whatever inside the textarea to clipboard
      let selector = document.querySelector('#t')
      selector.select()
      document.execCommand('copy')
      // Remove the textarea
      document.body.removeChild(t)      
    }

    $scope.isEllipsisActive = function(event) {
      $scope.truncated = event.target.offsetWidth < event.target.scrollWidth;
    };
  };

  angular.module('MDConsole')
  .directive('logRumble',[directive])
  .controller('logRumbleController',['$scope', '$log', controller]);
}());

