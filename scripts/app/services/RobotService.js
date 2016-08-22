//This service manages communicaitons with the robot
(function(){
    // var robotAddress = "ws://172.22.11.2:5808";
    var robotAddress = 'ws://roboRIO-4141-FRC.local:5808';

    function service($q,$log,$timeout, $interval,SimulationService){
        $log.info("RobotService");
        var events = [];
        var serviceObj = {
                events: events,
                clear: clear,
                post: post,
                simulation: true
            };
        var process=function(event){
            $log.info('processing event:');
            $log.info(event);
            var eventObj=JSON.parse(event);

            // if(eventObj.isDisplay) events.push(eventObj);
            // if(eventObj.isRecord) DatabaseService.record(eventObj);      
            if (eventObj.eventType =="RobotConfigurationNotification"){
                RobotService.updateConfiguration(eventObj);
            }      
        };
    
        index = 0;
        var local = false ;
        var ws;
        var connected = false;
        var onopen = function(){
            $log.info('Opened!');
            connected=true;
            this.send('{"command":"connect"}');
        };
        var onmessage = function(evt){
            $timeout(function(){
                // $log.info('processing '+evt.data);
                process(evt.data);
            });
        };
        var onclose = function(){
            connected=false;
            $log.info('Connection closed.  Attempting to reconnect ...');
            connect();
        };
        var onerror = function(err){
            $log.info('ERROR: ')
            $log.info(err);
        };
        var connect = function(){
            var connector = $interval(function(){
               // if(index >=  10 ){//script.length)
                if(connected){
                    $interval.cancel(connector);
                    $log.info("stopped connector");
                }
                else{
                    if (ws === undefined || ws.readyState === undefined || ws.readyState > 1) {
                        $log.info('initializing web socket client...');
                        // ws = new WebSocket('ws://127.0.0.1:5808');
                        ws = new WebSocket(robotAddress);
                        ws.onopen = onopen;
                        ws.onmessage = onmessage;
                        ws.onclose = onclose;
                        ws.onerror = onerror;
                    }
                }
            },600);             
        };

        if(serviceObj.simulation){
            // process(SimulationService.next());
        }
        else{
            connect();
        }
        

        var clear = function(){
            events.length=0;
        };

        var post = function(message){
            if(ws) ws.send(message);
            else $log.info('ws not valid');
        };
        return serviceObj;  
    }
    angular.module('MDConsole')
         .service('RobotService', ['$q','$log', '$timeout', '$interval', 'SimulationService', service]);
    
})();
