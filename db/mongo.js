var mongoClient = require('mongodb').MongoClient;

var insertDocument = function(client, callback) {
    client.collection('users').insertOne( {
            "id": 1,
            "username": "Oscar Martin",
            "email": "oscar.martin@nextonia.com.co"
        }, function(err, result) {
        console.log("Inserted a document into the milu collection.");
        callback();
    });
    };

mongoClient.connect("mongodb://nextoniadb:YX83Y5XILIDeNXvowaSEBDop4vZ0nzK8uC2PcnBvFlrODzOHkDtf3CgBW4PKtUFUDTWSDNiUOGUZdRSOeHhJPQ%3D%3D@nextoniadb.documents.azure.com:10255/?ssl=true", function (err, client) {
    var db = client.db('dashboardDB');
    insertDocument(db, function(){
        client.close();
    });    
});