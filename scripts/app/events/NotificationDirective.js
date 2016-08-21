(function(){
    var controller = function ($scope, $log, EventService){
        // $log.info('NotificationDirectiveController');
        // $log.info($scope.event);
        $scope.type = 'message';
        switch($scope.event.eventType){
            case "LogNotification":
            case "RobotLogNotification":
            
                switch($scope.event.level){
                    case "INFO":
                        $scope.type = 'info_outline';
                        break;
                    case "WARN":
                        $scope.type = 'warning';
                        break;
                    case "ERROR":
                        $scope.type = 'error';
                        break;
                }
                $scope.text = $scope.event.message;
                $scope.source = $scope.event.source;
                break;
            case "RobotStateNotification":
                $scope.text = "state = "+ $scope.event.state;
                break;
            case "ballLoadedNotification":
                $scope.text = "ball state = "+ $scope.event.ballStatus;
                break;
            case "GameClockNotification":
                $scope.text = "time: "+ $scope.event.timerMatchTime;
                break;
            default:
                $scope.text = JSON.stringify($scope.event);
        }

    };  

    var directive= function (){
    	return {
    		restrict:'E',
    		scope:{event:"="},
    		controller: 'NotificationDirectiveController',
    		replace: true,
    		templateUrl: "scripts/app/events/view/Notification.html"
    	}
    };

    angular.module('events')
    	.directive('notification', [directive])
    	.controller('NotificationDirectiveController', ["$scope","$log",'EventService', controller]);

}());
