//declare LicenseService
(function(){
	var subsystems = [
		{name:"subsystem1"},
		{name:"subsystem2"},
		{name:"subsystem3"}
	];

	var service = function($log, $timeout,$http){
		$log.info('ConfigurationService');
		var serviceObject = 
		{
			subsystems:subsystems
		};
		return serviceObject;
	};

	angular.module('MDConsole')
	  .factory('ConfigurationService',['$log', '$timeout', '$http', service]);
}());
