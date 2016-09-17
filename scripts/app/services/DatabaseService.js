(function(){
 
  //Database Connection Management
  var host = "localhost";
  var port = 5984;
  var dburl= "http://"+host+":"+port;
  var mime = "application/json";
  var dbName =  "rtadb";
  var heartBeatPeriod = 600;//in milliseconds, poll thedatabse to check that it is still connected

  angular.module('database', [ ]);

  var service = function ($log, $timeout, $interval, $http, $q ){
    $log.info("DatabaseService");
    var db={
      isConnected:false,
      isRecording : false
    };
    var admin = {
      uploadViews:uploadViews
    };
    var session = {
      id:undefined
    };
    connect();
    var record = function(event){
        if(db.isConnected && db.isRecording && session.id){
          $log.info('recording event');
          $log.info(event);
          event['session_id'] = session.id;
          postDocument(JSON.stringify(event))
          .then(function(data){
            $log.info("posted document");
            $log.info(data);
          },function(error){
            $log.info("posting error:");
            $log.info(error);
          });
        }
        else if(!db.isConnected && db.isRecording){
          stopRecording();
        }
    };
    var startRecording = function(){
      session.id = Date.now();
      db.isRecording = true;
      $log.info('startRecording.  session_id:'+session.id);
    };
    var stopRecording = function(){
      session.id = undefined;
      db.isRecording = false;
      $log.info('stopRecording.');
    };
    var toggleDBConnected = function(){
            db.isConnected = !db.isConnected;
    };
    return {db:db,admin:admin, record:record, session:session,
            startRecording:startRecording, stopRecording:stopRecording,
            toggleDBConnected:toggleDBConnected};


    function connect(){
      //periodically check the db to ensure it is still connected
      var db_heartbeat = $timeout(function(){
        $log.info('db heartbeat @ '+dburl);
        $http.get(dburl)
        . then(function(){
                db.isConnected = true;
              },
              function(){
                db.isConnected = false;
                if(db.isRecording) db.isRecording = false;
                connect();
              }
          );
      },heartBeatPeriod);
    }
    function uploadViews(){
        $log.info('uploadViews called');
        var views = DBViewsService.views;
        var promises = [];
        Object.keys(views).forEach(function(viewName){
          // $log.info('found view document'+viewName);
          // $log.info(views[viewName]);
          promises.push(uploadView(viewName,views[viewName]));
        });
        $q.all(promises).
        then(function(data){
          data.forEach(function(value,index,array){
            // $log.info(value);
          });
          $log.info('view upload completed.');
        });
    }
    function uploadView(viewName,viewDefinition){
      var path = '_design';
      return getDocument(path,viewName)
      .then(function(response){
        // $log.info('response:');
        // $log.info(response);
        if(response && response.data && response.data._rev){
          viewDefinition = viewDefinition.substring(0, 1)+
           '"_rev":"'+response.data._rev+'", '+
           viewDefinition.substring(1); 
        }
        if(response && response.data && response.data._id){
          viewDefinition = viewDefinition.substring(0, 1)+
           '"_id":"'+response.data._id+'", '+
           viewDefinition.substring(1); 
        }
        // $log.info('content should have _id & _rev');
        // $log.info(viewDefinition);
        return putDocument(path,viewName,viewDefinition);
      });
      // putDocument(path,viewName,viewDefinition);
    }
    function putDocument(path,docName,content){
      var url = dburl+"/"+dbName+"/"+path+"/"+docName;
        return $http.put(url, content);
    }
    function postDocument(content){
      var url = dburl+"/"+dbName;
        return $http.post(url, content);
    }
     function getDocument(path,docName){
      var url = dburl+"/"+dbName+"/"+path+"/"+docName;
        return $http.get(url);
    }   

  };

angular.module('MDConsole')
  .factory ("DatabaseService", ['$log', '$timeout', '$interval', '$http', '$q', service]);  

}());
