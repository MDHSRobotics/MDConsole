(function(){
 
  //Database Connection Management
  var host = "localhost";
  var port = 5984;
  var dburl= "http://"+host+":"+port;
  var mime = "application/json";
  var dbName =  "rtadb";
  var heartBeatPeriod = 600;//in milliseconds, poll thedatabse to check that it is still connected
  var viewPath='_design';
  var designDocumentName="recordings";

  angular.module('database', [ ]);

  var service = function ($log, $timeout, $interval, $http, $q ){
    $log.info("DatabaseService");

    var db={
      isConnected:false,
      isRecording : false      
    };
    var admin = {
      saveView:saveView
    };
    var session = {
      id:undefined,
      events:[]
    };
    var sessions=[];
    // var views = {};
    // configureViews();
    connect();
    var record = function(event){
        if(db.isConnected && db.isRecording && session.id){
          // $log.info('recording event');
          // $log.info(event);
          event['session_id'] = session.id;
          postDocument(JSON.stringify(event))
          .then(function(data){
            // $log.info("posted document");
            // $log.info(data);
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
      // $log.info('stopRecording.');
    };
    var toggleDBConnected = function(){
            db.isConnected = !db.isConnected;
    };
    return {db:db,admin:admin, sessions:sessions, record:record, session:session,
            startRecording:startRecording, stopRecording:stopRecording,
            toggleDBConnected:toggleDBConnected, getRecordings:getRecordings,
            getRecording:getRecording, deleteRecording:deleteRecording};


    function connect(){
      //periodically check the db to ensure it is still connected
      var db_heartbeat = $timeout(function(){
        // $log.info('db heartbeat @ '+dburl);
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
    function saveView(viewName,viewDefinition){
      //first retrieve the recording design document
      return getDocument(viewPath,designDocumentName)
      .then(function(response){
              // $log.info('getDesignDocument response:');
              // $log.info(response);
              //design document exists
              //check for the presence of the view, if it exists, replace it
              // otherwise add it
              var doc = response.data;
              if(!doc.views) doc.views = {};
              doc.views[viewName] = JSON.parse(viewDefinition);
              return putDocument(viewPath,designDocumentName,doc);
            },
            function(error){
              if(error && error.status && error.status == 404){
                $log.error('unable to save view due to missing '+designDocumentName+' design document');
              }
              else{
                $log.error('unable to save view due to error:');
                $log.error(error);
              }
            }
      );
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

    function getRecordings(){
      // url to list playback sessions and count of notification types
      // http://localhost:5984/rtadb/_design/recordings/_view/docsByType?group=true
      // $log.info('dbservice getRecordings');
      var url = dburl+"/"+dbName+"/"+viewPath+"/"+designDocumentName+"/_view/docsByType?group=true";
      // sessions.length = 0;
      // $log.info(url);
        $http.get(url)
        . then(function(response){
                if(response && response.data && response.data.rows){
                  // $log.info('get recordings returned with response:');
                  // $log.info(response.data.rows);
                  response.data.rows.forEach(function(row){
                    var sessionId = row.key[0];
                    var sessionName = row.key[1];
                    var docType = row.key[2];
                    var hasSession = false;
                    sessions.forEach(function(session){
                      if(session.id == sessionId)
                      { hasSession = true;
                        if(docType == "header" && sessionName){
                          session.name = sessionName;
                        }
                        else{
                          session[docType] = row.value;
                        }
                      }
                    });
                    if(!hasSession){
                      var sessionOBJ = {id:sessionId};
                      if(docType == "header" && sessionName){
                        sessionOBJ.name = sessionName;
                      }
                      else{
                        sessionOBJ[docType] = row.value;
                      }
                      sessions.push(sessionOBJ);
                    }
                  });
                  // $log.info(sessions);
                }
              },
              function(error){
                $log.info('get recordings returned with error:');
                $log.info(error);
              }
          );
 
 
    }

    function deleteRecordingPage(sessionId,messageId,pageSize){
      var nextSessionId = sessionId+1;
      var url = dburl+"/"+dbName+"/"+viewPath+"/"+designDocumentName+"/_view/docsBySessionId?startkey=["+sessionId+","+messageId+"]&endkey=["+nextSessionId+",0]&limit="+(pageSize+1);
      // $log.info(url);
      var deleteObj = {
        docs:[]
      };
      return $http.get(url)
        . then(function(response){
                if(response && response.data && response.data.rows){
                  // $log.info('get recording for session '+sessionId+' returned with response:');
                  // $log.info(response.data.rows);
                  response.data.rows.forEach(function(row,index){
                    if(index<pageSize){
                      var doc = row.value;
                      deleteObj.docs.push(doc);
                      doc["_deleted"]=true;
                      // $log.info('deleting doc:');
                      // $log.info(doc);                    
                    }
                  });
                  // $log.info('deleting...');
                  // $log.info(deleteObj);
                  $http.post(dburl+"/"+dbName+"/_bulk_docs", JSON.stringify(deleteObj))
                    .then(
                      function(response){
                      },
                      function(error){
                        $log.error("delete page returned with error:");
                        $log.error(error);
                      }
                      );


                  if(response.data.rows.length>pageSize){
                    var nextMessageId = response.data.rows[response.data.rows.length-1].key[1];
                    // $log.info('more to get');
                    // $log.info('next messageId: '+nextMessageId);
                    return deleteRecordingPage(sessionId,nextMessageId,pageSize)
                  }
                  else return;
                }
              }
      ); 
    }

    function getRecordingPage(sessionId,messageId,pageSize){
      var nextSessionId = sessionId+1;
      var url = dburl+"/"+dbName+"/"+viewPath+"/"+designDocumentName+"/_view/docsBySessionId?startkey=["+sessionId+","+messageId+"]&endkey=["+nextSessionId+",0]&limit="+(pageSize+1);
      // $log.info(url);
      return $http.get(url)
        . then(function(response){
                if(response && response.data && response.data.rows){
                  // $log.info('get recording for session '+sessionId+' returned with response:');
                  // $log.info(response.data.rows);
                  response.data.rows.forEach(function(row,index){
                    if(index<pageSize)session.events.push(row.value);
                  });
                  if(response.data.rows.length>pageSize){
                    var nextMessageId = response.data.rows[response.data.rows.length-1].key[1];
                    // $log.info('more to get');
                    // $log.info('next messageId: '+nextMessageId);
                    return getRecordingPage(sessionId,nextMessageId,pageSize)
                  }
                  else return;
                }
              }
      ); 
    }
    function deleteRecording(sessionId){
      // $log.info('dbservice deleteRecording for sessionId = '+sessionId);
      var messageId = 0;
      var pageSize = 10;
      session.id = sessionId;
      session.events.length=0;
      deleteRecordingPage(sessionId,messageId,pageSize)
      .then(function(data){
        // $log.info('delete recordings for session '+sessionId+' returned:');
          $timeout(function(){getRecordings();},0);
      },function(error){
        $log.info('get recording for session '+sessionId+' returned with error:');
        $log.info(error);
      }); 
      sessions.splice(0,sessions.length);     
    }
    function getRecording(sessionId){
      //format http://localhost:5984/rtadb/_design/recordings/_view/docsBySessionId?startkey=[1474236670411,0]&endkey=[1474236670413,0]&limit=500 
      // $log.info('dbservice getRecording for sessionId = '+sessionId);
      var messageId = 0;
      var pageSize = 10;
      session.id = sessionId;
      session.events.length=0;
      return getRecordingPage(sessionId,messageId,pageSize)
      .then(function(data){
        // $log.info('get recordings for session '+sessionId+' returned:');
        // $log.info(session.events.length+" events");
        // $log.info(session);
      },function(error){
        $log.info('get recording for session '+sessionId+' returned with error:');
        $log.info(error);
      });
      
    }

  };

angular.module('MDConsole')
  .factory ("DatabaseService", ['$log', '$timeout', '$interval', '$http', '$q', service]);  

}());
