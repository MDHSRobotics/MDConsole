// Subsystem Card directive
(function(){
  // console.log('loading numeric directive');
  var directive = function($log) {
    // $log.info('numeric directive');
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      function fromUser(text) {
        // $log.info('text: '+text);
        var transformedInput = text.replace(/[^\.\-0-9]/g, '');
        if(isNaN(transformedInput)) transformedInput = "0";
        // $log.info('transformedInput: '+transformedInput);
        if(transformedInput !== text) {
            ctrl.$setViewValue(transformedInput);
            ctrl.$render();
        }
        return transformedInput;  // or return Number(transformedInput)
      }
      ctrl.$parsers.push(fromUser);
    }
  };
};

angular.module('MDConsole')
  .directive('numeric',['$log',directive])
}());
