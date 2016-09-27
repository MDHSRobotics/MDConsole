# MDConsole

##Introduction

The MDConsole is a feature that was added in the 2015-2016 season.  The Smartdashboard provided by FRC turned out to be unreliable and behave unpredictably.  In addition, the ability to sustomize it was very limited.  

MDConsole provides a better alternative.  It uses websockets to communicate to the robot.  It is an HTML5 application that uses modern web development techniques.  This enables advanced features, such as:
* __adaptive__ behavior - Based on the state that the robot or other factors during game play, the console can change its content and present what is most relevant to the operators at that time
* __customizeable UI__ = The UI can be customized beyond what is achievable in the Smart Dashboard.  The full spectrum of HTML5 capabilites can be leveraged, enabling advanced visualization and custom experiences tailored to enahnce operator control
* __Extensible Operator Interface__ - The console cna be used as an extension of the operator interface, enabling it to send commands to the robot and control its systems

see [Understanding MDConsole](https://github.com/MDHSRobotics/TeamWiki/wiki/Understanding%20MDConsole) for more information

###Typical Use
Typically, this project would be forked for each season.

See the [How to Git](https://github.com/MDHSRobotics/TeamWiki/wiki/How%20to%20Git) tutorial for more information on how to fork this project.  

###Backlog
* Add the ability to sort the order of subsystems on the UI
* Add the ability to sort the order of settings in the subsystem card
* Add the ability to sort the order of readings in the subsystem card
* Improve the rumble feedback - tie to visual and potentially audible cue (e.g. mp3 file)
* Add the ability to auto detect a video streaming source and to display video streams
* Add spritesheets to improve graphics and icons as well as performance.  Check out svg4everybody and SVGO along with svg sprite of Material Design Icon
* Develop a scouting app
* Add video Streaming
* Add real-time graphing, sparklines
