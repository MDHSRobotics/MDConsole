//This service manages communicaitons with the robot
(function(){
    // var robotAddress = "ws://172.22.11.2:5808";
    var robotAddress = 'ws://roboRIO-4141-FRC.local:5808';

    function service($q,$log,$timeout, $interval,$rootScope,SimulationService){
        $log.info("RobotService");
        var events = [];
         var clockCorrectionDecrease=function(){
            serviceObj.clock.correction -= 0.25; 
        };

        var clockCorrectionIncrease=function(){
            serviceObj.clock.correction += 0.25;
        };  
        var robotConfig = {
            subsystems:[],
            commands:[],
            consoleOI:{}
        }
        var serviceObj = {
                events: events,
                clear: clear,
                post: post,
                isFMSAttached: false,
                robotConfig: robotConfig,
                clock:{matchTime:0, fpgaTime:0, correction:0},
                simulation: false,
                clockCorrectionIncrease:clockCorrectionIncrease,         
                clockCorrectionDecrease:clockCorrectionDecrease
            };
        var process=function(event){
            // $log.info(event);
            var eventObj=JSON.parse(event);
            if(eventObj.display) events.push(eventObj);
            // if(eventObj.isRecord) DatabaseService.record(eventObj);      
            if (eventObj.eventType =="RobotConfigurationNotification"){
                // $log.info('processing RobotConfigurationNotification:');
                // $log.info(eventObj);
                updateConfiguration(eventObj);
            }      
            if (eventObj.eventType =="Heartbeat"){
                // $log.info('processing Heartbeat:');
                // $log.info(eventObj);
                update(eventObj);
            }      
        };
    
        index = 0;
        var ws;
        var connected = false;
        var onopen = function(){
            // $log.info('Opened!');
            connected=true;
            this.send('{"command":"connect"}');
        };
        var onmessage = function(evt){
            // $timeout(function(){
                // $log.info('processing '+evt.data);
                process(evt.data);
            // });
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
                    // $log.info("stopped connector");
                }
                else{
                    if (ws === undefined || ws.readyState === undefined || ws.readyState > 1) {
                        // $log.info('initializing web socket client...');
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
            $log.info('simulation on');
            process(SimulationService.next());
        }
        else{
            $log.info('simulation off');
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


        function updateConfiguration(robotConfig){
            // $log.info('robot config:');
            $log.info(robotConfig);
            if(robotConfig.hasOwnProperty('fpgaTime')){
                $log.info('config fgpaTime');
                serviceObj.clock.fpgaTime = robotConfig.fpgaTime;
            }
            if(robotConfig.hasOwnProperty('subsystems')){
                $log.info('config subsystems');
                serviceObj.robotConfig.subsystems = robotConfig.subsystems;
            }
            if(robotConfig.hasOwnProperty('commands')){
                $log.info('config commands');
                serviceObj.robotConfig.commands = robotConfig.commands;
            }       
            if(robotConfig.hasOwnProperty('consoleOI')){
                $log.info('config consoleOI');
                serviceObj.robotConfig.consoleOI = robotConfig.consoleOI;
            }         
        }
        function update(heartbeat){
            // $log.info('heartbeat:');
            // $log.info(heartbeat);
            if(heartbeat.hasOwnProperty('fpgaTime')){
                $timeout(function(){
                    serviceObj.clock.fpgaTime = Math.round(heartbeat.fpgaTime * 100) / 100;
                });
            }

            if(heartbeat.hasOwnProperty('sensors')){
                if(heartbeat.sensors.hasOwnProperty('Timer.MatchTime')){
                    $timeout(function(){
                        serviceObj.clock.matchTime = Math.round((heartbeat.sensors['Timer.MatchTime'].value + serviceObj.clock.correction)* 100) / 100;
                    });
                }
                if(heartbeat.hasOwnProperty('sensors') && heartbeat.sensors.hasOwnProperty('DriverStation.isFMSAttached')){
                    $timeout(function(){
                        serviceObj.isFMSAttached = heartbeat.sensors['DriverStation.isFMSAttached'].value;
                    });
                }

                // $log.info(heartbeat.sensors.length+' sensors data to update');
                if(serviceObj.robotConfig && serviceObj.robotConfig.subsystems){
                    Object.getOwnPropertyNames(heartbeat.sensors).forEach(function(sensorReadingName){
                    var sensorReading = heartbeat.sensors[sensorReadingName];
                    if(sensorReading.hasOwnProperty('subsystem') && serviceObj.robotConfig.subsystems.hasOwnProperty(sensorReading.subsystem)){
                      
                        var subsystem = serviceObj.robotConfig.subsystems[sensorReading.subsystem];
                        // $log.info('found subsystem '+subsystem.subsystem+" :");
                        // $log.info(subsystem);
                        
                        if(subsystem.hasOwnProperty('sensors') && subsystem.sensors && subsystem.sensors.hasOwnProperty(sensorReading.sensor)){
                                var sensor = subsystem.sensors[sensorReading.sensor];
                                // $log.info('found sensor '+sensor.name);
                                // $log.info(sensor);
                                // $log.info(sensorReading);
                                if(sensor.hasOwnProperty('readings') && sensor.readings && sensor.readings.hasOwnProperty(sensorReading.name)){
                                    var reading = sensor.readings[sensorReading.name]; 
                                    // $log.info('found sensor reading '+reading.name);
                                    // $log.info(reading);
                                    reading.value = sensorReading.value;
                                }
                        }
                    }
                });
                }
            }

            
        }

  

    }
    angular.module('MDConsole')
         .service('RobotService', ['$q','$log', '$timeout', '$interval', '$rootScope','SimulationService', service]);
    
})();
