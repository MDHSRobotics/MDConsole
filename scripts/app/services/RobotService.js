//This service manages communicaitons with the robot
(function(){
    // var robotAddress = "ws://172.22.11.2:5808";
    var robotAddress = 'ws://roboRIO-4141-FRC.local:5808';

    function service($q,$log,$timeout, $interval,$rootScope,SimulationService,DatabaseService){
        $log.info("RobotService");
        var connector;  //variable managing periodic attempt to connect to roborio
        var hearbeatInjector;  //variable managing periodic attempt to inject heatbeat messages for the simulation
        var logEventInjector;  //variable managing periodic attempt to inject event log messages for the simulation
        var events = [];
        var eventcapacity = 999;

        var clockCorrectionDecrease=function(){
            serviceObj.clock.correction -= 0.25; 
        };

        var clockCorrectionIncrease=function(){
            serviceObj.clock.correction += 0.25;
        };  
        var post = function(message){
            // $log.info('sending message to RoboRio');
            // $log.info(message);
            if(ws) ws.send(message);
            else $log.info('ws not valid');
        };
        var clearEvents = function(){
            events.length=0;
        };
        var getEventsCount = function(){
            return events.length;
        };
        var toggleFMS = function(){
            serviceObj.isFMSAttached = !serviceObj.isFMSAttached;
        };
        var toggleConnected = function(){
            serviceObj.isConnected = !serviceObj.isConnected;
        }

        var toggleSimulation = function(){
            SimulationService.toggleSimulation();
             if(serviceObj.isSimulation()){
                $log.info('simulation is on');
                if(connector){
                    //periodic interval object to automatically connect to roborio is in progress
                    //diasble it
                    // $log.info('connector defined');
                    $interval.cancel(connector);
                    $log.info("Robot connector terminated");
                }
                logEventInjector = $interval(function(){
                    process(SimulationService.nextLogEvent()); 
                    process(SimulationService.next());  
                },600);                   

            }
            else{
                $log.info('simulation is off');
                if(logEventInjector){
                    // $log.info('logEventInjector interval being canceled');
                    $interval.cancel(logEventInjector);
                    connect();
                }

            }           
        };
        var isSimulation = function(){
            return SimulationService.isSimulation;
        };

        var robotConfig = {
            subsystems:[],
            consoleOI:{}
        };
        var time = -1;
        var play=function(){
            serviceObj.isPlayback = true;
            if(ws){
                // $log.info('ws exists');
                ws.close();
            }
            time = -1;
            playNext();
        };
        function playNext(){
            if(DatabaseService.session.events.length>0){
                var event = DatabaseService.session.events.shift();
                // $log.info(event);
                var delay = 0;
                if(time > 0){
                    delay = (event.fpgaTime - time)*1000;
                }
                time = event.fpgaTime;
                $timeout(function(){
                    process(JSON.stringify(event));
                    playNext();
                },delay);
            }
        }
        var serviceObj = {
                events: events,
                clearEvents: clearEvents,
                getEventsCount: getEventsCount,
                post: post,
                isFMSAttached: false,
                isConnected:false,
                isPlayback:false,
                isSimulation:isSimulation,
                toggleFMS:toggleFMS,
                toggleConnected:toggleConnected,
                toggleSimulation:toggleSimulation,
                state: 'Disabled',
                robotConfig: robotConfig,
                clock:{matchTime:0, fpgaTime:0, correction:0},
                clockCorrectionIncrease:clockCorrectionIncrease,         
                clockCorrectionDecrease:clockCorrectionDecrease,
                play:play,
                reconnect:reconnect
            };

        var process=function(event){
            var eventObj=JSON.parse(event);
            // if (!(eventObj.eventType =="Heartbeat")){
            //     $log.info(event);
            // }
            if(eventObj.hasOwnProperty('fpgaTime')){
                // $log.info('has fpgaTime');
                eventObj.fpgaTime = Math.round(eventObj.fpgaTime * 100) / 100;
                // $log.info('time = '+event.fpgaTime);
            }

            // $log.info(eventObj);
            if(eventObj.display) {
                $timeout(function(){events.push(eventObj);});
                if(events.length>eventcapacity) events.shift();
            }
            if(eventObj.record) DatabaseService.record(eventObj);      
            if (eventObj.eventType =="RobotConfigurationNotification"){
                // $log.info('processing RobotConfigurationNotification:');
                // $log.info(eventObj);
                updateConfiguration(eventObj);
            }      
            if (eventObj.eventType =="Heartbeat"){
                // $log.info('processing Heartbeat:');
                // $log.info(eventObj);
                // $timeout(function(){events.push(eventObj);});
                update(eventObj);
            }  
   
            if(eventObj.eventType =="ConsoleRumbleNotification"){
                consoleRumble(eventObj);
            }
        };
    
        index = 0;
        var ws;
        var onopen = function(){
            $log.info('WS CONNECTED!');
            $interval.cancel(connector);            
            this.send('{"type":"remoteIdentification", "id":"console"}');
            serviceObj.isConnected = true;
        };
        var onmessage = function(evt){
            // $timeout(function(){
                // $log.info('processing '+evt.data);
                process(evt.data);
            // });
        };
        var onclose = function(){
            ws = undefined;
            serviceObj.isConnected = false;
            if(!serviceObj.isPlayback) {
                $log.info('Robot connection closed.  Attempting to reconnect ...');
                connect();
            }
        };
        var onerror = function(err){
            // $log.info('WS CONNECTION ERROR: ')
            // $log.info(err);
            // ws = undefined;
            // connect();
        };
        var connect = function(){
            connector = $timeout(function(){
                if (!serviceObj.isSimulation() && ws === undefined){
                    // $log.info('simulation off');
                    $log.info('initializing web socket client...');
                    // ws = new WebSocket('ws://127.0.0.1:5808');
                    ws = new WebSocket(robotAddress);
                    ws.onopen = onopen;
                    ws.onmessage = onmessage;
                    ws.onclose = onclose;
                    ws.onerror = onerror;
                }
                else{
                    $log.info('aborting connection due to simulation');
                }
            },10);             
        };

        connect();
        return serviceObj;  

        function updateConfiguration(robotConfig){
            // $log.info('robot config:');
            // $log.info(robotConfig);
            // serviceObj.clock.fpgaTime=0.0;
            if(robotConfig.hasOwnProperty('fpgaTime')){
                // $log.info('config fpgaTime');
                serviceObj.clock.fpgaTime = robotConfig.fpgaTime;
            }
            serviceObj.robotConfig.subsystems={};
            if(robotConfig.hasOwnProperty('subsystems')){
                // $log.info('config subsystems');
                serviceObj.robotConfig.subsystems = robotConfig.subsystems;
            }
   
            serviceObj.robotConfig.consoleOI={};
            if(robotConfig.hasOwnProperty('consoleOI')){
                // $log.info('config consoleOI');
                serviceObj.robotConfig.consoleOI = robotConfig.consoleOI;
            }         
        }
        function update(heartbeat){
            // $log.info('heartbeat:');
            // $log.info(heartbeat);
            if(heartbeat.hasOwnProperty('fpgaTime')){
                $timeout(function(){
                    serviceObj.clock.fpgaTime = heartbeat.fpgaTime;
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
                if(heartbeat.hasOwnProperty('sensors') && heartbeat.sensors.hasOwnProperty('RobotState')){
                    $timeout(function(){
                        serviceObj.state = heartbeat.sensors['RobotState'].value;
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

        function consoleRumble(event){
            if(robotConfig && robotConfig.consoleOI && robotConfig.consoleOI.rumbles){
                if(event.hand == 0){
                    robotConfig.consoleOI.rumbles.left = event.value;
                }                
                else{
                    robotConfig.consoleOI.rumbles.right = event.value;
                }                
            } 
        }
        function reconnect(){
            if(ws) ws.close();
        }

    }
    angular.module('MDConsole')
         .service('RobotService', ['$q','$log', '$timeout', '$interval', '$rootScope','SimulationService','DatabaseService', service]);
    
})();
