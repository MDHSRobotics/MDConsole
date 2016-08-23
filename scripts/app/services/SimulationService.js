(function(){

    var sequence=[];
    initialize();
    function service($q,$log,$timeout, $interval){
        // $log.info("SimulationService");  
        var next = function(){
            if(sequence.length>0){
                var item = sequence.shift();
                $log.info('simulation item:');
                $log.info(item);
                return item;
            }
            return {};
        };
        return{
            next:next
        }
    }
    angular.module('MDConsole')
         .service('SimulationService', ['$q','$log', '$timeout', '$interval', service]);
    function initialize(){
        sequence.push('{"messageId": 51,"eventType": "RobotConfigurationNotification",'+
            '"isDisplay": true,"isRecord": true,"fpgaTime": 7.453073,'+
            '"commands": [{"command": "AutonomousCommand"}, {"command": "heartbeatCommand"}],'+
            '"consoleOI":{"name":"MDConsole","buttons":['+
                '{"id":1,"name":"shoot","command":"shootCommand","action":"whenPressed"},'+
                '{"id":2,"name":"open","command":"openCommand","action":"whenReleased"},'+
                '{"id":3,"name":"blink","command":"blinkCommand","action":"toggleWhenPressed"},'+
                '{"id":4,"name":"horn","command":"hornCommand","action":"whilePressed"},'+
                '{"id":5,"name":"abort","command":"abortCommand","action":"cancelWhenPressed"}],'+
                '"axis":['+
                '{"id":1,"name":"x-axis"},'+
                '{"id":2,"name":"y-axis"},'+
                '{"id":3,"name":"z-axis"},'+
                '{"id":4,"name":"twist"}]},'+
    '"subsystems": ['+
        '{"subsystem": "core", '+
            '"settings": [{"path": "core.name","name": "name","valueType": "string","value": "Mr. Roboto"}]}, '+
        '{"subsystem": "driveSystem", '+
            '"sensors": ['+
                '{"name": "distanceSensor", "readings": ['+
                    '{"valueType": "analog","name": "distanceReading","value": 0.2575683295726776}'+
                ']}, '+
                '{"name": "accelerometer", "readings": ['+
                    '{"valueType": "analog","name": "Rio_AccelX","value": 0.00390625}, '+
                    '{"valueType": "analog","name": "Rio_AccelY","value": 0.0390625}, '+
                    '{"valueType": "analog","name": "Rio_AccelZ","value": 0.984375}]'+
                '}], '+
            '"motors": ['+
                '{"name": "right","channel": "1","isServo": false,"position": 0.0,"speed": -1.0,"class": "edu.wpi.first.wpilibj.Victor"}, '+
                '{"name": "left","channel": "0","isServo": false,"position": 0.0,"speed": -1.0,"class": "edu.wpi.first.wpilibj.Victor"}]},'+
        '{"subsystem": "diagnosticsSubsystem",'+
            '"settings": [{"path": "diagnosticsSubsystem.diagnosticsScanPeriod","name": "diagnosticsScanPeriod","valueType": "doubleNumber","value": 0.1,"min": 0.02,"max": 20.0}], '+
            '"sensors": [{"name": "diagnosticsSensor", "readings": ['+
                    '{"valueType": "analog","name": "ControllerPower.Current3V3","value": 0.0018554683774709702}, '+
                    '{"valueType": "analog","name": "ControllerPower.Current5V","value": 0.003360351314768195}, '+
                    '{"valueType": "analog","name": "ControllerPower.Current6V","value": 0.03040771186351776}, '+
                    '{"valueType": "analog","name": "ControllerPower.InputCurrent","value": 0.2743334472179413}, '+
                    '{"valueType": "analog","name": "ControllerPower.InputVoltage","value": 13.069950103759766}, '+
                    '{"valueType": "analog","name": "ControllerPower.Voltage3V3","value": 3.193772792816162}, '+
                    '{"valueType": "analog","name": "ControllerPower.Voltage5V","value": 4.864603042602539}, '+
                    '{"valueType": "analog","name": "ControllerPower.Voltage6V","value": 5.920276165008545}, '+
                    '{"valueType": "analog","name": "ControllerPower.FaultCount3V3","value": 0.0}, '+
                    '{"valueType": "analog","name": "ControllerPower.FaultCount5V","value": 0.0}, '+
                    '{"valueType": "analog","name": "ControllerPower.FaultCount6V","value": 0.0}, '+
                    '{"valueType": "digital","name": "ControllerPower.Enabled3V3","value": "true"}, '+
                    '{"valueType": "digital","name": "xxxControllerPower.Enabled5V","value": "false"}, '+
                    '{"valueType": "digital","name": "ControllerPower.Enabled6V","value": "true"}, '+
                    '{"valueType": "analog","name": "DriverStation.BatteryVoltage","value": 13.069950103759766}, '+
                    '{"valueType": "analog","name": "DriverStation.MatchTime","value": -1.0}, '+
                    '{"valueType": "analog","name": "DriverStation.Location","value": 1.0}, '+
                    '{"valueType": "analog","name": "DriverStation.Alliance","value": 1.0}, '+
                    '{"valueType": "digital","name": "DriverStation.isBrownedOut","value": false}, '+
                    '{"valueType": "digital","name": "DriverStation.isBrownedOut","value": true}, '+
                    '{"valueType": "digital","name": "DriverStation.isBrownedOut","value": false}, '+
                    '{"valueType": "digital","name": "DriverStation.isBrownedOut","value": false}, '+
                    '{"valueType": "analog","name": "HALUtil.FPGARevision","value": 2.3072768E7}, '+
                    '{"valueType": "analog","name": "HALUtil.FPGAButton","value": false}, '+
                    '{"valueType": "analog","name": "HALUtil.FPGATime","value": 7409090.0}, '+
                    '{"valueType": "analog","name": "HALUtil.FPGAVersion","value": 8214.0}, '+
                    '{"valueType": "digital","name": "RobotState.isAutonomous","value": false}, '+
                    '{"valueType": "digital","name": "RobotState.isDisabled","value": true}, '+
                    '{"valueType": "digital","name": "RobotState.isEnabled","value": false}, '+
                    '{"valueType": "digital","name": "RobotState.isOperatorControl","value": true}, '+
                    '{"valueType": "digital","name": "RobotState.isTest","value": false}, '+
                    '{"valueType": "digital","name": "RobotBase.isReal","value": true}, '+
                    '{"valueType": "digital","name": "RobotBase.isSimulation","value": false}, '+
                    '{"valueType": "analog","name": "Timer.FPGATimestamp","value": 7.410163}, '+
                    '{"valueType": "analog","name": "Timer.MatchTime","value": -1.0}, '+
                    '{"valueType": "analog","name": "Utility.FPGATime","value": 7410367.0}, '+
                    '{"valueType": "digital","name": "Utility.userButton","value": false}, '+
                    '{"valueType": "analog","name": "PowerDistributionPanel.kAnalogInputChannels","value": 8.0}, '+
                    '{"valueType": "analog","name": "PowerDistributionPanel.kAnalogOutputChannels","value": 2.0}, '+
                    '{"valueType": "analog","name": "PowerDistributionPanel.kDigitalChannels","value": 26.0}, '+
                    '{"valueType": "analog","name": "PowerDistributionPanel.kPDPModules","value": 63.0}, '+
                    '{"valueType": "analog","name": "PowerDistributionPanel.kPDPChannels","value": 16.0}, '+
                    '{"valueType": "analog","name": "PowerDistributionPanel.kPwmChannels","value": 20.0}, '+
                    '{"valueType": "analog","name": "PowerDistributionPanel.kRelayChannels","value": 4.0}, '+
                    '{"valueType": "analog","name": "PowerDistributionPanel.kSolenoidModules","value": 2.0}, '+
                    '{"valueType": "analog","name": "PowerDistributionPanel.kSolenoidChannels","value": 8.0}, '+
                    '{"valueType": "analog","name": "PowerDistributionPanel.kSystemClockTicksPerMicrosecond","value": 40.0}, '+
                    '{"valueType": "analog","name": "PowerDistributionPanel.DefaultSolenoidModule","value": 0.0}]}]}, '+
        '{"subsystem": "WebSockets", '+
            '"settings": [{"path": "WebSockets.enableWebSockets","name": "enableWebSockets","valueType": "binary","value": true}]}'+
        ']}');
    }
})();

/*

    THE COMMENTED CODE BELOW IS FROM LAST YEAR'S SIMULATION SCRIPT
    HERE JUST AS REFERENCE FOR THIS YEAR

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