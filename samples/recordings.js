{
   "_id": "_design/recordings",
   "_rev": "6-0651ccfdf4ff160a4206bccd1c363cf7",
   "language": "javascript",
   "views": {
       "docsByType": {
           "map": "function(doc){if(doc.session_id)emit([doc.session_id,doc.name,doc.messageId],1);}",
           "reduce": "function (key, values, rereduce) {return sum(values);}"
       },
       "docsBySessionId": {
           "map": "function(doc){if(doc.session_id)emit([doc.session_id,doc.messageId],doc);}"
       }
   }
}