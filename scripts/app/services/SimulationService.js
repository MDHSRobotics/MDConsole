(function(){

    function service($q,$log,$timeout, $interval){
        $log.info("SimulationService");  
        var initialized = false;
    
        var next = function(){
            var event = {}
            if(!initialized){
                event = createConfig();
                initialized = true;
            }
            else
            {
                event = createHeartbeat();
            }
            return event;
        };
        var nextLogEvent = function(){
            return createLogEvent();
        }
        var toggleSimulation = function(){
            serviceObj.isSimulation = !serviceObj.isSimulation;
        }; 
        var serviceObj = {
            isSimulation:false,
            toggleSimulation:toggleSimulation,
            nextLogEvent: nextLogEvent,
            next:next
        };       
        return serviceObj;
        function createHeartbeat(){
            var event = 
    '{"messageId": '+eventId+','+
    '"eventType": "Heartbeat",'+
    '"display": true,'+
    '"record": true,'+
    '"fpgaTime": '+eventTime+','+
    '"sensors": [{"name": "DriverStation.isFMSAttached","type": "digital","value": false}, '+
    '{"name": "DriverStation.MatchTime","type": "analog","value": -1.0}, '+
    '{"name": "ControllerPower.Voltage5V","type": "analog","value": 4.860236167907715}, '+
    '{"name": "Rio_AccelZ","type": "analog","value": 0.98828125}, '+
    '{"name": "Rio_AccelY","type": "analog","value": 0.0390625}, '+
    '{"name": "ControllerPower.Current5V","type": "analog","value": 0.002873047022148967}, '+
    '{"name": "Rio_AccelX","type": "analog","value": 0.01171875}, '+
    '{"name": "RobotState.isTest","type": "analog","value": false}, '+
    '{"name": "HALUtil.FPGAButton","type": "analog","value": false}, '+
    '{"name": "DriverStation.isBrownedOut","type": "analog","value": false}, '+
    '{"name": "RobotState.isAutonomous","type": "analog","value": false}, '+
    '{"name": "DriverStation.isDSAttached","type": "analog","value": true}, '+
    '{"name": "ControllerPower.Enabled5V","type": "analog","value": true}, '+
    '{"name": "ControllerPower.FaultCount5V","type": "analog","value": 0.0}, '+
    '{"name": "RobotState.isOperatorControl","type": "analog","value": true}, '+
    '{"name": "RobotState","type": "analog","value": "Disabled"}, '+
    '{"name": "RobotState.isDisabled","type": "analog","value": true}, '+
    '{"name": "ControllerPower.InputCurrent","type": "analog","value": 0.23688769340515137}, '+
    '{"name": "ControllerPower.Voltage3V3","type": "analog","value": 3.187788724899292}, '+
    '{"name": "ControllerPower.Voltage6V","type": "analog","value": 5.915135383605957}, '+
    '{"name": "ControllerPower.Current6V","type": "analog","value": 0.027689937502145767}, '+
    '{"name": "ControllerPower.FaultCount3V3","type": "analog","value": 0.0}, '+
    '{"name": "DriverStation.isSysActive","type": "analog","value": false}, '+
    '{"name": "ControllerPower.Enabled6V","type": "analog","value": true}, '+
    '{"name": "ControllerPower.FaultCount6V","type": "analog","value": 0.0}, '+
    '{"name": "ControllerPower.Enabled3V3","type": "analog","value": true}, '+
    '{"name": "distanceReading","type": "analog","value": 0.2539062201976776}, '+
    '{"name": "RobotState.isEnabled","type": "analog","value": false}, '+
    '{"name": "ControllerPower.InputVoltage","type": "analog","value": 131.86782455444336}, '+
    '{"name": "ControllerPower.Current3V3","type": "analog","value": 0.0018554683774709702}, '+
    '{"name": "DriverStation.BatteryVoltage","type": "analog","value": 13.899236679077148}'+
    ']}'
    ;
            eventId++;
            eventTime = Math.round((eventTime + 0.2)*100)/100;
            return event;
        }  
        function createLogEvent(){
            var event = '{"messageId":'+eventId+', "display": true, "record": true, "fpgaTime":'+eventTime+', "source":"source", "level":"'+(levels[eventId%3])+'", "eventType":"RobotLogNotification", "message":"'+
                        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx '+
                        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx '+
                        '"}';
            eventId++;
            eventTime = Math.round((eventTime + 0.2)*100)/100;
            return event;
        }   
        function createConfig(){
            var event = 
'{'+
    '"messageId": 980665,'+
    '"eventType": "RobotConfigurationNotification",'+
    '"display": true,'+
    '"record": true,'+
    '"fpgaTime": 2.3,'+
    '"subsystems": {'+
        '"core": {'+
            '"subsystem": "core",'+
            '"isCore": true,'+
            '"settings": [{'+
                '"subsystem": "core",'+
                '"name": "name",'+
                '"type": "string",'+
                '"value": "Pine"'+
            '}, {'+
                '"subsystem": "core",'+
                '"name": "autoCommand",'+
                '"type": "string",'+
                '"value": "AutonomousCommand3"'+
            '}]'+
        '},'+
        '"driveSystem": {'+
            '"subsystem": "driveSystem",'+
            '"isCore": false,'+
            '"sensors": {'+
                '"accelerometer": {'+
                    '"name": "accelerometer",'+
                    '"readings": {'+
                        '"Rio_AccelX": {'+
                            '"subsystem": "driveSystem",'+
                            '"sensor": "accelerometer",'+
                            '"name": "Rio_AccelX",'+
                            '"type": "analog",'+
                            '"observe": true,'+
                            '"show": true,'+
                            '"value": 0.00390625'+
                        '},'+
                        '"Rio_AccelY": {'+
                            '"subsystem": "driveSystem",'+
                            '"sensor": "accelerometer",'+
                            '"name": "Rio_AccelY",'+
                            '"type": "analog",'+
                            '"observe": true,'+
                            '"show": true,'+
                            '"value": 0.03125'+
                        '},'+
                        '"Rio_AccelZ": {'+
                            '"subsystem": "driveSystem",'+
                            '"sensor": "accelerometer",'+
                            '"name": "Rio_AccelZ",'+
                            '"type": "analog",'+
                            '"observe": true,'+
                            '"show": true,'+
                            '"value": 0.9921875'+
                        '}'+
                    '}'+
                '}'+
            '},'+
            '"motors": [{'+
                '"name": "right",'+
                '"channel": "1",'+
                '"isServo": false,'+
                '"position": 0,'+
                '"speed": -1,'+
                '"class": "edu.wpi.first.wpilibj.Victor"'+
            '}, {'+
                '"name": "left",'+
                '"channel": "0",'+
                '"isServo": false,'+
                '"position": 0,'+
                '"speed": -1,'+
                '"class": "edu.wpi.first.wpilibj.Victor"'+
            '}]'+
        '},'+
        '"diagnosticsSubsystem": {'+
            '"subsystem": "diagnosticsSubsystem",'+
            '"isCore": true,'+
            '"settings": [{'+
                '"subsystem": "diagnosticsSubsystem",'+
                '"name": "diagnosticsScanPeriod",'+
                '"type": "decimal",'+
                '"value": 0.02,'+
                '"min": 0.02,'+
                '"max": 20'+
            '}],'+
            '"sensors": {'+
                '"diagnosticsSensor": {'+
                    '"name": "diagnosticsSensor",'+
                    '"readings": {'+
                        '"ControllerPower.InputCurrent": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "ControllerPower.InputCurrent",'+
                            '"type": "analog",'+
                            '"observe": true,'+
                            '"show": true,'+
                            '"value": 0.23688769340515137'+
                        '},'+
                        '"ControllerPower.InputVoltage": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "ControllerPower.InputVoltage",'+
                            '"type": "analog",'+
                            '"observe": true,'+
                            '"show": true,'+
                            '"value": 12.755826950073242'+
                        '},'+
                        '"ControllerPower.FaultCount3V3": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "ControllerPower.FaultCount3V3",'+
                            '"type": "analog",'+
                            '"observe": true,'+
                            '"show": true,'+
                            '"value": 0'+
                        '},'+
                        '"ControllerPower.FaultCount5V": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "ControllerPower.FaultCount5V",'+
                            '"type": "analog",'+
                            '"observe": true,'+
                            '"show": true,'+
                            '"value": 0'+
                        '},'+
                        '"ControllerPower.FaultCount6V": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "ControllerPower.FaultCount6V",'+
                            '"type": "analog",'+
                            '"observe": true,'+
                            '"show": true,'+
                            '"value": 0'+
                        '},'+
                        '"DriverStation.Location": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "DriverStation.Location",'+
                            '"type": "analog",'+
                            '"observe": false,'+
                            '"show": false,'+
                            '"value": 1'+
                        '},'+
                        '"DriverStation.Alliance": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "DriverStation.Alliance",'+
                            '"type": "analog",'+
                            '"observe": false,'+
                            '"show": false,'+
                            '"value": 1'+
                        '},'+
                        '"DriverStation.isBrownedOut": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "DriverStation.isBrownedOut",'+
                            '"type": "digital",'+
                            '"observe": true,'+
                            '"show": true,'+
                            '"value": false'+
                        '},'+
                        '"DriverStation.isDSAttached": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "DriverStation.isDSAttached",'+
                            '"type": "digital",'+
                            '"observe": true,'+
                            '"show": false,'+
                            '"value": true'+
                        '},'+
                        '"DriverStation.isFMSAttached": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "DriverStation.isFMSAttached",'+
                            '"type": "digital",'+
                            '"observe": true,'+
                            '"show": false,'+
                            '"value": false'+
                        '},'+
                        '"HALUtil.FPGARevision": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "HALUtil.FPGARevision",'+
                            '"type": "analog",'+
                            '"observe": false,'+
                            '"show": false,'+
                            '"value": 23072768'+
                        '},'+
                        '"HALUtil.FPGAVersion": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "HALUtil.FPGAVersion",'+
                            '"type": "analog",'+
                            '"observe": false,'+
                            '"show": false,'+
                            '"value": 8214'+
                        '},'+
                        '"HALUtil.FPGAButton": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "HALUtil.FPGAButton",'+
                            '"type": "digital",'+
                            '"observe": true,'+
                            '"show": true,'+
                            '"value": false'+
                        '},'+
                        '"RobotState": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "RobotState",'+
                            '"type": "string",'+
                            '"observe": true,'+
                            '"show": true,'+
                            '"value": "Autonomous"'+
                        '},'+
                        '"Timer.MatchTime": {'+
                            '"subsystem": "diagnosticsSubsystem",'+
                            '"sensor": "diagnosticsSensor",'+
                            '"name": "Timer.MatchTime",'+
                            '"type": "analog",'+
                            '"observe": true,'+
                            '"show": true,'+
                            '"value": -1'+
                        '}'+
                    '}'+
                '}'+
            '}'+
        '},'+
        '"WebSockets": {'+
            '"subsystem": "WebSockets",'+
            '"isCore": true,'+
            '"settings": [{'+
                '"subsystem": "WebSockets",'+
                '"name": "enableWebSockets",'+
                '"type": "binary",'+
                '"value": true'+
            '}]'+
        '}'+
    '},'+
    '"consoleOI": {'+
        '"buttons": [{'+
            '"name": "ExampleCommand2",'+
            '"index": 1,'+
            '"command": "ExampleCommand2",'+
            '"$$hashKey": "object:11"'+
        '}, {'+
            '"name": "ExampleCommand1",'+
            '"index": 0,'+
            '"command": "ExampleCommand1",'+
            '"$$hashKey": "object:12"'+
        '}]'+
    '},'+
    '"$$hashKey": "object:60"'+
'}'
            ;
            eventId++;
            eventTime = Math.round((eventTime + 0.2)*100)/100;
            return event;
        }            
    }
    angular.module('MDConsole')
         .service('SimulationService', ['$q','$log', '$timeout', '$interval', service]);
    var levels = ['ERROR', 'WARNING', 'INFO'];
    var eventId = 0001;
    var eventTime = 8.32;

})();

