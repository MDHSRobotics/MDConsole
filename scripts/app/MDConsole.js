//declare the module and the app level controller
(function(){
	console.log('bootstrapping angular');
	//defining the application controller
	var appController = function($scope, $log, $attrs, $mdSidenav, RobotService, DatabaseService){
		// $log.info('MDConsoleController');
		// $log.info($attrs);
		$scope.getEventsCount = function(){
			return RobotService.getEventsCount();
		}

		$scope.toggleRight = buildToggler('right');		
        $scope.isOpenRight = function(){
    	    return $mdSidenav('right').isOpen();
	    }

	    $scope.state = RobotService.state;
	    $scope.isConnected = RobotService.isConnected;
	    $scope.isDBConnected = DatabaseService.db.isConnected;
	    $scope.isSimulation = RobotService.isSimulation;
		$scope.isRecording = DatabaseService.db.isRecording;

		$scope.toggleRecording = function(){
			if(DatabaseService.db.isRecording) DatabaseService.stopRecording();
			else {				
				DatabaseService.startRecording();
				RobotService.reconnect();
			}
		}
	    
	    $scope.toggleFMS = function(){
	      RobotService.toggleFMS();
	    };
	    $scope.toggleConnected = function(){
	      RobotService.toggleConnected();
	    };
	    $scope.toggleDBConnected = function(){
	      DatabaseService.toggleDBConnected();
	    };
	    $scope.toggleSimulation = function(){
	      RobotService.toggleSimulation();
	    };
	    $scope.$watch(function(){return RobotService.state;},function(){$scope.state = RobotService.state;});      
	    $scope.$watch(function(){return RobotService.isConnected;},function(){$scope.isConnected = RobotService.isConnected;});      
	    $scope.$watch(function(){return DatabaseService.db.isConnected;},function(){$scope.isDBConnected = DatabaseService.db.isConnected;});      
	    $scope.$watch(function(){return DatabaseService.db.isRecording;},function(){$scope.isRecording = DatabaseService.db.isRecording;});      
		$scope.$watch(function(){return RobotService.isPlayback;},function(){
			if(RobotService.isPlayback){
				$mdSidenav('right').close()
			}
		});	
		function buildToggler(navID) {
	      return function(mode) {
	        // Component lookup should always be available since we are not using `ng-if`
	        $scope.mode = mode;
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
		        // $log.debug("mode:" + mode);
		        DatabaseService.getRecordings();
          	});
	      }
	    }    
	};
	var sideNavController = function($scope, $log, $attrs, $mdSidenav, RobotService, DatabaseService){
		$scope.close = function () {
		      // Component lookup should always be available since we are not using `ng-if`
		      $mdSidenav('right').close()
		        .then(function () {
		          //$log.debug('closing sidenav');
		        });
		};	

	};

	angular.module('MDConsole',['ngMaterial'])
	.config(['$httpProvider', function ($httpProvider) {
	            // enable http caching
	           $httpProvider.defaults.cache = false;
	      }])
  	 	.config(function($mdThemingProvider) {
		    var greyPalette = $mdThemingProvider.extendPalette('grey',{
		    	'50':'#ffffff'
		    });
		    $mdThemingProvider.definePalette('grey2',greyPalette);

	  		$mdThemingProvider.theme('default')
			    .primaryPalette('blue-grey')
			    .accentPalette('red')
			    // .warnPalette('red')
			    .backgroundPalette('grey2')
			    ; 	 	
		})
		.controller('MDConsoleController',['$scope','$log', '$attrs', '$mdSidenav', 'RobotService', 'DatabaseService', appController])
		.controller('RightCtrl', ['$scope','$log', '$attrs', '$mdSidenav', 'RobotService', 'DatabaseService', sideNavController])
		;
}());
