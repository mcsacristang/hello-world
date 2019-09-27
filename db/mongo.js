var mongoClient = require('mongodb').MongoClient;

var insertDocument = function(client, callback) {
    client.collection('users').insertOne( {
            "id": 2,
            "username": "Oscar Martin",
            "email": "oscar.martin@nextonia.com.co",
            "NXTN" : "soporte2"
        }, function(err, result) {
        console.log("Inserted a document into the milu collection.");
        callback();
    });
};

var findFamilies = function(db, callback) {
    var cursor =db.collection('families').find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

mongoClient.connect("mongodb://nextoniadb:YX83Y5XILIDeNXvowaSEBDop4vZ0nzK8uC2PcnBvFlrODzOHkDtf3CgBW4PKtUFUDTWSDNiUOGUZdRSOeHhJPQ%3D%3D@nextoniadb.documents.azure.com:10255/?ssl=true", function (err, client) {
    var db = client.db('dashboardDB');
    insertDocument(db, function(){
        client.close();
    });    
});