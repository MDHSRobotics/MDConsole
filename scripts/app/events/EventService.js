(function(){
    'use strict';
    var script = [];
    var index = 0;
    script.push(createLog(index++));
    script.push(createLog(index++));
            // script.push(createPositionHeadingNotification(index++, {position:{x:12, y:280}, heading: 0}));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createRobotConfigurationNotification(index++));
    script.push(createLog(index++));
    script.push(createRobotState(index++, "DisabledInit"));
            // script.push(createTargetAcquired(index++, true));
            // script.push(creategoodShotNotification(index++, true));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createRobotState(index++, "DisabledPeriodic"));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createRobotState(index++, "AutonomousInit"));
    script.push(createGameClockNotification(index++, 15.0, 0.0));
    script.push(createBallLoaded(index++, true));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createRobotState(index++, "AutonomousPeriodic"));
    script.push(createGameClockNotification(index++, 15.0, 0.0));
    script.push(createLog(index++));
    script.push(createLog(index++));
            // script.push(createTargetNotification(index++,[
            //     {target:'enemy.left', bearing:22, distance:201},
            //     {target:'enemy.middle', bearing:35, distance:210}]));
            // script.push(createPositionHeadingNotification(index++, {position:{x:16, y:190}, heading: 0}));
            // script.push(createPositionHeadingNotification(index++, {position:{x:16, y:180}, heading: 0}));
            // script.push(createPositionHeadingNotification(index++, {position:{x:16, y:170}, heading: 0}));
            // script.push(createPositionHeadingNotification(index++, {position:{x:16, y:160}, heading: 0}));
            // script.push(createPositionHeadingNotification(index++, {position:{x:16, y:150}, heading: 0}));
    script.push(createGameClockNotification(index++, 10.23, 5.23));
            // script.push(createTargetNotification(indx++,[
            //    {target:'enemy.left', bearing:50, distance:100},
            //    {target:'enemy.middle', bearing:60, distance:110}]));
            // script.push(createPositionHeadingNotification(index++, { heading: 15}));
            // script.push(createPositionHeadingNotification(index++, { heading: 30}));
            // script.push(createPositionHeadingNotification(index++, { heading: 45}));
    script.push(createGameClockNotification(index++, 7.56, 8.56));
            // script.push(createPositionHeadingNotification(index++, {position:{x:26, y:140}}));
            // script.push(createPositionHeadingNotification(index++, {position:{x:36, y:130}}));
            // script.push(createPositionHeadingNotification(index++, {position:{x:46, y:120}}));
    script.push(createGameClockNotification(index++, 5.88, 10.88));
            // script.push(createTargetNotification(index++,[
            //      {target:'enemy.left', bearing:0, distance:80},
            //      {target:'enemy.middle', bearing:10, distance:85}]));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createRobotState(index++, "TeleopInit"));
    script.push(createGameClockNotification(index++, 0.0, 15.0));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createLog(index++));
    script.push(createRobotState(index++, "TeleopPeriodic"));
    script.push(createGameClockNotification(index++, 120.0, 0.0));
    script.push(createLog(index++));
    script.push(createGameClockNotification(index++, 111.111, 20.0));
    script.push(createLog(index++));
    script.push(createGameClockNotification(index++, 80.555, 40.0));
    script.push(createLog(index++));
    script.push(createBallLoaded(index++, false));
    script.push(createGameClockNotification(index++, 60.555, 60.0));
    script.push(createLog(index++));
    script.push(createGameClockNotification(index++, 40.555, 80.0));
    script.push(createLog(index++));
    script.push(createGameClockNotification(index++, 20.555, 100.0));
    script.push(createLog(index++));
    script.push(createGameClockNotification(index++, 10.555, 110.0));
    script.push(createLog(index++));
    script.push(createGameClockNotification(index++, 0.0, 120.0));
    script.push(createLog(index++));

    angular.module('events')
         .service('EventService', ['$q','$log', '$timeout', '$interval', 'RobotService', 'GameclockService', 'DatabaseService', EventService]);
      function round(num){
          return (Math.round(num * 100) / 100);
      }
    function createRobotState(index, state){
        return '{'+
            '"isDisplay": true, '+
            '"isRecord": true, '+
            '"eventType": "RobotStateNotification", '+
            '"messageId":'+index+', '+
            '"timestamp": '+Date.now()+', '+
            '"state":"'+state+'"}';
    }
    function createLog(index){
        return '{'+
            '"isDisplay": true, '+
            '"isRecord": true, '+
            '"eventType": "LogNotification", '+
            '"messageId":'+index+', '+
            '"timestamp": '+Date.now()+', '+
            '"level":"INFO",'+
            '"source":"source"'+
            ',"message":"message"}';
    }
    function createGameClockNotification(index, dsMatchTime, timerMatchTime){
        return '{'+
            '"isDisplay": true, '+
            '"isRecord": true, '+
            '"eventType": "GameClockNotification", '+
            '"messageId":'+index+', '+
            '"timestamp": '+Date.now()+', '+
            '"dsMatchTime":'+dsMatchTime+','+
            '"FMSAttached":true,'+
            '"timerMatchTime":'+timerMatchTime+'}';
    }
    function createBallLoaded(index, ballStatus){
        return '{'+
            '"isDisplay": true, '+
            '"isRecord": true, '+
            '"eventType": "ballLoadedNotification", '+
            '"messageId":'+index+', '+
            '"timestamp": '+Date.now()+', '+
            '"ballStatus":'+ballStatus+'}';
    } 

    function createRobotConfigurationNotification(index){
        return '{"messageId":'+index+',"eventType":"RobotConfigurationNotification","isDisplay":true,"isRecord":true,"fpgaTime":605.30958,"commands":[{"command":"AutoFowardCommand","items":[{"name":"accelerationDuration","type":"doubleNumber","value":1.2,"min":0,"max":7.5,"commandName":"AutoFowardCommand","$$hashKey":"object:75"},{"name":"Kp","type":"doubleNumber","value":0.03,"min":0,"max":0.1,"commandName":"AutoFowardCommand","$$hashKey":"object:76"},{"name":"speed","type":"doubleNumber","value":0.5,"min":0,"max":1,"commandName":"AutoFowardCommand","$$hashKey":"object:77"},{"name":"duration","type":"doubleNumber","value":6,"min":0,"max":15,"commandName":"AutoFowardCommand","$$hashKey":"object:78"},{"name":"breakingDuration","type":"doubleNumber","value":1.2,"min":0,"max":7.5,"commandName":"AutoFowardCommand","$$hashKey":"object:79"}]},{"command":"UnfurlCommand","items":[{"name":"delay","type":"doubleNumber","value":0.5,"min":0,"max":3,"commandName":"UnfurlCommand","$$hashKey":"object:91"}]}],"subsystems":[{"subsystem":"ArmSystem","items":[{"name":"unfurlSpeed","type":"doubleNumber","value":0.2,"min":0,"max":1,"systemName":"ArmSystem","$$hashKey":"object:64"},{"name":"liftSpeed","type":"doubleNumber","value":0.33,"min":0,"max":1,"systemName":"ArmSystem","$$hashKey":"object:65"}]}],"$$hashKey":"object:95"}';
    }
    function EventService($q,$log,$timeout, $interval, RobotService, GameclockService, DatabaseService){
        // $log.info("EventService");
        var events = [];
        var process=function(event){
            var eventObj=JSON.parse(event);
            if(eventObj.isDisplay) events.push(eventObj);
            if(eventObj.isRecord) DatabaseService.record(eventObj);
            if (eventObj.eventType =="RobotConfigurationNotification"){
                RobotService.updateConfiguration(eventObj);
            }
            if (eventObj.eventType =="GameClockNotification"){
                // $log.info('db connected: '+DatabaseService.db.isConnected);
                if(eventObj.FMSAttached && !DatabaseService.db.isRecording){
                    // $log.info('FMS attached');
                    if(DatabaseService.db.isConnected)DatabaseService.db.isRecording = true;
                }
                GameclockService.update(eventObj);
            }
            // if (eventObj.eventType =="PositionHeadingNotification"){

            //    if( eventObj.hasOwnProperty('position') && eventObj.position){
            //         // $log.info('detected a position update');
            //         RobotService.setPosition(eventObj.position.x,eventObj.position.y);
            //     }
            //    if( eventObj.hasOwnProperty('heading')){
            //         // $log.info('detected a heading update');
            //         RobotService.setHeading(eventObj.heading);
            //     }

            // }
            if (eventObj.eventType =="RobotStateNotification"){

               if( eventObj.hasOwnProperty('state')){
                    RobotService.setState(eventObj.state);
                }
            }


            // if (eventObj.eventType =="targetAcquiredNotification"){
            //     $log.info('detected a targetAcquiredNotification');
            //     if( eventObj.hasOwnProperty('targetAcquired')){
            //         $log.info('detected a target update');
            //         RobotService.setTargetAcquired(eventObj.targetAcquired);
            //     }
               
            // }

            // if (eventObj.eventType =="goodShotNotification"){
            //     $log.info('detected a goodShotNotification');
            //     if( eventObj.hasOwnProperty('GoodShot')){
            //         $log.info('detected a shot update');
            //         RobotService.setGoodShot(eventObj.GoodShot);
            //     }
               
            // }

           if (eventObj.eventType =="ballLoadedNotification"){
                if( eventObj.hasOwnProperty('ballStatus')){
                    RobotService.setBallState(eventObj.ballStatus);
                }
            }

            if (eventObj.eventType =="telemetryNotification"){
                if(eventObj.sensors && Array.isArray(eventObj.sensors) && eventObj.sensors.length>0){
                    var config = RobotService.robot.config;
                    var sensors = eventObj.sensors;
                    if(config.commands){
                        
                        var commandNames = Object.keys(config.commands);
                        if(commandNames && commandNames.length>0){
                            commandNames.forEach(function(commandName,index,array){
                                sensors.forEach(function(sensor,index,array){
                                    var elementNames = Object.keys(config.commands[commandName]);
                                    elementNames.forEach(function(elementName,index,array){
                                        if(elementName == sensor.name){
                                            if(sensor.type == 'analog')
                                                config.commands[commandName][elementName].value = round(sensor.value);
                                            else
                                                config.commands[commandName][elementName].value = sensor.value;
                                        }
                                    });
                                });
                            });
                        }
                        
                    }


                    if(config.subsystems){
                        
                        var systemsNames = Object.keys(config.subsystems);
                        if(systemsNames && systemsNames.length>0){
                            systemsNames.forEach(function(systemName,index,array){
                                sensors.forEach(function(sensor,index,array){
                                    var elementNames = Object.keys(config.subsystems[systemName]);
                                    elementNames.forEach(function(elementName,index,array){
                                        if(elementName == sensor.name){
                                            if(sensor.type == 'analog')
                                                config.subsystems[systemName][elementName].value = round(sensor.value);
                                            else
                                                config.subsystems[systemName][elementName].value = sensor.value;
                                        }
                                    });
                                });

                            });
                        }
                        
                    }
                }
                
            }
        };
    
        index = 0;
        var local = false ;
        var ws;
        var onopen = function(){
            // $log.info('Opened!');
            RobotService.setConnected(true);
            this.send('{"command":"connect"}');
        };
        var onmessage = function(evt){
            $timeout(function(){
                // $log.info('processing '+evt.data);
                process(evt.data);
            });
        };
        var onclose = function(){
            RobotService.setConnected(false);
            $log.info('Connection closed.  Attempting to reconnect ...');
            connect();
        };
        var onerror = function(err){
            $log.info('ERROR: '+err)
        };
        var connect = function(){
            var connector = $interval(function(){
               // if(index >=  10 ){//script.length)
                if(RobotService.robot.isConnected){
                    $interval.cancel(connector);
                    $log.info("stopped connector");
                }
                else{
                    if (ws === undefined || ws.readyState === undefined || ws.readyState > 1) {
                        $log.info('initializing web socket client...');
                        // ws = new WebSocket('ws://127.0.0.1:5808');
                        ws = new WebSocket('ws://roboRIO-4141-FRC.local:5808');
                        ws.onopen = onopen;
                        ws.onmessage = onmessage;
                        ws.onclose = onclose;
                        ws.onerror = onerror;
                    }
                }
            },600);             
        };
        if(local){
            //if true - use injector
            $log.info("starting injector");
            var injector = $interval(function(index){
                // if(index >=  10 ){//script.length)
                if(index >=  script.length){
                    $interval.cancel(injector);
                    $log.info("stopped injector");
                }
                else{
                    process(script[index++]);
                    index++;
                }
            },200);
        }
        else{
            //if false = use websockets
            //get events from RoboRIO
            connect();
        };
        var clear = function(){
            events.length=0;
        };

        var post = function(message){
            if(ws) ws.send(message);
            else $log.info('ws not valid');
        };
        return {events: events,
                clear: clear,
                post: post
            };  
    }
})();
/*

  

     
  function createPositionHeadingNotification(index, positionHeading){
    var result='{'+
        '"eventType": "PositionHeadingNotification", '+
        '"messageId":'+index+', '+
        '"timestamp": '+Date.now();
    if(positionHeading.hasOwnProperty('position')){
        if (result.length >1){
            result+=', ';
        }
        result+='"position":{"x" : '+positionHeading.position.x+', "y" : '+positionHeading.position.y+'}';
    }

    if(positionHeading.hasOwnProperty('heading')){
        if (result.length >1){
            result+=', ';
        }
        result+='"heading":'+positionHeading.heading;
    }
    result+=' }' ;
    return result;
  }

  function createTargetNotification(index, targetLocations){
    var result='{'+
        '"eventType": "targetNotification", '+
        '"messageId":'+index+', '+
        '"timestamp": '+Date.now();
    if(targetLocations && targetLocations.length >0){
        if (result.length >1){
            result+=', ';
        }
        result+='"targets":[ ';
        targetLocations.forEach(function(targetLocation, index){
            if (index >0){result+=', ';}
            result+='{'+
                '"target":"'+targetLocation.target+
                '","bearing":'+targetLocation.bearing+
                ',"distance":'+targetLocation.distance+'}';
        });
        result+=']';
    }

    result+=' }' ;
    return result;
  }



function creategoodShotNotification(index, GoodShot){
    return '{'+
        '"eventType": "goodShotNotification", '+
        '"messageId":'+index+', '+
        '"timestamp": '+Date.now()+', '+
        '"GoodShot":'+GoodShot+'}';
  } 

  function createTargetAcquired(index, targetAcquired){
    return '{'+
        '"eventType": "targetAcquiredNotification", '+
        '"messageId":'+index+', '+
        '"timestamp": '+Date.now()+', '+
        '"targetAcquired":'+targetAcquired+'}';
  } 

*/